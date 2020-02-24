<template>
    <div class="modules_sgpv module" :class="$mq">
        <p class="modules_title">렌더링 서버 그룹</p>
        <div class="server_cover">
            <img src="~/assets/img/server_a.svg"/>
            <p class="server_g_name">Rendercube - Beta T.S. Group</p>
            <p class="using_p">[ser_p]%</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .modules_sgpv {
        position: relative;
        top: 50px;
        width: 30%;
        height: 210px;
    }
    .modules_sgpv .modules_title {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.48;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
        margin-bottom: 34px;
        padding-top: 30px;
        padding-left: 40px;
    }
    .server_cover {
        margin: auto;
        width: 85%;
        height: 100px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.47);
        position: relative;
        top: -10px;
        transition: .3s ease;
    }
    .server_cover:hover {
        background-color: rgba(255, 255, 255, 0.8);
    }
    .server_cover img {
        width: 50px;
        height: auto;
        margin-top: 25px;
        margin-left: 25px;
    }
    .server_cover .server_g_name {
        text-align: left;
        margin-top: -50px;
        margin-left: 100px;
        font-size: 13px;
        font-weight: 600;
    }
    .server_cover .using_p {
        font-size: 15px;
        font-weight: 500;
        margin-left: 100px;
        margin-top: 10px;
    }
</style>
