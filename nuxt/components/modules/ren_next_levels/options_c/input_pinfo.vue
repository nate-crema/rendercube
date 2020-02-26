<template>
  <div class="vue_level_c">
    <div class="project_info_input project_info_cover">
      <form class="project_info_input_form" id="project_info_input" method="POST">
        <div class="p_file_ext">
          <p class="p_file_ext_text text">프로젝트 파일명</p>
          <input type="text" id="proj_filename" class="p_file_ext_input input" placeholder="ex) test.aep"/>
          <p class="set_info proj_filename_setted" id="proj_filename_setted"> </p>
        </div>
        <div class="ren_comp">
          <p class="ren_comp_text text">렌더링 컴포지션</p>
          <input type="text" id="ren_comp_input" class="ren_comp_input input" placeholder="컴포지션 이름을 입력해주세요!"/>
          <p class="set_info ren_comp_setted" id="ren_comp_setted"> </p>
        </div>
        <div class="ren_frame">
          <p class="ren_frame_text text">렌더링 화질/프레임</p>
          <input type="text" id="ren_frame_input" class="ren_frame_input input" placeholder="ex) 1080p||60fps"/>
          <p class="set_info ren_frame_setted" id="ren_frame_setted"> </p>
        </div>
        <div class="ren_ext">
          <p class="ren_ext_text text">렌더링 확장자</p>
          <input type="text" id="ren_ext_input" class="ren_ext_input input" placeholder="ex) mp4"/>
          <p class="set_info ren_ext_setted" id="ren_ext_setted"> </p>
        </div>
      </form>
    </div>
    <div class="project_info_upload project_info_cover">
      <form class="project_info_upload_form" id="project_info_upload" method="POST">
        <input type="file" id="input_file" hidden="hidden"/>
        <div class="upload_form contents" id="upload_zone">
          <div class="img">
            <img src="~/assets/img/cloud-computing.png"/>
          </div>
          <div class="contents_text">
            <p class="title_contents" id="title_contents">렌더링 옵션파일 업로드</p>
            <p class="explain_contents">Adobe After Effects나 Premiere Pro, <br>혹은 Media Encoder에서 사전에 사용하던 <br>렌더링 옵션파일이 있다면을 업로드해주세요.</p>
          </div>
        </div>
      </form>
    </div>
    <div class="button_next">
      <p>다음단계 ></p>
    </div>
  </div>
</template>

<script>

// import
import axios from 'axios';

// world wide methods import
import ww_plugin from '~/plugins/ww_plugin.js';
// import socket from 'http://localhost:225/socket.io/socket.io.js';

