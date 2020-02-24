<template>
    <form class="form_upload" id="form_upload" name="form_upload">
        <input type="file" name="upload_tag_zip" class="upload_file_input" id="input_file" hidden="hidden"/>
        <div class="zip_upload_form module_big" id="upload_zone">
            <img src=""/>
            <p class="big_exp_title_upload_zip">파일을 끌어다 놓아주세요!</p>
            <p class="small_exp_title_upload_zip">혹은 클릭하여 파일을 선택하세요</p>
            <!-- <progress max="100" :value.prop="uploadPercentage"></progress> -->
            <p id="percent_upload">{{uploadPercentage}}</p>
        </div>
        <span class="none_usr" hidden="hidden">
            <button id="button_complete" v-on:click="upload_complete()" hidden="hidden"></button>
            <input type="password" hidden="hidden" id="rendering_id" class="rendering_id" readonly/>
            <input type="password" hidden="hidden" id="zip_info" class="zip_info" readonly/>
            <input type="password" hidden="hidden" id="rendering_id_type" class="rendering_id_type" readonly/>
        </span> 
    </form>
</template>

<script>
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            uploadPercentage: 0
        }
    },
    methods: {
        upload_complete: async function() {
            if (document.getElementById("percent_upload").innerHTML == 100) {
                console.log('clicked');
                if (document.getElementById("rendering_id") == undefined) {
                    alert("ERROR: rendering id is not defined");
                }

                const ren_id = document.getElementById("rendering_id").value;
                const zip_info = document.getElementById("zip_info").value;

                // unzip function

                // unzip process check

                // load user info

                // const user_id = await axios.post('/api/getInfo').data.id;

                // $('#upload_zone').css('background-color', 'rgba(250, 184, 35, 0.4)')
                // document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "업로드된 파일을 압축해제하는 중입니다.";
                // document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "절대 페이지에서 나가지 마세요.";

                // let render_server = 'localhost';

                console.log("SET UPLOAD COMPLETE SET");

                axios.post('/api/stage_save', {
                    data: {
                        tf: true,
                        ren_id: ren_id,
                        zip_info: zip_info,
                        stage: "zip_upload"
                    }
                })

                // check unzip file
                // axios.post(render_server + "/rendering/unzip", {
                //     rendering_id: ren_id,
                //     id: user_id,
                //     zip_name: zip_info.name
                // })
                // .then(function(res_unzip) {
                // })

                // for (const i = 0; i < )
            } else {
                console.log(document.getElementById("percent_upload").innerHTML);
            }
        }
        // upload_complete: async function() {
        //     // 나중에 uploadPercentage가 100이 아니면 사용 못하도록 막기

        //     //load user_id & rendering_id

        //     // user_id
            
        //     var user_id;

        //     await axios.post(front_server_link + "/api/getInfo")
        //     .then(function(res_getInfo) {
        //         console.log(res_getInfo.data);
        //         user_id = res_getInfo.data.id;
        //     });

        //     //rendering_id

        //     var rendering_id;
            
        //     await axios.post(front_server_link + "/api/getInfo_user_render")
        //     .then(function(res_getInfo) {
        //         rendering_id = 
        //     })

        //     const record_info = {
        //         userid: user_id,
        //         rendering_id: 
        //     }
            
        // }
    },
    mounted() {

        // rendering_id 필드 수정금지로 막을 것

        //Drag and Drop Upload Code

        /*

        $(function () {

            var obj = $("#zip_upload_form");

            obj.on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
                obj.css('color', 'rgba(15, 34, 77, 0.856)');
            });

            obj.on('dragleave', function (e) {
                e.stopPropagation();
                e.preventDefault();
                obj.css('color', 'rgba(35, 103, 250, 0.062)');
            });

            obj.on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            obj.on('drop', function (e) {
                e.preventDefault();
                obj.css('color', 'rgba(0, 81, 255, 0.719)');

                var files = e.originalEvent.dataTransfer.files;
                if(files.length < 1)
                    return;

                F_FileMultiUpload(files, obj);
            });

            // 파일 멀티 업로드
            function F_FileMultiUpload(files, obj) {
                for (var i = 0; i < files.length; i++) {
                    console.log(files[i]);
                }
                if (files.length == 1 && files[0].type == "application/zip") {
                    console.log(files);
                    console.log(files[0].type);
                    if(confirm("이 파일을 업로드 하시겠습니까?") ) {
                        var data = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            data.append('file', files[i]);
                        }

                        var url = " <서버 파일업로드 URL> ";
                        $.ajax({
                            url: url,
                            method: 'post',
                            data: data,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            success: function(res) {
                                F_FileMultiUpload_Callback(res.files);
                            }
                        });
                    }
                } else {
                    alert("파일이 2개 이상 선택되었거나 zip파일이 아닙니다. 1개의 zip파일만 선택해주세요");
                }
                
            }

            // 파일 멀티 업로드 Callback
            function F_FileMultiUpload_Callback(files) {                
                    console.log("complete!: " + files);
            }
            

        });
        */

        //writing new: 20190805

        // function() {
        //     var formdata = new FormData();
        //     var server_link = "http://localhost:80";
        //     var front_server_link = "http://localhost:3000";
        //     console.log(this.$data.uploadPercentage);
        //     var uploadPercentage = this.$data.uploadPercentage;

        //     $("#upload_zone").on("dragover", function(e) {
        //         document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 놓아주세요!";
        //         document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "파일을 놓으시는 순간 자동으로 업로드가 시작됩니다.";
        //         $('#upload_zone').css('background-color', 'rgba(255, 0, 0, 0.31)');
        //         e.preventDefault();  // allow dropping and don't navigate to file on drop
        //         e.stopPropagation();
        //     }).on("dragleave", function(e) {
        //         roll_back();
        //         e.preventDefault();  // allow dropping and don't navigate to file on drop
        //         e.stopPropagation();
        //     }).on("drop", async function(e) {
        //         console.log("sedgrfhtr: " + e.originalEvent.dataTransfer.files[0]);

        //         if (e.originalEvent.dataTransfer.files.length > 1) {
        //             alert('1개의 ZIP파일만 업로드할 수 있습니다.');
        //             roll_back();
        //             e.preventDefault();  // allow dropping and don't navigate to file on drop
        //             e.stopPropagation();
        //             return;
        //         } else if (e.originalEvent.dataTransfer.files[0].type != 'application/zip') {
        //             console.log(e.originalEvent.dataTransfer.files[0].type);
        //             alert('ZIP 파일만 업로드할 수 있습니다.');
        //             roll_back();
        //             e.preventDefault();  // allow dropping and don't navigate to file on drop
        //             e.stopPropagation();
        //             return;
        //         } else {
        //             console.log("type: drag_n_drop");
        //             load_logined();

        //             e.preventDefault();  // allow dropping and don't navigate to file on drop
        //             e.stopPropagation();

        //             // $("#input_file")
        //             // .prop("file", e.originalEvent.dataTransfer.files[0])  // put files into element
        //             // .closest("form")
        //             // // .submit();  // autosubmit as well
        //             // send_proj_zip_update({
        //             //     fileinfos: {
        //             //         filename: e.originalEvent.dataTransfer.files[0]
        //             //     }
        //             // });


        //             // ------------------------------------------------------------------------

        //             await formdata.append("file", e.originalEvent.dataTransfer.files[0]);
        //             var user_id = load_loginInfo();

        //             // document.getElementById("input_file") = e.originalEvent.dataTransfer.files[0];

        //             // send_proj_zip({
        //             //     fileinfos: {
        //             //         filename: e.originalEvent.dataTransfer.files[0]
        //             //     }
        //             // });
        //             setTimeout(() => {
        //                 roll_back();
        //             }, 300);

        //             var ren_infos = rendering_id_creater(user_id, e.originalEvent.dataTransfer.files[0]);
        //             console.log("rendering id: " + ren_infos.ren_id);

        //             send_proj_zip_update(user_id, ren_infos.ren_id);
        //         }
        //     });

        //     $('#upload_zone').click(function() {
        //         // e.preventDefault();
        //         $('#input_file').click();
        //     });

        //     $(function() {
        //         $("#input_file").bind("change", function() {

        //             console.log("type: selection");

        //             load_logined();

        //             const file_inputed = document.getElementById("input_file").files[0]

        //             formdata.append("file", file_inputed);
        //             console.log("sedgrfhtr: " + file_inputed);
                    
        //             // // send file using axios

        //             // send_proj_zip_update({
        //             //     fileinfos: {
        //             //         filename: document.getElementById('input_file').files[0].name
        //             //     }
        //             // });

        //             // send_proj_zip({
        //             //     filename: document.getElementById('input_file').files[0].name
        //             // });

        //             var user_id = load_loginInfo();

        //             var ren_infos = rendering_id_creater(user_id, file_inputed);

        //             send_proj_zip_update(user_id, ren_infos.ren_id);
                    
        //         })
        //     })

        //     // UI: change drag&drop upload process background

        //     function roll_back() {
        //         document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 끌어다 놓아주세요!";
        //         document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "혹은 클릭하여 파일을 선택하세요.";
        //         $('#upload_zone').css('background-color', 'rgba(35, 103, 250, 0.062)')
        //     }

        //     // create rendering id

        //     async function rendering_id_creater(user_id, file) {
        //         const file_infos = file[0];
                
        //         console.log("rendering_id_creater");
        //         console.log(file_infos);
        //         const random_user_renderingnum = Math.floor(Math.random() * 10) + 10;
        //         const rendering_id = Date.now() + user_id + '_num_' + random_user_renderingnum;
        //         return {
        //             ren_id: rendering_id
        //         };
        //     }

        //     // set login info in formdata

        //     async function load_logined() {
        //         // get session data

        //         var user_id = await load_loginInfo();

        //         const data_send_json = JSON.stringify({
        //             userid: user_id
        //         }) 

        //         console.log("User_id(load_logined): " + user_id);

        //         const data_send_blob = new Blob([data_send_json], {
        //             type: 'application/json'
        //         });

        //         await formdata.append('document', data_send_json);
        //     }

        //     // login info load

        //     async function load_loginInfo() {
        //         var user_id;
        //         await axios.post(front_server_link + "/api/getInfo")
        //         .then(function(res_getInfo) {
        //             // console.log(res_getInfo.data);
        //             user_id = res_getInfo.data.id;
        //         });
        //         console.log("User_id(load_loginInfo): " + user_id);
        //         return user_id;
        //     }

        //     async function send_proj_zip_update(user_id, rendering_id) {

        //         console.log("Stage: send project zip");

        //         console.log(formdata);

        //         // problem: can't load document data in multer module because of mounted sequence. Make this lineup change

        //         // console.log(formdata.document);
                
                

        //         // console.log(uploadPercentage);

        //         console.log('Start upload');
        //         console.log('------------—------------—------------—------------—------------—');
        //         console.log('------------—------------—------------—------------—------------—');

        //         await axios.post(server_link + "/rendering/upload", formdata, {
        //             onUploadProgress: function( progressEvent ) {
        //                 console.log(( progressEvent.loaded * 100 ) / progressEvent.total );
        //                 uploadPercentage = ( progressEvent.loaded * 100 ) / progressEvent.total;
        //             }.bind(this)
        //         })

        //         // await axios({
        //         //     method: "POST",
        //         //     url: server_link + "/rendering/upload",
        //         //     data: formdata
        //         // }, {
        //         //     onUploadProgress: function( progressEvent ) {
        //         //         this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
        //         //     }.bind(this)
        //         // })
        //         .then(async function(response) {
        //             console.log(response);

        //             var result = response.data;
        //             console.log(`result: ` + result);
        //             if (result == "success") {
        //                 console.log("Upload finished successfully");
        //                 await axios.post(front_server_link + "/api/setInfo_user_render", {
        //                     setinfo: {
        //                         userid: user_id,
        //                         rendering_id: rendering_id
        //                     }
        //                 })
        //                 .then(async function(res_regcheck) {
        //                     if (res_regcheck.data == true) {
        //                         alert("업로드가 성공적으로 완료되었습니다.");  
        //                         // return true;
        //                         console.log("Upload progress complete");
        //                         location.reload();
        //                     } else {
        //                         alert("최종 렌더링 정보 설정중 오류가 발생하였습니다.");
        //                         // return false;
        //                     }
        //                 });
        //             } else if (result == 'false') {
        //                 alert("업로드에 실패했습니다.");
        //                 console.log(result);
        //                 // return false;
        //             } else {
        //                 alert("업로드중 문제가 발생하였습니다.");
        //                 console.log(result);
        //                 // return false;
        //             }
        //         });

        //     }

        //     // async function send_proj_zip(file_infos) {

        //     //     console.log("Stage: send project zip");

        //     //     var user_id;
        //     //     await axios.post(front_server_link + "/api/getInfo")
        //     //     .then(function(res_getInfo) {
        //     //         console.log(res_getInfo.data);
        //     //         user_id = res_getInfo.data.id;
        //     //     });

        //     //     console.log("Start Request - upload_a");

        //     //     await axios.post(server_link + "/rendering/upload_a", {
        //     //         filename: file_infos.filename,
        //     //         userid: user_id
        //     //     }, {
        //     //         headers: {
        //     //             'Contents-Type': 'multipart/form-data',
        //     //             "Access-Control-Allow-Origin": "*",
        //     //             "Access-Control-Allow-Headers": "X-Requested-With"
        //     //         }
        //     //     })
        //     //     .then(function(res_up_a) {
        //     //         var res_up_a_real = res_up_a.data;
        //     //         console.log(res_up_a_real);
        //     //         if(res_up_a_real.result == true) {

        //     //             console.log("Start Request - upload_b");

        //     //             axios.post(server_link + "/rendering/upload_b", formdata, {
        //     //                 headers: {
        //     //                     'Contents-Type': 'multipart/form-data',
        //     //                     "Access-Control-Allow-Origin": "*",
        //     //                     "Access-Control-Allow-Headers": "X-Requested-With"
        //     //                 }
        //     //             })
        //     //             .then(function(res_up_b) {
        //     //                 var result = res_up_b.data;
        //     //                 console.log(`result: ` + result);
        //     //                 if (result == "success") {
        //     //                     alert("업로드가 성공적으로 완료되었습니다."); 
        //     //                     return true;
        //     //                 } else if (result == 'false') {
        //     //                     alert("업로드를 실패하였습니다.");
        //     //                     console.log(res_up_b);
        //     //                     return false;
        //     //                 } else {
        //     //                     alert("업로드에 문제가 발생하였습니다.");
        //     //                     console.log(res_up_b);
        //     //                     return false;
        //     //                 }
        //     //             })
        //     //             .catch(function(error) {
        //     //                 alert("업로드 오류가 발생하였습니다.");
        //     //                 console.log(error);
        //     //                 document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "업로드에 오류가 발생했습니다";
        //     //                 document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "위에 '다시 시작하기' 버튼을 눌러 다시 시도해주세요";
        //     //                 $('#upload_zone').css('background-color', 'rgba(255, 0, 0, 0.31)')
        //     //             })
                        
        //     //         } else {
        //     //             return false;
        //     //         }
        //     //     })
        //     // }
        // }





        // // writing new: 20190825

        var back_server_link = "http://localhost:80";
        var front_server_link = "http://localhost:3000";

        var uploadPercentage = this.$data.uploadPercentage;

        // drag & drop function setting

        $("#upload_zone").on("dragover", function(e) {
            document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 놓아주세요!";
            document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "파일을 놓으시는 순간 자동으로 업로드가 시작됩니다.";
            $('#upload_zone').css('background-color', 'rgba(255, 0, 0, 0.31)');
            e.preventDefault();  // allow dropping and don't navigate to file on drop
            e.stopPropagation();
        }).on("dragleave", function(e) {
            roll_back();
            e.preventDefault();  // allow dropping and don't navigate to file on drop
            e.stopPropagation();
        }).on("drop", async function(e) {
            console.log("sedgrfhtr: " + e.originalEvent.dataTransfer.files[0]);

            if (e.originalEvent.dataTransfer.files.length > 1) {
                alert('1개의 ZIP파일만 업로드할 수 있습니다.');
                roll_back();
                e.preventDefault();  // allow dropping and don't navigate to file on drop
                e.stopPropagation();
                return;
            } else if (e.originalEvent.dataTransfer.files[0].type != 'application/zip') {
                console.log(e.originalEvent.dataTransfer.files[0].type);
                alert('ZIP 파일만 업로드할 수 있습니다.');
                roll_back();
                e.preventDefault();  // allow dropping and don't navigate to file on drop
                e.stopPropagation();
                return;
            } else {
                console.log("type: drag_n_drop");

                e.preventDefault();  // allow dropping and don't navigate to file on drop
                e.stopPropagation();

                console.log(e.originalEvent.dataTransfer.files[0]);
                uploadProcess(e.originalEvent.dataTransfer.files[0]);

            }
        });







        // click upload function setting

        $('#upload_zone').click(function() {
            $('#input_file').click();
        })

        $(function() {
            $("#input_file").bind("change", function() {
                const file = document.getElementById("input_file").files[0];
                console.log(file);
                const file_name = file.name;

                if (file.type != "application/zip") {
                    alert('ZIP 파일만 업로드할 수 있습니다.');
                } else {
                    uploadProcess(file);
                }
            })
        })


        // uploadProcess

        async function uploadProcess(file) {

            await $('#upload_zone').css('background-color', 'rgba(35, 103, 250, 0.12)')
            document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 업로드하는 중입니다!";
            document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "취소하고 싶으시면 이 상자를 클릭해주세요.";

            // get user id

            var user_id = await ldusrid();

                // make document

                const a = JSON.stringify({
                    userid: user_id,
                    rendering_id: rendering_id
                })

                const data_send = new Blob([a], {
                    type: 'application/json'
                })
            
            // get rendering id

            var rendering_id = await mkrenid(8);

            // record rendering information
            // errorpoint: ERR_F_RENDERINFO

            console.log(`
            
            id: ` + user_id + `
            rendering_id: ` + rendering_id + `
            
            `)

            document.getElementById("rendering_id").value = rendering_id;
            // console.log(file);
            let data_zip_info = {
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath
            };
            document.getElementById("zip_info").value = JSON.stringify(data_zip_info);

            // console.log("file_info(json): " + data_zip_info.size);

            var result_a = await axios.post(back_server_link + '/setInfo_rendering', {
                user_id: user_id,
                rendering_id: rendering_id
            });

            console.log(result_a);
            if (result_a.data.yn == true) {
                var formData = new FormData();
                await formData.append("document", JSON.stringify({
                    userid: user_id,
                    rendering_id: rendering_id
                }));
                await formData.append("file", file);
                console.log("FormData(before upload_start): \n " + formData);
                
                var result_b = await axios.post(back_server_link + '/rendering/upload', formData, {
                    onUploadProgress: function (progressEvent) {
                        var percent_live = parseInt (Math.round( (progressEvent.loaded * 100) / progressEvent.total));
                        console.log(percent_live);
                        document.getElementById("percent_upload").innerHTML = percent_live;
                    }.bind(this)
                });

                // set stage complete

                // // unzip start

                // $('#upload_zone').css('background-color', 'rgba(250, 184, 35, 0.4)')
                // document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 압축해제하는 중입니다.";
                // document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "절대 페이지에서 나가지 마세요.";

                let unzip_server = 'http://localhost:225';
                
                // unzip command send

                const file_ext = data_zip_info.name.split('.').pop();
                const file_n_ext = data_zip_info.name.replace('.' + file_ext, '');
                const file_saved = file_n_ext + '-' + rendering_id + '-' + user_id + '.' + file_ext;

                setTimeout(() => {
                    console.log("unzip command");

                    // send data to socket.io server

                    const server_socketio = unzip_server;

                    const socket = io.connect(server_socketio + "/stat_zip");

                    // unzip command
                    axios.post(unzip_server + "/rendering/unzip", {
                        rendering_id: rendering_id,
                        id: user_id,
                        zip_name: file_saved
                    })

                    // complete
                    $('#upload_zone').css('background-color', 'rgba(13, 220, 58, 0.46)')
                    document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일이 업로드되었습니다!";
                    document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "잠시후 다음단계로 이동합니다.";

                    setTimeout(() => {
                        $('#button_complete').click(); 
                    }, 2000);
                    
                }, 500);
            } else {
                alert("에러가 발생하였습니다. \n ErrorCode: ERR_F_RENDERINFO");
            }

            // await axios.post(back_server_link + '/setInfo_rendering', {
            //     user_id: user_id,
            //     rendering_id: rendering_id
            // })
            // .then(async function(res_record_info) {
            //     console.log(res_record_info);
            //     if (res_record_info.data.yn == true) {
            //         await formData.append("document", data_send);
            //         await formData.append("file", file);
            //         console.log("FormData(before upload_start): \n " + formData);
                    
            //         alert("업로드가 성공적으로 완료되었습니다.");
            //         $('#upload_zone').css('background-color', 'rgba(13, 220, 58, 0.46)')
            //         document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일이 업로드되었습니다!";
            //         document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "잠시후 다음단계로 이동합니다.";
            //     } else {
            //         alert("에러가 발생하였습니다. \n ErrorCode: ERR_F_RENDERINFO");
            //     }
            // })
        }










        // additional functions!!

        async function ldusrid() {
            var user_id;
            console.log("ldusrid");
            await axios.post(front_server_link + '/api/getInfo')
            .then(function(res_getInfo) {
                // console.log(res_getInfo.data);
                user_id = res_getInfo.data.id;
            });

            return user_id;
        }

        async function mkrenid(length) {
            console.log("mkrenid");
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                var data = characters.charAt(Math.floor(Math.random() * charactersLength));
                console.log(data);
                result += data;
            }
            console.log(result);
            return result;
        }

        function roll_back() {
            document.getElementsByClassName('big_exp_title_upload_zip')[0].innerHTML = "파일을 끌어다 놓아주세요!";
            document.getElementsByClassName('small_exp_title_upload_zip')[0].innerHTML = "혹은 클릭하여 파일을 선택하세요.";
            $('#upload_zone').css('background-color', 'rgba(35, 103, 250, 0.062)')
        }


        
        
    }
}
</script>

<style>
.zip_upload_form {
    left: 100px;
    transition: .5s ease;
}
.zip_upload_form .big_exp_title_upload_zip {
    font-weight: 500;
    font-size: 34px;
    position: relative;
    left: 350px;
    top: 130px;
}
.zip_upload_form .small_exp_title_upload_zip {
    font-weight: 300;
    font-size: 20px;
    position: relative;
    left: 350px;
    top: 150px;
}
#percent_upload {
    width: 30px;
    height: auto;
    font-size: 30px;
    margin-top: 130px;
    margin-left: 160px;
}
</style>
