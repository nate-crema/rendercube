module.exports = function(app, fs, getIP, User_model, alert, multer, path, syslog_upload_model, syslog_payment_model) {


    //User Router


    //id duplicate check

    app.post('/id_duplicate_check', function(req, res) {
        var id = req.body.id;
        
        //database_find_duplicate
        User_model.find({
            "id": id
        }, function(err, User) {
            if (err) {
                console.log(err);
                res.end('error occused')
            } else {
                console.log(User);
                if (User == false) {
                    alert('non_duplicate');
                    res.end();
                } else {
                    alert('duplicate');
                    res.end();
                }
            }
        });
    });

    app.post('/register', function(req, res) {
        
        var name = req.body.name;
        var sex = req.body.sex;
        var id = req.body.id;
        var pw = req.body.pw;
        var license = req.body.license;
        var email = req.body.email;

        if (name == undefined || sex == undefined || id == undefined || pw == undefined || license == undefined || email == undefined) {
            console.log('Input Info is cracked');
            alert('Input Info is cracked');
            console.log(`
                --write request--

                name: ` + name + `
                sex: ` + sex + `
                id: ` + id + `
                pw: ` + pw + `
                license: ` + license + `
                email: ` + email + `


                --write request--
            
            
            `);
            res.end();
        } else {
            console.log(`
                --write request--

                name: ` + name + `
                sex: ` + sex + `
                id: ` + id + `
                pw: ` + pw + `
                license: ` + license + `
                email: ` + email + `


                --write request--
            
            
            `);

            var USER = new User_model({
                name: name,
                sex: sex,
                id: id,
                pw: pw,
                license: license,
                email: email
            });

            USER.save(function(err, result) {
                if (err) {
                    console.log(`
                    ----------------------
                    Error Occured while registering.
                    ----------------------
                    
                    Print Error Record

                    ------------------------------
                    
                    `)
                    console.log(err);

                    console.log(`
                    
                    ------------------------------

                    Log.end


                    `)
                    alert("Error Occured while registering. Please try again");
                    res.redirect('/register');
                } else {
                    alert('Complete');
                    res.end();
                }
                /*
                res.render('/register_welcome', {
                    title: "Rendercube - Register Complete",
                    username: req.boy.name,
                    license_type: req.body.license
                });
                */
            });
        }
    });


    //Upload Router

    let date =  ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();
    let date_filenamedata =  ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes();

    let storage_zip = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "upload/")
        },
        filename: function(req, file, callback) {
            let extension = path.extname(file.originalname);
            let basename = path.basename(file.originalname, extension);
            callback(null, basename + "-" + date_filenamedata + extension);
        }
    });

    let upload_zip = multer({
        storage: storage_zip
    });

    app.post('/upload_file', upload_zip.single('upload_aep_zip'), function(req, res) {

        console.log(
            `
        ================

        AEP ZIP FILE is uploading

        ================
            


            `
        );


        //Divide real file name and file extension
        var file_name = req.file.originalname;
        var saved_file_name = req.file.filename;
        var extension = '.zip';
        var real_file_name = file_name.replace(extension, '');

        //File Filtering
        var file_filter = file_name.match(/.zip/g);

        if (file_filter == null) {
            fs.unlink(path.join(__dirname, '../upload/' + saved_file_name), (err) => {
                if (err) {
                    console.log(`
                    ===========================================================
                    AEP ZIP FILE responed error while uploading
                    -----------------------------------------------------------

                    Reason: file filter detected that uploaded file name doesn't have '.zip'.
                    Erase Uploaded File: Failed
                    File Name: ` + saved_file_name + `
                    ===========================================================

                    `);
                    console.log("Error Occused while erasing upload error file");
                    console.log(err);
                } else {
                    console.log(`
                    ===========================================================
                    AEP ZIP FILE responed error while uploading
                    -----------------------------------------------------------

                    Reason: file filter detected that uploaded file name doesn't have '.zip'.
                    Erase Uploaded File: Complete
                    ===========================================================

                    `);
                }
                
            });

            //Write Uploaded Log

            var upload_ip = getIP(req).clientIp;
            var file_name_saved = saved_file_name;
            var file_size = req.file.size;
            var User_name = "not_ready";
            var upload_success = "false";

            console.log(upload_ip);

            
            var UPLOAD_LOG = new syslog_upload_model({
                upload_ip: upload_ip,
                file_name: file_name_saved,
                file_size: file_size,
                User_name: User_name,
                upload_success: upload_success
            });
            
            UPLOAD_LOG.save(function(err, result) {
                if (err) {
                    console.log('Error Occured while recording upload result');
                    console.log(err);
                } else {
                    console.log('recording upload result complete');
                }
            });

            alert('Error Occuse while Uploading: Extension is not zip');
            res.end('Error Occuse while Uploading: Extension is not zip');
        } else {
            //Collect IP Information
            var uploaded_ip = getIP(req).clientIp;
            var routable_or_not = getIP(req).clientIpRoutable;


            console.log(
                `
            ===========================================

            AEP ZIP FILE is uploaded

            --------------------------------------------
                            
            Uploaded File Name: ` + file_name + `
            Uploaded File Name (non extension): ` + real_file_name + `
            Saved File Name: ` + saved_file_name + `
            Uploaded File Extension: ` + extension + `
            Uploaded IP: ` + uploaded_ip + `
            Route: ` + routable_or_not + `
            Uploaded Date: ` + date + `

            ============================================
                `
            );

            //Write Uploaded Log

            var upload_ip = uploaded_ip;
            var file_name_saved = saved_file_name;
            var file_size = req.file.size;
            var User_name = "not_ready";
            var upload_success = "true";

            
            var UPLOAD_LOG = new syslog_upload_model({
                upload_ip: upload_ip,
                file_name: file_name_saved,
                file_size: file_size,
                User_name: User_name,
                upload_success: upload_success
            });
            
            UPLOAD_LOG.save(function(err, result) {
                if (err) {
                    console.log('Error Occured while recording upload result');
                    console.log(err);
                } else {
                    console.log('recording upload result complete');
                }
            });


            alert('Upload Complete');
            res.end('Upload Complete');
        }
    });
    
    //Payment Router
    
    app.post('/payment', function(req, res) {
       //Get Token

        axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: "7266958408766684", // REST API키
                imp_secret: "aGpaGSxp6a42HTuJJgloTbRaiH8UXXx8DWjjPRJV2NYJGssqIOOBZFMinUdkSKtvGMOvEyrGlpp2SSsA" // REST API Secret
            }
        }).then(function (response) {
            var token_made = response.data.response.now;
            var expiry_token = response.data.response.expired_at;
            var access_token = response.data.response.access_token;
            console.log("--------------<<<<<Payment System>>>>>--------------");
            console.log("Payment Access Token: " + access_token);
            console.log("--------------<<<<<Payment System>>>>>--------------");

            //Payment Require

            var body_read = req.body;

            //카드번호
            var card_number = body_read.card_number;
            // var card_number = '4499148135778329';
            //결제자명
            var buyer_name = body_read.name;
            // var buyer_name = 'test_buyer';
            //결제명(상품명)
            var payment_name = body_product.name;
            // var payment_name = 'test_product';
            //가격
            var amount = body_read.amout;
            // var amount = '1500';
            //상점id
            var merchant_uid = date + '_' + amount + '_' + buyer_name;
            //카드 만료년월 (YYYY.MM)
            var card_expiry_year = 20 + body_read.expiry_year;
            var card_expiry_month = body_read.expiry_month;
            var card_expiry = card_expiry_year + '-' + card_expiry_month;
            // var card_expiry = '2023-03';
            //카드 소유주 생일
            var birth = body_read.user_birth;
            // var birth = '021127';
            //카드 비밀번호 (앞 2자리)
            var card_password_num = body_read.pwd_2digit;
            // var card_password_num = '45';
            //가맹점 식별코드
            var identify_code = "imp21896286";

            console.log('=====PAYMENT Request=====')
                    console.log('Request price: ' + amount);
                    console.log('Request buyer: ' + buyer_name);
                    console.log('Request uid(merchant_uid): ' + merchant_uid);


            axios({
                url: "https://api.iamport.kr/subscribe/payments/onetime",
                method: "post", // POST method
                headers: {
                    "Content-Type": "application/json", // "Content-Type": "application/json"
                    "Authorization": "Bearer "+ access_token // 발행된 액세스 토큰
                },
                data: {
                    merchant_uid: merchant_uid,
                    card_number: card_number,
                    expiry: card_expiry,
                    birth: birth,
                    pwd_2digit: card_password_num,
                    amount: amount,
                    buyer_name: buyer_name,
                    name: payment_name,
                    expiry: card_expiry
                }
            }).then(function (response) {

                    var paid_price = response.data.response.amount;
                    var buyer_name = response.data.response.buyer_name;
                    var card_company = response.data.response.card_name;
                    var currency = response.data.response.currency;
                    var merchant_uid = response.data.response.merchant_uid;

                    console.log('=====PAYMENT SUCCESSFUL=====')
                    console.log('confirmed price: ' + paid_price);
                    console.log('confirmed buyer: ' + buyer_name);
                    console.log('confirmed card_company: ' + card_company);
                    console.log('confirmed currency: ' + currency);
                    console.log('confirmed uid(merchant_uid): ' + merchant_uid);

                    //Write Log

                    var payment_ip = ip;
                    var username = saved_file_name;
                    var product_name = req.file.size;
                    var payment_success = "true";

                    
                    var PAYMENT_LOG = new syslog_payment_model({
                        req_ip: payment_ip,
                        payment_req_user_name: username,
                        User_name: product_name,
                        payment_success: payment_success
                    });
                    
                    PAYMENT_LOG.save(function(err, result) {
                        if (err) {
                            console.log('Error Occured while recording payment result');
                            console.log(err);
                        } else {
                            console.log('recording payment result complete');
                        }
                    });

                    res.end();
            });
        }); 
    });
    
    
    
    //Rendering Router

    app.post('/rendering', function(req, res) {

        //Get User Information

        var id = req.body.id;


        //Get ZIP Information

        var rendering_ready_file_unzip = req.body.filename + '.zip';
        var rendering_ready_file_unzip_nonext = req.body.filename;

        //Extract zip

        var unzip = require('unzip');

        fs.createReadStream(
                path.join(__dirname, '../upload/' + rendering_ready_file_unzip)
            ).pipe(unzip.Extract({
                unzip_route
            })
        );



        //Get Rendering Information

        var extension = req.body.ext_render;
        var project_name = req.body.project_name;
        var comp_name = req.body.comp_name;
        
        let date_filenamedata =  ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes();

        var rendered_file_name = date_filenamedata + '_' + id + '_' + comp_name;
        var rendered_file_extension = req.body.req_ext;


        //Rendering_Ready

        if (extension == 'aep') {
            var renderer_route = path.join(__dirname, '/../render_source_aep/');
            
            var bat_name = rendering_ready_file_unzip_nonext + '_batfile_renderingstart' + '.bat'
            var save_route_bat = path.join(__dirname + '/../bat_req_save/');


            //Make Rendering Command File

            fs.appendFile(save_route_bat + bat_name,
                `
                echo off
                title Rendercube-Rendering Status BAT File start` + id + date_filenamedata + `
                echo Start Rendering System
                echo.
                echo.
                cd ` + path.join(__dirname, '/../render_source_aep') + `
                aerender -project` + unzip_route + project_name + `.aep -comp "` + comp_name + `" -output ` + renderer_route + rendered_file_name + '.' + rendered_file_extension +`                
                
                `, function(err) {
                    if (err) {


                        console.log(`
                            Error Occured: Appending Files (bat)

                            =======================

                            Error Contents:

                            ` + err + `
                        
                            =======================

                        `);
                    }

                    console.log(`
                            =======================

                            Create BAT Comamnd File Complete

                            =======================

                    `);
                }
            );
            
            //Run Command File
                
            var exec_options_setting = {
                encoding: 'utf8',
                timeout: 0,  // msec
                maxBuffer: 200*1024,
                killSignal: 'SIGTERM',
                cwd: null,
                env: null
            }    
            
            const exec = require('child_process').exec;
            exec(save_route_bat + bat_name, exec_options_setting, function(err, stdout, stderr) {
                if (err != null) {
                    console.log(`
                        Error Occured: Run Appended Files (bat)

                        =======================

                        Error Contents:

                        ` + err + `

                        =======================

                    `);
                    res.end('error occured while running appended files');
                } else {
                    res.end('Start Rendering... Live Status is going to be supported');
                }
            })



        } else if (extension == 'prproj') {
            console.log('Rendering Request - Adobe Premiere Pro Project File ====> respond false');
            alert('Premiere Pro File is not ready. This function is going to be added');
            res.end();
        } else if (extension == 'ma' || extension == 'mb') {
            console.log('Rendering Request - MAYA File ====> respond false');
            alert('Maya File is not ready. This function is going to be added');
            res.end();
        }
    });
}