export default {
  asyncData(context, callback) {
    // socket.emit('load-p_info', function(p_data) {
    //   callback(null, {
    //     p_data
    //   })
    // })
  },
  mounted() {

    // animation

    $(".project_info_cover").addClass("fadeIn time_0_9s animated");
    $(".button_next").addClass("fadeIn time_1_5s animated");

    // upload

    const formData = new FormData();
    let file;

    // drag & drop function setting

      $("#upload_zone").on("dragover", function(e) {
          $('#upload_zone').css('background-color', 'rgba(255, 0, 0, 0.31)');
          e.preventDefault();  // allow dropping and don't navigate to file on drop
          e.stopPropagation();
      }).on("dragleave", function(e) {
          roll_back();
          e.preventDefault();  // allow dropping and don't navigate to file on drop
          e.stopPropagation();
      }).on("drop", async function(e) {
          e.preventDefault();  // allow dropping and don't navigate to file on drop
          e.stopPropagation();
          const file_dd = e.originalEvent.dataTransfer.files;
          console.log("type: drag_n_drop");

          e.preventDefault();  // allow dropping and don't navigate to file on drop
          e.stopPropagation();

          

          roll_back();
          upload_before(file_dd);
      });

    
      // additional functions!!

      async function upload_before(files) {
        if (files.length > 1 || files.length < 1) {
          alert('1개의 옵션파일만 업로드할 수 있습니다.');
          roll_back();
        } else {
          // extension check

          let ext;
          var file_sel = files[0];

          if (file_sel.type == "") {
            ext = file_sel.name.split(".").pop();
            console.log(ext);
          } else {
            ext = file_sel.type;
          }

          if (ext != "epr") {
            alert('epr 파일만 업로드할 수 있습니다.');
            roll_back();
          } else {
            document.getElementById('title_contents').innerHTML = file_sel.name;

            // disable text input
            $("#ren_frame_setted").css("color", "inherit");
            $("#ren_frame_input").removeClass("move_b");
            $("#ren_frame_input").addClass("move_a");
            setTimeout(() => {
              document.getElementById("ren_frame_setted").innerHTML = "업로드된 epr파일에서 자동으로 읽어옵니다.";
              $("#ren_frame_setted").css('opacity', '1');
            }, 700);
            result_frame = true;
            result_quality = true;
            result_ban = false;


            $("#ren_ext_input").css("border-bottom-color", "rgb(17, 77, 206)");
            $("#ren_ext_input").removeClass("move_b");
            $("#ren_ext_input").addClass("move_a");
            setTimeout(() => {
              document.getElementById("ren_ext_setted").innerHTML = "업로드된 epr파일에서 자동으로 읽어옵니다.";
              $("#ren_ext_setted").css('opacity', '1');
            }, 700);

            result_extrender = true;

            file = file_sel;

            console.log(file_sel);
          }
        }
        
      }

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
          $('#upload_zone').css('background-color', 'rgba(35, 103, 250, 0.062)')
      }




      // click upload function setting

      $('#upload_zone').click(function() {
          $('#input_file').click();
      })

      $(function() {
          $("#input_file").bind("change", function() {
              const file_dd = document.getElementById("input_file").files;
              upload_before(file_dd);
          })
      })



    // data_check
    
    let result = false;
    let result_frame = false;
    let result_quality = false;
    let result_ban = false;
    let result_extrender = false;

    function retype(typeobj, typeobj_setted) {
      document.getElementById(typeobj_setted).innerHTML = "";
      document.getElementById(typeobj).innerHTML = "";
      $(typeobj).removeClass("move_a");
      $(typeobj).addClass("move_b");
    }

    $("#proj_filename").on("change", function() {
      console.log('s');
      $("#proj_filename_setted").css("color", "inherit");
      $("#proj_filename").css("border-bottom-color", "rgb(17, 77, 206)");
      $("#proj_filename").removeClass("move_b");
      $("#proj_filename").addClass("move_a");
      setTimeout(() => {
        document.getElementById("proj_filename_setted").innerHTML = "입력 값: " + document.getElementById("proj_filename").value;
        $("#proj_filename_setted").css('opacity', '1');
        result = true;
      }, 700);
      // setTimeout(() => {
      //   // proj_filename validation check

      //   var array_okext = [
      //     "aep",
      //     "prproj"
      //   ];

        
      //   var inputed_data = document.getElementById("proj_filename").value;

      //   for (var i = 0; i < array_okext.length; i++) {
      //     if (inputed_data == array_okext[i]) {
      //       result = true;
      //     }
      //   }
      //   if (result == false) {
      //     document.getElementById("proj_filename_setted").innerHTML = "지원하지 않는 확장자 입니다!!";
      //     $("#proj_filename_setted").css("color", "red");
      //     $("#proj_filename").css("border-bottom-color", "rgb(206, 17, 17)");
      //     document.getElementById("proj_filename").value = "";
      //     $("#proj_filename").removeClass("move_a");
      //     $("#proj_filename").addClass("move_b");
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }, 900);
    })

    $("#ren_comp_input").on("change", function() {
      $("#ren_comp_input").addClass("move_a");
      setTimeout(() => {
        document.getElementById("ren_comp_setted").innerHTML = "입력 값: " + document.getElementById("ren_comp_input").value;
        $("#ren_comp_setted").css('opacity', '1');
      }, 700);
    })

    $("#ren_frame_input").on("change", function() {
      $("#ren_frame_setted").css("color", "inherit");
      $("#ren_frame_input").removeClass("move_b");
      $("#ren_frame_input").addClass("move_a");
      setTimeout(() => {
        document.getElementById("ren_frame_setted").innerHTML = "입력 값: " + document.getElementById("ren_frame_input").value;
        $("#ren_frame_setted").css('opacity', '1');
      }, 700);
      setTimeout(() => {
        // proj_filename validation check

        var array_okframe = [
          ".aep",
          ".prproj"
        ];

        var array_okquality = [
          ".aep",
          ".prproj"
        ];

        var inputed_data = document.getElementById("ren_frame_input").value;

        var data_splited = inputed_data.split("||"); 
        
        if (data_splited[1] == undefined) {
          document.getElementById("ren_frame_setted").innerHTML = "입력형식이 잘못되었습니다!!\n 입력형식: 화질||프레임";
          $("#ren_frame_setted").css("color", "red");
          $("#ren_frame_input").css("border-bottom-color", "rgb(206, 17, 17)");
          document.getElementById("ren_frame_input").value = "";
          $("#ren_frame_input").removeClass("move_a");
          $("#ren_frame_input").addClass("move_b");
          return false;
        }

        var quality = data_splited[0];
        var frame = data_splited[1];

        var array_okframe = [
          "23.98fps",
          "23.976fps",
          "24fps",
          "29.97fps",
          "30fps",
          "59.94fps",
          "60fps",
          "120fps",
        ]

        var array_okquality = [
          "360p",
          "480p",
          "720p",
          "1080p",
          "4k",
        ]

        var array_bandata = [
          "4k||120fps"
        ]
        

        // frame check

        for (var i = 0; i < array_okframe.length; i++) {
          if (frame == array_okframe[i]) {
            result_frame = true;
          }
        }

        // quality check

        for (var j = 0; j < array_okframe.length; j++) {
          if (quality == array_okquality[j]) {
            result_quality = true;
          }
        }

        // frame_quality exception check
        
        for (var k = 0; k < array_bandata.length; k++) {
          if (inputed_data == array_bandata[k]) {
            result_ban = true;
          }
        }

        if (result_quality == false) {
          document.getElementById("ren_frame_setted").innerHTML = "지원하지 않는 화질 입니다!!";
          $("#ren_frame_setted").css("color", "red");
          $("#ren_frame_input").css("border-bottom-color", "rgb(206, 17, 17)");
          document.getElementById("ren_frame_input").value = "";
          $("#ren_frame_input").removeClass("move_a");
          $("#ren_frame_input").addClass("move_b");
          return false;
        } else if (result_frame == false){
          document.getElementById("ren_frame_setted").innerHTML = "지원하지 않는 프레임 입니다!!";
          $("#ren_frame_setted").css("color", "red");
          $("#ren_frame_input").css("border-bottom-color", "rgb(206, 17, 17)");
          document.getElementById("ren_frame_input").value = "";
          $("#ren_frame_input").removeClass("move_a");
          $("#ren_frame_input").addClass("move_b");
          return false;
        } else if (result_ban == true) {
          document.getElementById("ren_frame_setted").innerHTML = "지원하지 않는 화소/프레임 조합 입니다!!";
          $("#ren_frame_setted").css("color", "red");
          $("#ren_frame_input").css("border-bottom-color", "rgb(206, 17, 17)");
          document.getElementById("ren_frame_input").value = "";
          $("#ren_frame_input").removeClass("move_a");
          $("#ren_frame_input").addClass("move_b");
          return false;
        } else {
          return true;
        }
      }, 900);
    })

    $("#ren_ext_input").on("change", function() {
      $("#ren_ext_setted").css("color", "inherit");
      $("#ren_ext_input").css("border-bottom-color", "rgb(17, 77, 206)");
      $("#ren_ext_input").removeClass("move_b");
      $("#ren_ext_input").addClass("move_a");
      setTimeout(() => {
        document.getElementById("ren_ext_setted").innerHTML = "입력 값: " + document.getElementById("ren_ext_input").value;
        $("#ren_ext_setted").css('opacity', '1');
      }, 700);
      setTimeout(() => {
        // proj_filename validation check

        var array_okext = [
          "avi"
        ];
        var array_okextlong = [
          "mp4"
        ]

        var inputed_data = document.getElementById("ren_ext_input").value;

        for (var i = 0; i < array_okext.length; i++) {
          if (inputed_data == array_okext[i]) {
            result_extrender = true;
          }
        }

        if (result_extrender == false) {
          for (var j = 0; j < array_okextlong.length; j++) {
            if (inputed_data == array_okextlong[j]) {
              result_extrender = true;
            }
          }
        }


        if (result_extrender == false) {
          document.getElementById("ren_ext_setted").innerHTML = "지원하지 않는 확장자 입니다!!";
          $("#ren_ext_setted").css("color", "red");
          $("#ren_ext_input").css("border-bottom-color", "rgb(206, 17, 17)");
          document.getElementById("ren_ext_input").value = "";
          $("#ren_ext_input").removeClass("move_a");
          $("#ren_ext_input").addClass("move_b");
          return false;
        } else {
          return true;
        }
      }, 900);
    });

    // click action

    $(".button_next").click(async function() {

      let document_data;

      console.log(document_data);
      
      if (result && typeof document.getElementById("ren_comp_input").value != undefined && result_frame && result_quality && result_ban == false && result_extrender) {
        console.log("Checked!");
        
        // const data_document = $('#project_info_input').serialize();
        // console.log(data_document);
        // const data_divide = data_document.split("&");
        // let data_export_a = "";
        // for (var i = 0; i < data_divide.length; i++) {
        //   var divide_second = data_divide[i].split("=");
        //   data_export_a = data_export_a + "'" + data_divide[i][0] + "': '" + data_divide[i][1] + "',";
        // }
        // let data_export = "{" + data_export_a + "}";
        // console.log(data_export);
        // const data_json = JSON.parse(data_export);

        // // get user information from session
        // // var newinfo = JSON.parse(data_export);

        let type_upload;

        if (file == null || file == undefined) {
          if(confirm("렌더링 옵션 파일 (.epr 파일)을 업로드하지 않고 다음단계로 가시겠습니까?")) {
            console.log("Without epr file");
            type_upload = "b";
          } else {
            alert("선택된 epr파일이 존재하지 않습니다.");
            formData = new FormData();
            return false;
          }
        } else {
          if (confirm("업로드하는 설정파일을 확인해주세요. \n 파일명: " +  file.name)) {
            console.log("With epr file");
            type_upload = "a";
          } else {
            return false;
          }
        }

        console.log("start ready to send");

        var user_id = await axios.post('/api/getInfo');
        var stage_saved_data = await axios.post('/api/stage_save_load');
        console.log()

        console.log(user_id);
        

        // get data

        var data_project_filename = document.getElementById("proj_filename").value;
        var data_ren_comp = document.getElementById("ren_comp_input").value;
        var data_ren_frame = document.getElementById("ren_frame_input").value;
        var data_ren_ext = document.getElementById("ren_ext_input").value;

        // set data



        document_data = {
          type: type_upload,
          userinfo: {
            id: user_id.data.id,
            rendering_id: stage_saved_data.data.ren_id,
            zip_info: stage_saved_data.data.zip_info
          }
        }

        console.log(document_data);
        console.log(user_id);
        console.log(stage_saved_data);

        if (type_upload == "a") {
          // with file

          document_data.newinfo = {
            proj_filename: data_project_filename,
            ren_comp: data_ren_comp
          }
          
          formData.append("document", JSON.stringify(document_data));
          formData.append("file", file);
          
        } else if (type_upload == "b") {
          // without file

          document_data.newinfo = {
            proj_filename: data_project_filename,
            ren_comp: data_ren_comp,
            ren_frame: data_ren_frame,
            ren_ext: data_ren_ext
          }

          console.log("document_data----");
          console.log(document_data);
          console.log("document_data----");

          // formData.append("document", document_data);
          formData.set("document", JSON.stringify(document_data));

        } else {
          alert("ERROR: can't find type_upload");
          return false;
        }    

        // send data
        var back_server_link = "http://" + (location.host || "localhost") + ":2766";
        const result = await axios.post(back_server_link + '/rendering/infos', formData);

        console.log(result);
        if (result.data == true) {
          // c_to_d();
          alert("정보 설정이 완료되었습니다.");
          
          // save stage

          axios.post('/api/stage_update', {
              stage: "input_pinfo"
          })
          
          setTimeout(() => {
            location.reload();
          }, 300);
        } else {
          alert("등록중 문제가 발생했습니다.\n 다시 시도해주세요.");
          document_data = undefined;
          console.log(document_data);
        }

        
      } else {
        alert("아직 모든 정보가 입력되지 않았습니다.");
        console.log(result);
        console.log(result_frame);
        console.log(result_quality);
        console.log(result_ban);
        console.log(document.getElementById("ren_comp_input").value != "");
        location.reload();
      }
    });
  }
}
</script>

