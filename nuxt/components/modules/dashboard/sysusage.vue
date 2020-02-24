<template>
    <div class="modules_sysusage module" :class="$mq">
        <router-link to="/workarea/system_live" class="move_specif">세부사항 ></router-link>
        <a class="move_specif" onclick="animateCircle()">새로고침</a>
        <p class="modules_title">시스템 사용량</p>
        <div class="c_cover">
            <div class="c_back"></div>
            <canvas width="280" height="280" class="c_real"></canvas>
            <p class="su_percent_real" id="su_p_real">%</p>
            <p class="su_percent_comm">CPU/GPU 사용량 평균</p>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {

        $(document).ready(function() {

            var usage_p = 89;

            var usage_su_p_cvt;

            if (usage_p == 0) {
                usage_su_p_cvt = 1.5;
            } else if (usage_p == 100) {
                usage_su_p_cvt = 1.4999;
            } else {
                usage_su_p_cvt = usage_p * 0.02 - 0.5;
            }


            // var canvas = document.querySelector('canvas');
            // var ctx = canvas.getContext('2d');
            // var end = Math.PI * 1.5;
            // for (var i = 0; i < 100; i++) {
            //     setTimeout(function() {
            //     ctx.clearRect(0, 0, 280, 280);
            //     ctx.beginPath();
            //     ctx.arc(140, 140, 120, Math.PI * 1.5, Math.PI * usage_su_p_cvt);
            //     ctx.stroke();
            //     }, i * 10);
            //     console.log(i)
            // };


            var canvas = document.querySelector('canvas');
            var ctx = canvas.getContext('2d');
            ctx.strokeStyle = "rgba(0, 120, 255, 0.53)";
            ctx.beginPath();
            ctx.lineWidth = 40;
            ctx.arc(140, 140, 120, Math.PI * 1.5, Math.PI * usage_su_p_cvt);
            //Math.PI * 1.5: 0에서 시작값
            ctx.stroke();
            document.getElementById("su_p_real").innerHTML = usage_p + "%";
        });

        //usage percent calculating - system usage

        //example: 34%
        

        // 0 : 1.5
        // 25: 0
        // 50: 0.5
        // 75: 1

    },
    beforeMount() {
    }
}
</script>

<style>
.modules_sysusage {
    position: relative;
    top: -370px;
    left: 400px;
    width: 30%;
    height: 450px;
}
.modules_sysusage .modules_title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.48;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 34px;
    padding-left: 40px;
    z-index: 0;
    position: relative;
    top: -15px;
}
.modules_sysusage .move_specif {
    z-index: 1;
    margin-left: 180px;
    font-size: 14px;
    color: rgb(82, 82, 82);
    position: relative;
    top: 30px;
}
.modules_sysusage .c_cover {
    position: relative;
    top: -50px;
}
.modules_sysusage .c_cover .c_back {
    width: 280px;
    height: 280px;
    border: solid 40px rgba(255, 255, 255, 0);
    border-radius: 150px;
    background-color: rgba(255, 255, 255, 0);
    position: relative;
    top: 60px;
    margin: auto;
}
.modules_sysusage .c_cover .c_real {
    width: 280px;
    height: 280px;
    position: relative;
    top: -219px;
    left: 40px;
    margin: auto;
}
.modules_sysusage .c_cover .su_percent_real {
    position: relative;
    font-size: 35px;
    top: -400px;
    text-align: center;
}
.modules_sysusage .c_cover .su_percent_comm {
    position: relative;
    font-size: 8px;
    font-weight: 400;
    top: -390px;
    text-align: center;
}

</style>