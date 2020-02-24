module.exports = function(app, fs, path, multer, time, mongoose, User_model, Rinfo_model, getIP, axios) {

    app.post('/', function(req, res) {
        console.log("server accessed - pc_info load");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        const pc_spec = [
            {
                index: "1",
                name: "PC-A",
                os: "MS Windows 10",
                cpu: "Intel core i5(5gen)",
                ram: "16GB",
                gpu: "No outer GPU",
                code: "RRPN2019_JULY_A"
            },
            {
                index: "2",
                name: "PC-B",
                os: "MS Windows 10",
                cpu: "Intel core i7(8gen)",
                ram: "32GB",
                gpu: "GTX1080 ti SLI",
                code: "RRPN2019_AUGU_B"
            }
        ]
        res.json({
            result: true,
            pc_num: pc_spec.length,
            pc_spec: pc_spec
        })
    });

    app.get('/test', function(req, res) {
        let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();
        let time = ''+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();
        console.log('test');
        User_model.find(function(err, result) {
            var cl_id_linenum = result.length;
            var saver = new User_model({
                id: 'test',
                pw: 'test',
                username: 'tester',
                license: 'tester_license',
                cl_id: '' + date + 39 + time + cl_id_linenum
            });  
            saver.save(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
            }) 
        });
    })

    app.post('/load/user', function(req, res) {
        console.log("server accessed - user login");
        var id_input = req.body.id;
        var pw_input = req.body.pw;

        // load data at mongo database

        User_model.find({
            id: req.body.id,
            pw: req.body.pw
        }, function(err, result) {
            console.log(result);

            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");


            if (err || result.length == 0) {
                if (err) {
                    throw err;
                }
                res.json({
                    result: false
                })
            } else {
                res.json({
                    result: true,
                    user_data: {
                        username: result[0].username,
                        license: result[0].license,
                        cl_id: result[0].cl_id
                    }
                })
            }
        })
    })

    // app.post('/rendering/upload', function(req, res) {
    //     console.log("server accessed - rendering_upload load");
    //     // set headers of response
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
        
    //     res.end();
        
    // })
    
    app.get('/', function(req, res) {
        res.end("test");
    })




    //file upload function

    var upload_rendering_infos = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                console.log(req.file);
                const document = JSON.parse(req.body.document);
                const save_route = __dirname + "/userdata/" + document.userinfo.id + "/" + document.userinfo.rendering_id + "/erp";
                fs.mkdir(save_route, function(res_mkdir) {
                    console.log(file.originalname);
                    cb(null, save_route); 
                });
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })
    })

    var upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, './uploads_temp'))
            },
            filename: function (req, file, cb) {

                // var filename_original = new Array();
                // var extension = new Array();
                // var date = Date.now();

                // console.log(req.body);
                // console.log(req.file);

                // // var document = JSON.parse(req.body.document);

                // for(var i = 0; i < file.length; i++) {
                //     var files_splited = file[i].originalname.split('.');
                //     extension[i] = files_splited[files_splited-1];
                //     var files_names = file[i].originalname.replace('.' + extension[i], '');
                //     filename_original[i] = files_names[files_names-1];
                //     cb(null, filename_original[i] + '-' + date + '-' + document.userid + extension[i]);
                // }

                var userid = JSON.parse(req.body.document).userid;
                var rendering_id = JSON.parse(req.body.document).rendering_id;

                var filename_save_temp = file.originalname + '-' + rendering_id + '-' + userid;

                // console.log("yes file exists");
                // fs.readFile(path.join(__dirname, './uploads_temp/req_upload_log.json'), function readFileCallback(err, data){
                // if (err){
                //     console.log(err);
                // } else {
                // obj = JSON.parse(data); 
                // for (i=0; i<5 ; i++){
                // obj.table.push({

                // });
                // }
                // var json = JSON.stringify(obj); 
                // fs.writeFile('myjsonfile.json', json); 
                // }});

                cb(null, filename_save_temp);

            }
        })
    })

    // update: 20190828

    app.post('/setInfo_rendering', async function(req, res) {

        // input information check

        var id = req.body.user_id;
        var rendering_id = req.body.rendering_id;

        // find data in server

        var load_data = await User_model.findOne({
            id: id
        });

        console.log(load_data);
            
        // load_data check

        if (load_data == undefined) {
            // report error

            console.log("Unauthorized user!");
            res.json({
                yn: false,
                reason: "cannot find user"
            });
        } else {

            // write data to rendering information database

            var load_rinfo = await Rinfo_model.findOne({
                rendering_id: rendering_id
            });

            console.log(load_rinfo);
            
            if (load_rinfo == null) {
                // write data
                load_rinfo = new Rinfo_model({
                    rendering_id: rendering_id,
                    req_id: id,
                    filename: undefined,
                    status: undefined,  // uploaded || unzipping || unzipped || set_info || ren_stb || rendering || paused || end || deleted
                    paid: undefined, // boolean
                    paid_type: undefined// card || account || license || etc
                });

                load_rinfo.save();
            } else {
                // return false
                res.json({
                    yn: false,
                    reason: "duplicate rendering id"
                });
            }

            // write data to user information dataabase

            // check exist rendering info
            if (load_data.rendering == undefined) {
                // write new
                load_data.rendering = [rendering_id];
            } else {
                // write data
                load_data.rendering.push(rendering_id);
            }

            load_data.save(); 

            console.log("Register rendering id successfully.");

            res.json({
                yn: true
            });
        }
    });

    // unzip method

    const AdmZip = require('adm-zip');
    const iconv = require('iconv-lite');
    

    function fixZipFilename(filename, encoding) {
        encoding = encoding || 'cp437';
        return iconv.decode(filename, encoding);
    }

    app.post('/rendering/unzip', function(req, res) {

        console.log("server accessed - unzip method load");
        // const iconv = require('iconv-lite');
        // const method2String = {
        //     0: 'stored',
        //     1: 'shrunk',
        //     6: 'imploded',
        //     8: 'deflated',
        //     9: 'deflate64',
        //     14: 'LZMA'
        // };
        
        // define route
        let route_zip_file;
        if (req.body.id != undefined && req.body.rendering_id != undefined) {
            route_zip_file = path.join(__dirname, "userdata", req.body.id, req.body.rendering_id);
        } else if (req.body.route != undefined) {
            route_zip_file = req.body.route;
        } else {
            res.end('ERROR: can\'t load route data in body');
        }
        const filename_zip = req.body.zip_name;
        const unzip_saveroute = path.join(route_zip_file, '/unzip');

        console.log(unzip_saveroute);
        console.log(path.join(route_zip_file, filename_zip));
        
        // create unzip route

        // if filtering need:
        // unzip.extractSync(path.join(route_zip_file, filename_zip), encoding='UTF-8', filter=[ARRAY]);

        // require('unzip-mbcs').extractSync_custom(path.join(route_zip_file, filename_zip), unzip_saveroute, encoding='UTF-8');
        var zip = new AdmZip(path.join(route_zip_file, filename_zip));
        var zipEntries = zip.getEntries();

        console.log(`zip.getEntries(): 
        
        ` + zipEntries);
    
        zipEntries.forEach(function(x) {
        try {
            var path_file = fixZipFilename(x.rawEntryName, encoding='UTF-8');
            // var path_file = fixZipFilename(x.rawEntryName, encoding='EUC-KR');
            console.log('/////////-----------/////////////\n\n\n');
            console.log(x);
            console.log('\n\n\n/////////-----------/////////////');
            console.log("filter: none");
            console.log("path: " + path_file);
            console.log("path_save: " + unzip_saveroute);
            // const unzip_folder = path.join(path_save, 'unzip');
            // console.log("unzip_folder: " + unzip_folder);
            const route = path.join(unzip_saveroute, path_file);
            console.log("route: " + route);
            if (!fs.existsSync(unzip_saveroute)) {
                fs.mkdirSync(unzip_saveroute);
            }
            if (x.isDirectory) {
                console.log(route);
                fs.mkdirSync(route);
            } else {
                fs.writeFileSync(route, zip.readFile(x));
            }
        } catch (e) {
            console.log("ERROR: unzip-mbcs-module");
            console.log(e);
        }
        });
        console.log("Unzip Complete!");

        res.end("true");
    })

    // analysis data
    
    app.post('/rendering/load_data', function(req, res) {
        
        // load data 
        
        var user_id = req.body.id;
        var rendering_id = req.body.rendering_id;
        var report_name = req.body.p_file_name.split('.')[0] + "Report.txt";
        // var file_name_split  = req.body.filename.split("-");
        // var original_file_name_n_ext = file_name_split[file_name_split.length-2];
        // var extension = req.body.filename.split('.').pop();
        // var original_file_name = original_file_name_n_ext + "." + extension;
        console.log(user_id);
        console.log(rendering_id);
        console.log(req.body.p_file_name);
        var report_route = path.join(__dirname, 'userdata', user_id, rendering_id, 'unzip', req.body.p_file_name.split(".")[0] + " folder", report_name);
        console.log(report_route);
        
        // fs.readFile(report_route, 'utf-8', function(err, data) {
        //     const splited_data = data.split('\n');
        //     for (var i = 0; i < splited_data; i++) {
        //         console.log(splited_data[i]);
        //     }
        // })

        let splited = {};
        const loaded = fs.readFileSync(report_route, "utf-8");
        const split = loaded.split('\n');
        splited.report_created = split[1];
        splited.project_name = split[2];
        splited.o_saveroute = split[3];
        splited.collect_option = split[4];
        splited.comps_list = split[5];
        splited.col_file_num = split[6];
        splited.col_file_list = split[7];
        splited.col_miss_num = split[7];
        splited.render_plugin = split[7];
        splited.effect_num = split[7];
        splited.effect_list = split[7];

        setTimeout(() => {
            // console.log(loaded);
            console.log(splited);
        }, 1000);
        res.end(loaded);
    })

    app.post('/test', function(req, res) {
        console.log(fs.readFileSync(path.join(__dirname, 'test.txt'), "utf-8"));
        res.end();
    })

    app.post('/rendering/check_encoding', function(req, res) {

        console.log("a");

        // define
        let route_zip_file;
        if (req.body.id != undefined && req.body.rendering_id != undefined) {
            route_zip_file = path.join(__dirname, "userdata", req.body.id, req.body.rendering_id);
        } else if (req.body.route != undefined) {
            route_zip_file = req.body.route;
        } else {
            res.end('ERROR: can\'t load route data in body');
        }
        const filename_zip = req.body.zip_name;
        const unzip_saveroute = path.join(route_zip_file, '/unzip');

        console.log("b");

        // detect zip file encoding

        console.log(path.join(route_zip_file, filename_zip));
        const chardet = require('chardet');
        chardet.detectFile(path.join(route_zip_file, filename_zip), function(err, res) {
            console.log(res);
        });
        console.log("c");
        // console.log(encoding_file);

        // res.end(encoding_file);
        res.end();
    })

    app.post('/rendering/convert_encoding', function(req, res) {
        // console.log("a");

        // // define
        // let route_zip_file;
        // if (req.body.id != undefined && req.body.rendering_id != undefined) {
        //     route_zip_file = path.join(__dirname, "userdata", req.body.id, req.body.rendering_id);
        // } else if (req.body.route != undefined) {
        //     route_zip_file = req.body.route;
        // } else {
        //     res.end('ERROR: can\'t load route data in body');
        // }
        // const filename_zip = req.body.zip_name;
        // const unzip_saveroute = path.join(route_zip_file, '/unzip');

        // console.log("b");

        // detect zip file encoding

        // console.log(path.join(route_zip_file, filename_zip));
        // const chardet = require('chardet');
        // const encoding_before = chardet.detectFileSync(path.join(route_zip_file, filename_zip));
        // console.log("c");
        // console.log("Before encoding: " + encoding_before);
        // const encoding_after = fixZipFilename(path.join(route_zip_file, filename_zip), "UTF-8");
        // fs.writeFileSync(encoding_after);
        // console.log("Complete");
        // // console.log(encoding_file);

        // // res.end(encoding_file);
        // res.end();


        // var fs = require('fs');
        const detectCharacterEncoding = require('detect-character-encoding'); //npm install detect-character-encoding
        var buffer = fs.readFileSync(path.join(req.body.route, req.body.zip_name));
        var originalEncoding = detectCharacterEncoding(buffer);
        // var file = fs.readFileSync(path.join(req.body.route, req.body.zip_name), originalEncoding.encoding);
        // fs.writeFileSync(path.join(req.body.route, req.body.zip_name + "_utf8.aep"), file, 'UTF-8');

        console.log(originalEncoding.encoding);
        // var Iconv = require('iconv').Iconv;

        // function decode(content) {
        //     var iconv_set = new Iconv('CP1252', 'UTF-8');
        //     var buffer = iconv_set.convert(content);
        //     return buffer.toString('utf8');
        // };

        // console.log(path.join(req.body.route, req.body.zip_name));
        // console.log(decode(fs.readFileSync(path.join(req.body.route, req.body.zip_name))));

        const result_decode = iconv.decode(fs.readFileSync(path.join(req.body.route, req.body.zip_name)), 'win1252');
        // console.log(result_decode);

        fs.writeFileSync("aep_decode_utf8.txt", result_decode);

        console.log(detectCharacterEncoding(Buffer.from(result_decode, 'utf8')));

        res.end(result_decode);

    })

    app.post('/rendering/infos', upload_rendering_infos.any(), async function(req, res) {
        let result_final;
        let result_semi;
        console.log('/rendering/infos accessed.');
        
        // parse data to json

        var body = JSON.parse(req.body.document);
        console.log(body);

        if (body.type == "a") {
            console.log("file inputed");
            console.log(req.file);
            
            // extension sepration

            let ext;

            console.log(req.files);

            const file = req.files[0];
            const file_name = file.originalname;


            if (file.type == undefined) {
                ext = file_name.split(".").pop();
            } else {
                ext = file.type;
            }

            // extension distinguition
            
            if (ext == "epr") {
                console.log("epr file uploaded");
                 
                // write data to db
                Rinfo_model.update({
                    req_id: body.userinfo.id,
                    rendering_id: body.userinfo.rendering_id
                }, {
                    $set: {
                        rendering_info: {
                            epr: {
                                tf: true,
                                filename: file_name,
                                save_route: path.join(__dirname, "./userdata" + body.userinfo.id + "/" + body.userinfo.rendering_id + "/erp"),
                                uploaded: true
                            },
                            proj_file_name: body.newinfo.proj_filename,
                            ren_comp: body.newinfo.ren_comp,
                            ren_quality: undefined,
                            ren_frame: undefined,
                            ren_ext: undefined
                        },
                        status: "set_info"
                    }
                }, async function(err, result) {
                    console.log(result);
                    result_semi = "true";
                })
            }
        } else {

            var quality = body.newinfo.ren_frame.split("||")[0];

            var frame = body.newinfo.ren_frame.split("||")[1];
            // write data to db
            Rinfo_model.update({
                req_id: body.userinfo.id,
                rendering_id: body.userinfo.rendering_id
            }, {
                $set: {
                    rendering_info: {
                        epr: {
                            tf: false,
                            filename: undefined,
                            save_route: undefined,
                            uploaded: false
                        },
                        proj_file_name: body.newinfo.proj_filename,
                        ren_comp: body.newinfo.ren_comp,
                        ren_quality: quality,
                        ren_frame: frame,
                        ren_ext: body.newinfo.ren_ext
                    },
                    status: "set_info"
                }
            }, async function(err, result) {
                console.log(result);
                
                // check data validation

                const project_route = path.join( __dirname, "./userdata/" + body.userinfo.id + "/" + body.userinfo.rendering_id);
                const file_info = JSON.parse(body.userinfo.zip_info);
                const filename_original = file_info.name;
                
                // console.log(filename_original);
                // file.originalname + '-' + rendering_id + '-' + userid;
                const extension = filename_original.split(".").pop();
                const filename_saved = filename_original.replace("." + extension, "") + '-' + body.userinfo.rendering_id + '-' + body.userinfo.id + "." + extension;

                console.log(filename_saved);
                
                // const project_report = await fs.existsSync(path.join(project_route + "/" +  ))


                result_semi = "true";
            })
        }

        setTimeout(() => {
            res.end(result_semi);
        }, 1000);
    })

    // app.post('/setInfo_rendering', function(req, res) {
    //     var id = req.body.user_id;
    //     var rendering_id = req.body.rendering_id;
    //     console.log(req.body);
    //     Rinfo_model.find({
    //         id: id
    //     }, async function(err, result) {
    //         if (err) throw err;
    //         if (result[0] != undefined) {

    //             console.log("result_idcheck: " + result);
    //             // var ext_db = result[0];

    //             // var ren_id_array = new Array();
    //             // // console.log(ext_db.rendering_id);
    //             // for (var i = 0; i < ext_db.rendering_id.length; i++) {
    //             //     ren_id_array.push(ext_db.rendering_id[i]);
    //             //     console.log(ren_id_array[i]);
    //             // }
    //             // // console.log(ren_id_array);
    //             // ren_id_array.push(rendering_id);
    //             // // console.log(ren_id_array);

    //             // Rinfo_model.update({
    //             //     id: ext_db.id
    //             // }, {
    //             //     rendering_id: ren_id_array
    //             // })
    //             // res.end();


    //             // update: 20190827

    //             var ren_id_array = new Rinfo_model({
    //                 id: id,
    //                 rendering_id: rendering_id,
    //                 fileinfo: {
    //                     file_name: undefined,
    //                     req_time: undefined, 
    //                     req_date: undefined,
    //                     file_ext: undefined
    //                 },
    //                 rendering_info: {
    //                     progress: 0,
    //                     server: undefined, 
    //                 },
    //                 license: {
    //                     type: undefined, // onetime or monthly or free
    //                     paid: false, // boolean
    //                     amount: undefined,
    //                     payinfo: {
    //                         paytype: undefined, // card or account_live or account_none
    //                         card: {
    //                             yn: false,
    //                             content: {
    //                                 cardnum: undefined,
    //                                 expiry: undefined,
    //                                 o_name: undefined,
    //                                 pw_2digit: undefined,
    //                                 cvc: undefined,
    //                                 pn: undefined
    //                             }
    //                         },
    //                         account_live: {
    //                             yn: false,
    //                             content: {
    //                                 // accountnum: undefined,
    //                                 // bank: undefined,
    //                             }
    //                         },
    //                         account_none: {
    //                             yn: false,
    //                             content: {

    //                             }
    //                         }
    //                     }
                        
    //                 }
    //             });

    //             let tf_res;

    //             await ren_id_array.save(async function(err) {
    //                 if (err) tf_res = false; 
    //                 else tf_res = true;
    //             })

    //             setTimeout(() => {
    //                 res.json({
    //                     yn: tf_res
    //                 });
    //             }, 2000);


    //         } else {

    //             console.log("result_idcheck: " + result);

    //             var saver = new Rinfo_model();
    //             saver.id = id;
    //             saver.rendering_id = rendering_id;
    //             saver.save(function(err, result) {
    //                 if (err) throw err;
    //                 console.log(result);
    //                 res.json({
    //                     yn: true,
    //                     result: result
    //                 });
    //             })
    //         }
    //     });
    // })

    app.post('/rendering/upload', upload.any(), function(req, res) {

        console.log("server accessed - upload load");

        // console.log test

        console.log(req.body);
        console.log(req.files);

        var document_body = JSON.parse(req.body.document);
        // var document_body = JSON.parse(req.body.document);
        console.log("document_body: \n" + document_body);
        console.log(req.files);

        // ----
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        var extension;

        if (req.files[0].mimetype == "application/zip") {
            
        }

        var files_splited = req.files[0].originalname.split('.');

        extension = files_splited[files_splited.length-1];     

        var user_id = document_body.userid;
        var date = time;
        var rendering_id = document_body.rendering_id;

        var exist_yn;
        
        console.log("Check route: " + path.join(__dirname, '/userdata/' + user_id));

        if (fs.existsSync(path.join(__dirname, '/userdata/' + user_id))) {
            exist_yn = true;
            var route_savepoint = path.join(__dirname, '/userdata/' + user_id + '/' + rendering_id);
            fs.mkdir(route_savepoint, function(err) {
                if (err) throw err;

                console.log(getIP(req).clientIp);

                // write README.md

                var readme_cont = `
                
                ---------|Rendercube: README.md|----------


                ## Request Data

                # Date: ` + date + `
                # Save Route: ` + route_savepoint + `
                # Request IP: ` + getIP(req).clientIp + `
                # Request ID: ` + document_body.userid + `


                ## Uploaded Date Info

                # Upload Extension: ` + extension + `
                # Upload Filename: ` + req.files[0].originalname + `
                
                
                `

                fs.appendFile(path.join(__dirname, './uploads_temp/README.md'), readme_cont, function(err) {
                    if (err) throw(err);
                    console.log('README.md write complete');
                })

                console.log(req.files[0]);

                // move files: /uploads_temp --> /userdata/[username]/[date]

                var filename_origin = req.files[0].originalname;
                var filename_n_ext = req.files[0].originalname.replace('.' + extension, '');     
                
                // var file_temp = path.join(__dirname, './uploads_temp/' + filename_n_ext + '-' + date + '-' + document_body.userid + '.' + extension);
                var file_temp = path.join(__dirname, './uploads_temp/' + req.files[0].originalname + '-' + document_body.rendering_id + '-' + document_body.userid);
                var file_move = route_savepoint + '/' + filename_n_ext + '-' + document_body.rendering_id + '-' + document_body.userid + '.' + extension;
                var unzip_route = path.join(route_savepoint, './unzip');

                fs.rename(file_temp, file_move, function(err) {
                    if (err) {
                        // fs.unlinkSync(file_temp);
                        throw err;
                    } else {
                        console.log("File move complete");
                    }
                })


            });

            // unzip process

            // axios.post('/rendering/unzip', {
            //     route: project_route,
            //     zip_name: body.userinfo.zip_info
            // })

            // require('unzip-mbcs').listSync(path.join(project_route),encoding='UTF-8');
            // console.log(path.join(project_route, filename_saved));
            // try {
            //     require('unzip-mbcs').extractSync_custom(path.join(project_route, filename_saved), path.join(project_route, 'unzip'), encoding='UTF-8');
            // } catch(e) {
            //     console.log("ERROR: unzip-mbcs");
            //     throw e;
            // }

            res.setHeader("Content-Type", "application/json");
            
            res.json({
                result: true
            })

        } else {
            exist_yn = false;

            res.setHeader("Content-Type", "application/json");

            res.json({
                result: false,
                reason: "Strange account: can't find user directory"
            });
        }
    })
}