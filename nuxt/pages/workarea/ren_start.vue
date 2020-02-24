<template>
    <div class="start_rendering">
        <div class="area_title">            
            <span v-if='$store.state.stage_save.stage == undefined'>
                <p class="title fadeInDown time_1s animated" id="main_title" >렌더링 시작하기</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle">렌더링을 시작합니다</p>
            </span>
            <span v-else-if='$store.state.stage_save.stage == "sel_server"'>
                <p class="title fadeInDown time_1s animated" id="main_title">서버에서 처리하기</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle"></p>
            </span>
            <span v-else-if='$store.state.stage_save.stage == "sel_p"'>
                <p class="title fadeInDown time_1s animated" id="main_title">개인PC에서 처리하기</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle"></p>
            </span>
            <span v-else-if='$store.state.stage_save.stage == "sel_s"'>
                <p class="title fadeInDown time_1s animated" id="main_title" >공유PC에서 처리하기</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle"></p>
            </span>
            <span v-else-if='$store.state.stage_save.stage == "render_selected"'>
                <p class="title fadeInDown time_1s animated" id="main_title">프로젝트 선택</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle" style="margin-left: 250px !important;">렌더링할 프로젝트를 선택합니다.</p>
            </span>
            <span v-else-if="$store.state.stage_save.stage == 'zip_upload'">
                <p class="title fadeInDown time_1s animated" id="main_title">압축파일 해제 및 분석중</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle" style="margin-left: 450px !important;">압축파일 해제 및 분석중입니다. 잠시 기다리시거나 다른 설정을 먼저 완료해주세요!</p>
            </span>
            <span v-else-if="$store.state.stage_save.stage == 'unzipped'">
                <p class="title fadeInDown time_1s animated" id="main_title">렌더링 이어하기</P>
                <p class="subtitle fadeInDown delay_0_2s time_0_8s animated" id="main_subtitle">업로드한 파일의 렌더링 정보를 설정해주세요</p>
            </span>
            <!-- <p class="title fadeInDown time_1s animated" id="main_title" v-if='$store.state.stage_save.stage == undefined'>렌더링 시작하기</P> -->
            <div class="line_a line_title"></div>
            <div class="restart">
                <p v-on:click="reload_page()">다시 시작하기</p>
            </div>
        </div>
        <rendering-next v-if="$store.state.stage_save.tf == true && $store.state.stage_save.stage == 'unzipped'"></rendering-next>
        <unziping v-else-if="$store.state.stage_save.tf == true && $store.state.stage_save.stage == 'zip_upload'"></unziping>
        <renderplace-select v-else></renderplace-select>
    </div>
</template>

<script>

import ren_sel from '~/components/modules/ren_start_levels/ren_sel.vue';
import ren_next from '~/components/modules/ren_start_levels/ren_next.vue';
import unziping from '~/components/modules/ren_start_levels/unziping.vue';

import axios from 'axios';


export default {
    components: {
        "renderplace-select": ren_sel,
        "rendering-next": ren_next,
        unziping
    },
    methods: {
        reload_page: function() {

            if (confirm("진행중인 렌더링 세팅을 초기화하고 \n 다시 시작하시겠습니까?")) {
                // reset all previous data
                axios.post('/api/stage_save', {
                    data: 'no'
                })
                // reload page
                location.reload()   
            }
        }
    }
}
</script>

<style>

/* ren_start */
.start_rendering {
    width: 1200px;
    height: 700px;
}
.boxes {
    /* fadeIn */
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;

    /* time_1_5s */
    animation-duration: 1.5s !important;

    /* animated */
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.levels {
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    z-index: 1;
}
.restart {
    font-size: 15px;
    font-weight: 300;
    position: relative;
    top: 12px;
    z-index: 1000;
    width: 150px;
}
.restart p {
    color: rgba(0, 33, 143, 0.945);
    cursor: pointer;
}

/* levels_common_css */
</style>
