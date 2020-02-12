module.exports = function(app, fs, getIP, User_model, multer, path, syslog_upload_model, syslog_payment_model, login_record_model) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: "Rendercube - alpha test",
            logined_cookie: req.session.logined_cookie
        });
    });
    app.get('/login', function(req, res) {
        res.render('login', {
            title: "Rendercube - Login",
            logined_cookie: req.session.logined_cookie
        });
    });
    app.get('/register', function(req, res) {
        res.render('register', {
            title: "Rendercube - Register",
            logined_cookie: req.session.logined_cookie
        });
    });

    app.get('/start_rendering', function(req, res) {
        console.log(`
            -------Info Check-------

            email: ` + req.session.logined_email + `
            license: ` + req.session.logined_license + `
            cookie: ` + req.session.logined_cookie + `


        `);
        User_model.find({
            email: req.session.logined_email
        }, 
        {
            license: 1,
            _id: 0
        }, function(err, User) {
            req.session.logined_license = User;
            console.log(User);

            var logined_cookie = req.session.logined_cookie;
            var logined_email = req.session.logined_email;
            var logined_license = req.session.logined_license;

            if (logined_email) {
                var logined_license_uncover_a = logined_license.toString().replace("[", "");
                var logined_license_uncover_b = logined_license_uncover_a.replace("]", "");
                var logined_license_uncover_c = logined_license_uncover_b.replace("{ license: ", "");
                var logined_license_uncover_d = logined_license_uncover_c.replace(" }", "");
            } else {
                var logined_license_uncover_d = undefined;
            }

            console.log(logined_license_uncover_d);

            console.log(`
                -------Info Check-------

                email: ` + logined_email + `
                license: ` + logined_license_uncover_d + `
                cookie: ` + logined_cookie + `


            `);

            res.render('start_rendering', {
                title: "Rendercube - Start Rendering",
                logined_cookie: logined_cookie,
                logined_email: logined_email,
                logined_license: logined_license_uncover_d
            });
        });
    });


    //Rendering Function

    //step_a: upload zip file

    //----------define upload info----------

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

    //----------define upload info----------

    app.post('/start_rendering', upload_zip.single("fileinput"), function(req, res) {

        console.log(
            `
        -------------------------------------

        AEP ZIP FILE is uploading

        -------------------------------------
            
            `
        );

        console.log(req.file.originalname);
        //Divide real file name and file extension
        var file_name = req.file.originalname;
        var saved_file_name = req.file.filename;
        var extension = '.zip';
        var real_file_name = file_name.replace(extension, '');

        //File Filtering
        var file_filter = file_name.match(/.zip/g);

        if (file_filter == null) {

            //if uploaded file is not zip file


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

            //Get user information

            User_model.find({
                email: req.session.logined_email
            }, {
                _id: 0,
                email: 1,
                name: 1,
                license: 1
            }, function(err, User) {

                //Write Uploaded Log

                var upload_ip = getIP(req).clientIp;
                var file_name_saved = saved_file_name;
                var file_size = req.file.size;
                var User_name = User[0].name;
                var upload_success = "false";

                console.log(upload_ip);

                var upload_date = date;

                var UPLOAD_LOG = new syslog_upload_model({
                    upload_date: upload_date,
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

                res.end('Error Occuse while Uploading: Extension is not zip');
            });

            
        } else {

            //if uploaded file is zip file

            
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

            //Get user information

            User_model.find({
                email: req.session.logined_email
            }, {
                _id: 0,
                email: 1,
                name: 1,
                license: 1,
                render_time_license: 1,
                render_remain: 1
            }, function(err, User) {

                if (err) {
                    console.log(`
                        Error Occured while start Rendering!!
    
                        ----------| Error Report |----------
                        Status: Start_Rendering - DB Check Failed
                        Error user: ` + req.session.logined_email + `
                        Error IP: ` + getIP(req).clientIp + `
                        Error Contents: 
                        ` + err + `
    
                        ----------| Error Report |----------
                    `);
                }

                console.log(User);

                //Write Uploaded Log

                var upload_ip = uploaded_ip;
                var file_name_saved = saved_file_name;
                var file_size = req.file.size;
                var User_name = User[0].name;
                var upload_success = "true";

                var upload_date = date;
                
                var UPLOAD_LOG = new syslog_upload_model({
                    upload_date: upload_date,
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

                // res.end('Upload Complete');

                

                //Rendering Functions

                //Get rendering license at DB
                var db_access = User[0];

                var user_license = db_access.license;
                var rendering_remain = db_access.render_remain;
                var origin_render_times = db_access.render_time_license;
                var user_email = db_access.email;

                //User license check - rendering remains
            
                if (user_license == false) {
                    //If user_license is undefined
                    console.log(`
                    Error Occured while start Rendering!!

                    ----------| Error Report |----------
                    Status: Start_Rendering - user license is not recorded
                    Error user: ` + user_email + `
                    Error IP: ` + getIP(req).clientIp + `
                    Solution: Redirect webpage to setting license

                    ----------| Error Report |----------
                    `);
                } else {
                    //If user_license is definded
                    if (rendering_remain <= 0) {
                        console.log(`
                            Error Occured while start Rendering!!

                            ----------| Error Report |----------
                            Status: Start_Rendering - Lack of Rendering License
                            Error user: ` + user_email + `
                            Error IP: ` + getIP(req).clientIp + `
                            Solution: Display Lack situation and redirect to charging page

                            ----------| Error Report |----------
                        `);
                        res.redirect('/license_charge');
                    } else if (rendering_remain > 0) {
                        //Remove rendering remain 1 times
                        var rendering_remain_change = rendering_remain - 1;
                        
                        db_access.rendering_remain = rendering_remain_change

                        USER.save(function(err, result) {
                            if (err) {
                                console.log(`
                                    Error Occured while start Rendering!!
            
                                    ----------| Error Report |----------
                                    Status: Start_Rendering - Change rendering remains
                                    Error user: ` + user_email + `
                                    Error IP: ` + getIP(req).clientIp + `
                                    Solution: Display Error Messang and redirect to start rendering page
            
                                    ----------| Error Report |----------
                                `);
                                res.redirect('/start_rendering');
                            } else {

                                console.log(`
                                    ----------| Server Report |----------
                                    Status: Start_Rendering - Rendering Request set
                                    User: ` + user_email + `
                                    License: ` + user_license + `
                                    License_remain: ` + rendering_remain + `
                                    Access IP: ` + getIP(req).clientIp + `
                                    Result: Completely checked info and ready for Rendering.
            
                                    ----------| Server Report |----------
                                `);

                                //Rendering Function Starts

                                //A: Unzip uploaded file

                                //Create Unzip Folder

                                var unzip_folder_link = path.join(__dirname, "/../upload_unzip/" + file_type + "_" + date_filenamedata + "/" + User_name);
                                fs.mkdir(unzip_folder_link, function(err) {
                                    if(err) {
                                        console.log("Error Occured at creating unzip directory");
                                        console.log(err);
                                        console.log("-----------------------------------");
                                    } else {
                                        console.log("Created upload directory");
                                    }
                                });
                                
                                var uploaded_file_name_withdate_zipped = uploaded_file_name_zipped + "-" + upload_date;

                                //Unzip files

                                var unzipper = require('unzipper');

                                var upload_folder_link = path.join(__dirname + '/../upload/');

                                fs.createReadStream(upload_folder_link + saved_file_name + ".zip")
                                .pipe(unzipper.Extract({ path: unzip_folder_link }));


                                var unzip_success = "true";


                                console.log(`
                                    -------------|Uploaded_Information|-------------
                                    Uploaded File Name: ` + uploaded_file_name_zipped + `
                                    Unzip Folder Link: ` + unzip_folder_link + `
                                    Upload ip: ` + upload_ip + `
                                    Upload Result: ` + upload_success + `
                                    Unzip Result: ` + unzip_success + `

                                                   --|User Info|--
                                    User name: ` + User_name + `
                                    User Email: ` + user_email + `
                                    
                                    -------------|Uploaded_Information|-------------
                                    
                                `);
                                
                                //File distinguish
                                var selected_renderfile_ext_body = req.body.ext_selected

                                if (selected_renderfile_ext_body == "AEP | .MP4") {

                                    var selected_renderfile_ext = "aep";
                                    var selected_rendering_ext = "mp4";

                                } else if (selected_renderfile_ext_body == "AEP | .AVI") {

                                    var selected_renderfile_ext = "aep";
                                    var selected_rendering_ext = "avi";

                                } else if (selected_renderfile_ext_body == "PRPROJ | .MP4") {
                                    
                                    var selected_renderfile_ext = "prproj";
                                    var selected_rendering_ext = "mp4";

                                } else {

                                    var selected_renderfile_ext = undefined;
                                    var selected_rendering_ext = undefined;

                                }

                                if (selected_renderfile_ext == undefined || selected_rendering_ext == undefined) {
                                    console.log(`
                                    -----------| Rendering System Log |-----------

                                    Service Error!! : Unexpected Request

                                    -----------| Rendering System Log |-----------
                                    `);
                                    res.end('Error!');
                                }

                                console.log(`
                                    -----------| Rendering System Log |-----------

                                    Web selected rendering extension: ` + selected_renderfile_ext + `
                                    Requied rendering extension: ` + selected_rendering_ext + `
                                    Request User: ` + User_name + `
                                    Request Email: ` + user_email + `

                                    -----------| Rendering System Log |-----------
                                `);

                                // If user gives aep extension file,

                                if (selected_renderfile_ext == "aep") {

                                    console.log (`
                                    -----------| Rendering System Log |-----------
                                    Request Rendering Service: Adobe After Effect Rendering Service
                                     -----[service is going to be start Web Media Encoder and Adobe After Effect Rendering Engine]-----

                                    -----------| Rendering System Log |-----------
                                    `);

                                    //Make bat file in order to start Adobe After Effect Service

                                    var projectfile_name = req.body.input_filename;
                                    var comp_name = req.body.input_comp;

                                    var renderer_route = path.join(__dirname, '/../rendering_route/');
            
                                    var bat_name = comp_name + "_" + User_name + '_batfile_renderingstart' + '.bat'
                                    var save_route_bat = path.join(__dirname + '/../bat_req_save/');

                                    fs.appendFile(save_route_bat + bat_name,
                                        `
                                        echo off
                                        title Rendercube-Rendering Status BAT File start` + id + date_filenamedata + `
                                        echo Start Rendering System
                                        echo.
                                        echo.
                                        cd ` + path.join(__dirname, '/../render_source_aep') + `
                                        aerender -project` + unzip_folder_link + projectfile_name + `.aep -comp "` + comp_name + `" -output ` + renderer_route + comp_name + '.' + selected_rendering_ext +`                
                                        
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

                                            const child_process = require('child_process');

                                            child_process.exec(save_route_bat + bat_name, function(err, stdout, stderr) {
                                                if (err) {
                                                    console.log(`
                                                        ================
                                                            Error: exec - err

                                                            ` + err + `

                                                        ================
                                                    `);
                                                } else if (stderr) {
                                                    console.log(`
                                                        ================
                                                            Error: exec - stderr

                                                            ` + stderr + `

                                                        ================
                                                    `);
                                                }

                                                console.log(`
                                                    
                                                    --------------|bat file start|-------------

                                                    start log|---------------------------------
                                                    ` + stdout + `
                                                    end log|---------------------------------

                                                
                                                `);

                                                res.redirect('/my');
                                            })


                                        }
                                    );


                                    

                                    
                                } else if (selected_renderfile_ext == "prproj") {
                                    console.log (`
                                    -----------| Rendering System Log |-----------
                                    Request Rendering Service: Adobe After Effect Rendering Service
                                     -----[service is going to be start Adobe Web Encoder service]-----

                                    -----------| Rendering System Log |-----------
                                    `);

                                    //set ame_webserver connection

                                    var AdobeMediaEncoder = require('../dist').AdobeMediaEncoder;
                                    var logging = require('logging-interfaces');
                                    var logFactory = new logging.ContextPrefixedLoggerFactory(new logging.ConsoleLogger());

                                    var ame = new AdobeMediaEncoder ({
                                        enableNotificationServer: false,
                                        notificationsPort: 8018,
                                        hostname: 'localhost',
                                        port: 8018,
                                        loggerFactory: logFactory
                                    });

                                    console.log("---------- Starting AME gateway... ----------");
                                    ame.start().then(
                                        function() {
                                            console.log("----------| AME gateway started! |----------");

                                            const submit = function() {
                                                var job = ame.enqueueJob({
                                                    sourcepath: test,
                                                    destinationPath: test,
                                                    sourcePresetPath: test,
                                                    overwriteDestinationIfPreset: true
                                                }, 'job');

                                                job.on("Progress", function() {
                                                    console.log(`Progress: ${job1.progress} (${job1.statusText})`);
                                                });

                                                job.on("ended", function() {
                                                    console.log(`Ended: ${job1.status}`, job1.lastStatusResponse);
                                                });
                                            };

                                            ame.client.abortJob().then(() => submit(), (err) => console.log(err));


                                        },
                                        () =>
                                        {
                                            console.error("Error starting AME gateway");
                                        }
                                    )
                                }
                                
                            }
                        })
                    }
                }
            });
        }
    });

    //test

    app.post('/test_upload', upload_zip.single("qwerty"), function(req, res) {
        console.log(req.file.originalname);
        res.end();
    })
    app.get('/upload_test', function(req, res) {
        res.render('test_upload', {
            
        });
    });

    app.get('/test_exec', function(req, res) {
        const child_process = require('child_process');

        child_process.exec(path.join(__dirname,'/test.bat'), function(err, stdout, stderr) {
            
            if(err) {
                console.log(`
                
                ERROR OCCURED - EXEC err

                ` + err + `
                
                `);
            } else if (stderr) {
                console.log(`
                
                ERROR OCCURED - EXEC stderr

                ` + stderr + `
                
                `);
            }
            
            console.log(stdout);
        })
    })

    app.post('/start_rendering_b', function(req, res) {
        //Get User Informatin
        var logined_cookie = req.session.logined_cookie;
        var logined_email = req.session.email;
        

        //Get User License


        User_model.find({
            "email": logined_email
        }, {
            _id: 0,
            render_time_license: 1,
            license: 1,
            email: 1,
            render_remain: 1
        }, function(err, USER) {
            
            if (err) {
                console.log(`
                    Error Occured while start Rendering!!

                    ----------| Error Report |----------
                    Status: Start_Rendering - DB Check Failed
                    Error user: ` + req.session.logined_email + `
                    Error IP: ` + getIP(req).clientIp + `
                    Error Contents: 
                    ` + err + `

                    ----------| Error Report |----------
                `);
            }
            var db_access = USER[0];

            var user_license = db_access.license;
            var rendering_remain = db_access.render_remain;
            var origin_render_times = db_access.render_time_license;
            var user_email = db_access.email;

            //User license check - rendering remains
            
            if (user_license == false) {
                //If user_license is undefined
                console.log(`
                Error Occured while start Rendering!!

                ----------| Error Report |----------
                Status: Start_Rendering - user license is not recorded
                Error user: ` + user_email + `
                Error IP: ` + getIP(req).clientIp + `
                Solution: Redirect webpage to setting license

                ----------| Error Report |----------
                `);
            } else {
                //If user_license is definded
                if (rendering_remain <= 0) {
                    console.log(`
                        Error Occured while start Rendering!!

                        ----------| Error Report |----------
                        Status: Start_Rendering - Lack of Rendering License
                        Error user: ` + user_email + `
                        Error IP: ` + getIP(req).clientIp + `
                        Solution: Display Lack situation and redirect to charging page

                        ----------| Error Report |----------
                    `);
                    res.redirect('/license_charge');
                } else if (rendering_remain > 0) {
                    //Remove rendering remain 1 times
                    var rendering_remain_change = rendering_remain - 1;
                    
                    db_access.rendering_remain = rendering_remain_change

                    USER.save(function(err, result) {
                        if (err) {
                            console.log(`
                                Error Occured while start Rendering!!
        
                                ----------| Error Report |----------
                                Status: Start_Rendering - Change rendering remains
                                Error user: ` + user_email + `
                                Error IP: ` + getIP(req).clientIp + `
                                Solution: Display Error Messang and redirect to start rendering page
        
                                ----------| Error Report |----------
                            `);
                            res.redirect('/start_rendering');
                        } else {
                            //Rendering Function Starts

                            
                        }
                    })
                }
            }

            
            
            
        });

        //if free

        //if non_free

    })


    app.get('/logout', function(req, res) {
        var sess = req.session;
        if(sess.logined_cookie) {
            req.session.destroy(function(err) {
                if(err) {
                    console.log("Logout_Error");
                    console.log(err);
                }else {
                    console.log("Logout Complete");
                    res.redirect("/");
                }
            })
        }
    });

    //login function

    app.post('/login', function(req, res) {
        var email = req.body.email;
        var pw = req.body.pw;
        
        User_model.find({
            "email": email,
            "pw": pw
        }, function(err, User) {

            // console.log(`
            //     DB Info: ` + User + `
            //     DB PW: ` + User.pw + `
            //     Input PW: ` + pw + `


            // `);

            console.log(User);

            if (User == false) {

                //Login password isn't correct   
                
                //Log to DB
                var login_record = new login_record_model({
                    login_email: email,
                    login_ip: getIP(req).clientIp,
                    success: "false"
                });

                login_record.save(function(err, result) {
                    if (err) {
                        console.log(`
                        ----------------------
                        Error Occured while logging login record.
                        ----------------------
                        
                        Print Error Record
    
                        ------------------------------
                        
                        `)
                        console.log(err);
    
                        console.log(`
                        
                        ------------------------------
    
                        Log.end
    
    
                        `)
                        res.redirect('/login');
                    } else {
                        console.log('Login Record Complete');
                        res.end();
                    }
                });



                console.log(`
                    ----Login Request----

                    Request email: ` + email + `
                    Login PW: ` + pw + `

                    ----Result: Failed----
                `);
                res.end('failed');

            } else {

                //Login password correct


                //Log to DB
                var login_record = new login_record_model({
                    login_email: email,
                    login_ip: getIP(req).clientIp,
                    success: "true"
                });

                login_record.save(function(err, result) {
                    if (err) {
                        console.log(`
                        ----------------------
                        Error Occured while logging login record.
                        ----------------------
                        
                        Print Error Record
    
                        ------------------------------
                        
                        `)
                        console.log(err);
    
                        console.log(`
                        
                        ------------------------------
    
                        Log.end
    
    
                        `)
                        res.redirect('/login');
                    } else {
                        console.log('Login Record Complete');
                        res.end();
                    }
                });
                
                console.log(`
                    ----Login Request----

                    Request email: ` + email + `

                    ----Result: Success----
                `);

                var sess = req.session;
                sess.logined_cookie = req.body.id + Date.now() + "%*$)(#@#*)$(" + getIP(req).clientIpRoutable + getIP(req).clientIp;

                sess.logined_email = email;

                console.log(`


                    ----------body set info----------
                    User email: ` + req.session.logined_email + `


                `)
                
                res.redirect('/');
            }
        });
    });

    // edit: 20200212 - test login function
    app.get('/login_test', (req, res) => {
        var sess = req.session;
        sess.logined_cookie = "test_id" + Date.now() + "%*$)(#@#*)$(" + getIP(req).clientIpRoutable + getIP(req).clientIp;

        sess.logined_email = "test_email";

        res.redirect('/');
    })


    app.post('/register', function(req, res) {
        
        var name = req.body.name;
        var email = req.body.email;
        var id = email;
        var pw = req.body.pw;
        // var license = req.body.license;
        //During alpha/beta
        var license = "Free License";

        if (name == undefined || id == undefined || pw == undefined || license == undefined || email == undefined) {
            console.log('Input Info is cracked');
            alert({content: 'Input Info is cracked'});
            console.log(`
                --write request--

                name: ` + name + `
                id: ` + id + `
                pw: ` + pw + `
                license: ` + license + `
                email: ` + email + `


                --write request--
            
            
            `);
            res.end();
        } else {

            //id duplication check

            //database_find_duplicate
            User_model.find({
                "email": email
            }, function(err, User) {
                if (err) {
                    console.log(err);
                    res.end('error occused')
                } else {
                    console.log(User);
                    if (User == false) {
                        //email is not duplicate

                        console.log('Info is not duplicate')
                        console.log(`
                            --write request--

                            name: ` + name + `
                            id: ` + id + `
                            pw: ` + pw + `
                            license: ` + license + `
                            email: ` + email + `


                            --write request--
                        
                        
                        `);

                        var USER = new User_model({
                            name: name,
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

                                res.redirect('/register');
                            } else {
                                console.log(`

                                
                                    --------User Registration Successful-------


                                `)
                                res.redirect('/login');
                                
                                /*
                                res.render('/register_welcome', {
                                    title: "Rendercube - Register Complete",
                                    username: req.boy.name,
                                    license_type: req.body.license
                                });
                                */
                            }
                        });
                    } else {
                        //email is duplicate
                        
                        console.log(`
                            --write request--

                            name: ` + name + `
                            id: ` + id + `
                            pw: ` + pw + `
                            license: ` + license + `
                            email: ` + email + `


                            --write request--
                        
                        
                        `);

                        console.log(`
                            ----Write Request: Failed -> Duplicate email information.----
                        `);
                        res.redirect('/register');
                    }
                }
            });
        }
    });


    app.get('/my', function(req, res) {
        var login_cookie = req.session.logined_cookie;

        if (login_cookie) {
            User_model.find({
                email: req.session.logined_email
            }, {
                _id: 0,
                license: 1,
                render_complete: 1,
                render_err: 1,
                render_remain: 1,
                render_time_license: 1,
                email: 1,

            }, function(err, USER) {
                if (err) {
                    console.log(err)
                }
                console.log(`
                    ----|||||----

                    ` + USER + `

                    ----|||||----
                `);
                console.log(USER[0].license);
                res.render('my', {
                    title: "Rendercube - my renderfarm",
                    //Progressing Rendering
                    status_rendering_num: 3,
                    //Total Rendering License
                    license_rendering_times: USER[0].render_time_license,
                    //Ended Rendering times
                    rendering_complete_num: USER[0].render_complete,
                    //User license information
                    user_license: USER[0].license,
                    //Remain Rendering
                    user_render_remain: USER[0].render_remain,
                    //Error Rendering
                    user_render_err: USER[0].render_err
                });
            });
        } else {
            res.redirect('/login');
        }
    });
    



    app.get('*', function(req, res) {
        res.send('<script type="text/javascript">alert("404! This page is not exist");window.location.href="/"</script>');
    });
}