<style>
/* keyframes */
@keyframes move_a {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
@-webkit-keyframes move_a {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
.move_a {
  animation-name: move_a;
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-name: move_a;
  -webkit-animation-duration: 1s;
}
@keyframes move_b {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes move_b {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.move_b {
  animation-name: move_b;
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-name: move_b;
  -webkit-animation-duration: 1s;
}
/* keyframes end */
.project_info_cover {
  background-color: rgba(12, 77, 216, 0.062);
  border-radius: 2em;
  position: absolute;
  top: 150px;
  opacity: 0;
}
.project_info_input {
  width: 550px;
  height: 510px;
}
.project_info_upload {
  width: 400px;
  height: 510px;
  left: 600px; 
}

.project_info_input_form {
  position: relative;
  top: 10px;
  left: 30px;
}

.text {
  position: relative;
  top: 30px;
  margin-top: 15px;
  font-size: 17px;
  left: 40px;
  font-weight: 300;
  width: 200px;
  background-color: rgba(235, 239, 247);
  transition: .5s ease;
  animation: .5s ease;
  z-index: 100;
}
.set_info {
    position: relative;
    top: -10px;
    left: 40px;
    opacity: 0;
    transition: .5s ease;
    animation: .5s ease;
}
.input {
  position: relative;
  top: -25px;
  font-size: 15px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0);
  left: 250px;
  margin-top: 30px;
  border: none;
  border-bottom: 1px solid rgb(17, 77, 206);
}
.input:focus {
  outline: none;
}
.input::placeholder {
  color: rgb(197, 197, 197);
}
.project_info_upload_form {
  width: 100%;
  height: 100%;
  position: relative;
}
.project_info_upload_form .upload_form {
  width: 100%;
  height: 100%;
  border-radius: 2em;
}
.project_info_upload_form .contents {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  transition: .3s ease;
}
.project_info_upload_form .contents .img {
  width: 144px;
  height: 127px;
  margin: auto;
  position: relative;
  top: 100px;
}
.project_info_upload_form .contents .img img {
  width: 100%;
  height: 100%;
}
.project_info_upload_form .contents .contents_text {
  width: 100%;
  height: 200px;
  position: relative;
  top: 100px;
}
.project_info_upload_form .contents .contents_text .title_contents {
  font-size: 25px;
  font-weight: 400;
  color: #2053b2;
  text-align: center;
  margin-top: 80px;
}
.project_info_upload_form .contents .contents_text .explain_contents {
  font-size: 12px;
  font-weight: 300;
  color: black;
  text-align: center;
  margin-top: 50px;
}
.button_next {
  width: 150px;
  height: 80px;
  border-radius: 1.6em;
  background-color: rgba(12, 77, 216, 0.062);
  border: 1px solid rgb(17, 77, 206);
  position: relative;
  left: 1020px;
  top: 470px;
  opacity: 0;
  cursor: pointer;
  transition: .2s ease;
}
.button_next:hover {
  background-color: rgba(12, 77, 216, 0.432);
  border: 1px solid rgb(21, 78, 202);
}
.button_next p {
  font-size: 15px;
  font-weight: 300; 
  text-align: center;
  padding-top: 25px;
}
</style>