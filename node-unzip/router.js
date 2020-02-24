module.exports = function(io, app, fs, path, multer, time, getIP, axios, AdmZip, iconv) {

    // socket.io method
    const status_zip = io.of('/stat_zip')
    status_zip.on('connection', function(socket) {
        console.log("Rendercube Socket.IO Server Connected!");
        // socket.on('unzip_end', function(data) {
        //     const id = data.id;
        //     const ren_id = data.ren_id;
        //     const file_route = path.join(__dirname, "../node/userdata", id, ren_id);
        //     const unzip_route = path.join(file_route, 'unzip');
        //     const unzip_final_route = path.join(file_route, 'unzip(final)');

        //     if (fs.existsSync(unzip_final_route)) {
        //         console.log('unzip end!');
        //         socket.emit('unzipped', {
        //             ren_id: data.ren_id,
        //             id: data.id
        //         });
        //     }
        // })
        socket.on('load-p_info', function(socket) {
            
        })
    })

    // unzip method

    function fixZipFilename(filename, encoding) {
        encoding = encoding || 'cp437';
        return iconv.decode(filename, encoding);
    }

    function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    app.post('/rendering/unzip', async function(req, res) {

        console.log("server accessed - unzip method load");
        console.log("Standby: 2500");
        setTimeout(() => {
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
                route_zip_file = path.join(__dirname, "../node/userdata", req.body.id, req.body.rendering_id);
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

            // change directory name
            
            console.log("Unzip Complete!");

            const unzip_finish_route = unzip_saveroute + "(finish)"

            fs.renameSync(unzip_saveroute, unzip_finish_route);

            // await axios.post('/unzip_end_socket', {
            //     ren_id: req.body.rendering_id,
            //     id: req.body.id
            // });

            // analyze project

            axios.post('http://localhost:225/data/analyze', {
                filename_zip,
                unzip_finish_route
            })
            .then(function(analysis_res_all) {
                const analysis_res = analysis_res_all.data;

                if (analysis_res.analysis_result == "Complete") {
                    console.log("ready to send socket");

                    const status_zip = io.of('/stat_zip');
                    status_zip.on('connection', function(socket) {
                        console.log("sef");
                        socket.emit('unzipped_' + req.body.rendering_id, {
                            ren_id: req.body.rendering_id,
                            id: req.body.id,
                            data_analysis: analysis_res.data
                        })  
                        console.log("socket sended");
                    })
                    res.end("true");
                }
            })

            
        }, 2500);
    })



    // load data method

    app.post('/data/load', function(req, res) {

        const filename_zip = req.body.filename_zip;
        const unzip_finish_route = req.body.unzip_finish_route;
        // check unziped data

        const zipname_split = filename_zip.split("-");
        const zipname_addpart = "-" + zipname_split[zipname_split.length-2] + "-" + zipname_split.pop();
        const zipname_real = filename_zip.replace(zipname_addpart, '.zip');
        const zipname_noext = filename_zip.replace(zipname_addpart, '');

        const report_name = zipname_noext.replace(" folder", "Report.txt");
        
        const data = fs.readFileSync(path.join(unzip_finish_route, zipname_noext, report_name)).toString();
        res.end(data);

    });

    app.post('/data/analyze', async function(req, res) {
        const filename_zip = req.body.filename_zip;
        const unzip_finish_route = req.body.unzip_finish_route;

        const res_load = await axios.post('http://localhost:225/data/load', {
            filename_zip: filename_zip,
            unzip_finish_route: unzip_finish_route
        });

        const data = replaceAll(res_load.data, "\r", "\n");

        // check unziped data

        console.log("Start checking unziped data");

        if (data == undefined) {
            console.error("Cannot import report file");
            res.json({
                result: "ERROR",
                reason: "FAILED IMPORT REPORT"
            });
        }

        const data_split_a = data.split("\n\t\n");
        const data_to_comps = data_split_a[0];
        const data_to_sourcefile = data_split_a[1];
        const data_to_plugins = data_split_a[2];

        // data_to_comps
        const dtc_split = data_to_comps.split("\n");

        // report date
        const report_date = replaceAll(dtc_split[1], "\t", " ");
        console.log("report_date: " + report_date);

        // project name
        const pj_name = dtc_split[3].replace("Project name: ", "");
        console.log("pj_name: " + pj_name);
        
        // collected directory
        const col_dir = dtc_split[6].replace("\t", "");
        console.log("col_dir: " + col_dir);

        // collected composition list
        const col_comp_spoint = 11;
        const col_comp = new Array(dtc_split.length-col_comp_spoint);

        for (var i = col_comp_spoint; i < dtc_split.length; i++) {
            col_comp[i-col_comp_spoint] = dtc_split[i].replace("\t", "");
        }

        console.log("col_comp: ");
        console.log(col_comp);


        // data_to_sourcefile
        const dts_split = data_to_sourcefile.split("\n");

        // Number of collected file
        const no_cfile = dts_split[0].replace("Number of collected files:  ", "");
        console.log("no_cfile: " + no_cfile);

        // Size of Collected files
        const tsize_cfile = dts_split[2].replace("Size of collected files:  ", "");
        console.log("tsize_cfile: " + tsize_cfile);

        // collected source file list
        const sfile_list_spoint = 5;
        const sfile_list = new Array(dts_split.length-sfile_list_spoint);

        for (var j = sfile_list_spoint; j < dts_split.length; j++) {
            sfile_list[j-sfile_list_spoint] = dts_split[j].replace("\t", "");
        }

        console.log("sfile_list: ");
        console.log(sfile_list);


        // data_to_plugins
        const dtp_split = data_to_plugins.split("\n");

        // Number of Missing items
        const item_miss = dtp_split[0].replace("Number of missing items:  ","");
        console.log("item_miss: " + item_miss);

        // Rendering Plug-ins list
        const plugin_ren_spoint = 3;
        const plugin_ren = new Array(dtp_split.length-plugin_ren_spoint);

        for (var k = plugin_ren_spoint; k < dtp_split.length; k++) {
            plugin_ren[k-plugin_ren_spoint] = dtp_split[k].replace("\t", "");
        }

        console.log("plugin_ren: ");
        console.log(plugin_ren);


        // effect used number
        const eff_num = data_split_a[3].replace("Effects used:  ", "").split("\n")[0];
        console.log("eff_num: " + eff_num);

        // effects list

        const eff_list_spoint = 4;
        const eff_list = new Array(data_split_a.length-eff_list_spoint-1);
        if (data_split_a[data_split_a.length-1].match("Layer:  Text Layer") != null) {
            // console.log("Exist: true");
            for (var l = eff_list_spoint; l < data_split_a.length-1; l++) {
                // console.log(data_split_a[l]);
                eff_list[l-eff_list_spoint+1] = data_split_a[l].replace("Effect:  ", "");
            }
        } else {
            // console.log("Exist: false");
            for (var l = eff_list_spoint; l < data_split_a.length; l++) {
                // console.log(data_split_a[l]);
                eff_list[l-eff_list_spoint+1] = data_split_a[l].replace("Effect:  ", "");
            }
        }
        eff_list[0] = data_split_a[3].split("\n").pop().replace("Effect:  ", "");

        console.log("eff_list: ");
        console.log(eff_list);

        
        // total data

        const analysis_res = {
            analysis_result: "Complete",
            data: {
                report_date,
                pj_name,
                col_dir,
                col_comp,
                no_cfile,
                tsize_cfile,
                sfile_list,
                item_miss,
                plugin_ren,
                eff_num,
                eff_list
            }
        }

        res.json(analysis_res);
    })
}