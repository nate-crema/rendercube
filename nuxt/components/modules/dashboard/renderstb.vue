<template>
    <div class="modules_renderstb module" :class="$mq">
        <router-link to="/workarea/ren_stb" class="move_specif">대기열 ></router-link>
        <p class="modules_title">렌더링 대기열</p>
        <div class="render_obj_cover_wrapper">
            <div class="render_obj_cover" v-for="item in items"
            :key="item.querynum">
                <img src="~/assets/img/video_icon.svg"/>
                <p class="render_obj_name">{{item.v_name}}.{{item.v_ext}}</p>
                <p class="using_p">{{item.progress_p}}</p>
                <div class="bar_cover">
                    <div class="render_p_bar_back render_p_bar bar_back"></div>
                    <div class="render_p_bar_real render_p_bar bar_real" :style="{width: item.progress_p}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    mounted() {

        const render_status = [{
                    v_name: "test_a",
                    v_ext: "mp4",
                    querynum: "a",
                    link: "https://test.com",
                    progress_p: "55%"
                },
                {
                    v_name: "test_b",
                    v_ext: "avi",
                    querynum: "b",
                    link: "https://test.com",
                    progress_p: "25%"
                },
                {
                    v_name: "test_c",
                    v_ext: "mp4",
                    querynum: "c",
                    link: "https://test.com",
                    progress_p: "64%"
                },
                {
                    v_name: "test_d",
                    v_ext: "mp4",
                    querynum: "d",
                    link: "https://test.com",
                    progress_p: "100%"
                },
                {
                    v_name: "test_e",
                    v_ext: "mp4",
                    querynum: "e",
                    link: "https://test.com",
                    progress_p: "0%"
                }];

        var render_stat_array = new Array();
        
        for (var i = 0; i < render_status[0].length; i++) {
            
        }
    },
    data() {
        return {
            items: [{
                v_name: "test_a",
                v_ext: "mp4",
                querynum: "a",
                link: "https://test.com",
                progress_p: "55%"
            },
            {
                v_name: "test_b",
                v_ext: "avi",
                querynum: "b",
                link: "https://test.com",
                progress_p: "25%"
            },
            {
                v_name: "test_c",
                v_ext: "mp4",
                querynum: "c",
                link: "https://test.com",
                progress_p: "64%"
            },
            {
                v_name: "test_d",
                v_ext: "mp4",
                querynum: "d",
                link: "https://test.com",
                progress_p: "100%"
            },
            {
                v_name: "test_e",
                v_ext: "mp4",
                querynum: "e",
                link: "https://test.com",
                progress_p: "0%"
            }]
        }
    }
}

</script>

<style>
.modules_renderstb {
    position: relative;
    top: -820px;
    left: 800px;
    width: 30%;
    height: 450px;
}
.modules_renderstb .modules_title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.48;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 34px;
    padding-top: 10px;
    padding-left: 40px;
    z-index: 2;
}
.modules_renderstb .move_specif {
    z-index: 1;
    margin-left: 180px;
    font-size: 14px;
    color: rgb(82, 82, 82);
    position: relative;
    top: 40px;
}
.modules_renderstb .render_obj_cover_wrapper {
    width: 90%;
    height: 330px;
    margin: auto;
    overflow: scroll;
}
.modules_renderstb .render_obj_cover {
    width: 95%;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.47);
    border-radius: 15px;
    position:relative;
    margin: auto;
    margin-bottom: 20px;
    cursor: pointer;
    transition: .3s ease;
}
.modules_renderstb .render_obj_cover:hover {
    background-color: rgba(255, 255, 255, 0.8);
}
.modules_renderstb .render_obj_cover img {
    width: 50px;
    height: auto;
    margin-top: 25px;
    margin-left: 25px;
}
.modules_renderstb .render_obj_cover .render_obj_name {
    font-size: 15px;
    font-weight: 700;
    margin-left: 100px;
    margin-top: -50px;
}
.modules_renderstb .render_obj_cover .using_p {
    font-size: 14px;
    margin-top: 10px;
    margin-left: 240px;
}
.modules_renderstb .render_obj_cover .render_p_bar {
    width: 130px;
    height: 2px;
    border-radius: 2px;
}
.modules_renderstb .render_obj_cover .bar_cover {
    width: 130px;
    height: 2px;
    position: relative;
    margin: auto;
    margin-top: -5px;
}
.modules_renderstb .render_obj_cover .bar_cover .bar_back {
    background-color: #92c6b2;
    position: relative;
}
.modules_renderstb .render_obj_cover .bar_cover .bar_real {
    background-color: #20a71b;
    position: relative;
    top: -2px;
    width: 10px;
}
</style>
