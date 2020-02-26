<template>
  <div class="unziping">
      <div class="video" style="margin: auto; width: 800px; height: auto; margin-top: 50px;">
          <video width="800" loop>
              <source src="~/assets/video/unzip.webm" type="video/webm">
              브라우저에서 영상재생을 지원하지 않습니다.
          </video>
      </div>
      
  </div>
</template>

<script>

import axios from 'axios';

export default {
    mounted: async function(){
        document.querySelector('video').play();
        document.querySelector('video').playbackRate = 1.5;

        // take rendering id

        const req_a = await axios.post('/api/stage_save_load');
        const req_b = await axios.post('/api/getInfo');
        const ren_id = req_a.data.ren_id;
        console.log(req_a);
        console.log(req_b);
        console.log(ren_id);
        const id = req_b.data.id;
        
        const server_socketio = "http://" + location.host + ":225";
        console.log(process.env);
        console.log(server_socketio);
        const socket = io.connect(server_socketio + "/stat_zip");

        socket.on('unzipped_' + ren_id, async function(data) {

            console.log("socketed");
            // check validation

            if (data.id == id && data.ren_id == ren_id) {

                alert("압축 해제가 완료되었습니다!");

                const local_server = "http://" + (location.host || "localhost") + ":" + (process.env.PORT || "80") + "/api";

                // set vuex - stage
        
                await axios.post(local_server + "/stage_update", {
                    stage: "unzipped"
                })

                // set vuex - project analytics result
                
                await axios.post(local_server + "/p_analy_save", {
                    data: data.data_analytics
                })
                
                console.log("Complete!");
                location.reload();
            } else {

            }
        })

        // while(true) {
        //     const result = axios.post('/check_end', {ren_id: ren_id}).data;
        //     if (result == true) {
        //         location.reload();
        //     } else {
        //         setTimeout(() => {
        //             console.log('');
        //         }, 50000);
        //     }
        // }


    }
}
</script>

<style>

</style>