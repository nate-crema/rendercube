<template>
    <div class="modules_sys_info module">
        <div class="title_cover">
            <p class="modules_title">시스템 사양</p>    
        </div>
        <div class="contents-wrap cont_title_wrap">
            <p class="cont_title cpu">CPU</p>
            <p class="cont_title ram">RAM</p>
            <p class="cont_title gpu">GPU</p>
            <p class="cont_title ip">IP</p>
            <p class="cont_title visu_yn">가상화 여부</p>
            <p class="cont_title ftp_yn">FTP서버 사용가능 여부</p>
        </div>
        <div class="contents-wrap contents_wrap">
            <p class="contents cpu">[cpu_model]</p>
            <p class="contents ram">[ram_amount]</p>
            <p class="contents gpu">[gpu_model]</p>
            <p class="contents ip">[ip]</p>
            <p class="contents visu_yn">[visualize]</p>
            <p class="contents ftp_yn">[ftp]</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.modules_sys_info {
    width: 700px;
    height: 350px;
    position: relative;
    top: -940px;
    left: 500px;
}
.modules_sys_info .title_cover .modules_title {
    padding-top: 20px;
}
.modules_sys_info .contents-wrap {
    font-size: 20px;

}
.modules_sys_info .contents-wrap .cont_title {
    font-weight: 500;
}
.modules_sys_info .contents-wrap.cont_title_wrap {
    position: relative;
    line-height: 40px;
    left: 50px;
}
.modules_sys_info .contents-wrap.contents_wrap {
    position: relative;
    top: -240px;
    left: 130px;
    line-height: 40px;
}
.modules_sys_info .contents-wrap .contents {
    font-weight: 300;
    margin-left: 200px;
}
</style>
