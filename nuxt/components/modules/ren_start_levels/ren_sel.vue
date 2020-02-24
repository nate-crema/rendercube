<template>
    <div class="levels">
        <button hidden="hidden" id="auto_click" v-on:click="auto_check()"></button>
        <div class="levels_a" v-if="$store.state.stage_save.stage == undefined">
            <sel-server id="sel_server_selector"></sel-server>
            <sel-pc-p id="sel_pc_p_selector"></sel-pc-p>
            <sel-pc-s id="sel_pc_s_selector"></sel-pc-s>
        </div>
        <div class="levels_a_sv" v-else-if='$store.state.stage_save.stage == "sel_server"'>
            <r-er-server id="r_er_server"></r-er-server>
            <r-pr-server id="r_pr_server"></r-pr-server>
        </div>
        <div class="levels_a_p" v-else-if='$store.state.stage_save.stage == "sel_p"'>
            <r-p-list id="r_p_list"></r-p-list>
        </div>
        <div class="levels_a_s" v-else-if='$store.state.stage_save.stage == "sel_s"'>
            
        </div>
        <div class="levels_b" v-else-if='$store.state.stage_save.stage == "render_selected"'>
            <div class="project_select">
                <zip-upload id="zip_upload"></zip-upload>
                <load-file id="load_file"></load-file>
                <div class="zip_upload_form">
                    <zip-upload-form id="zip_upload_form"></zip-upload-form>
                </div>
                <div class="load_file_form">
                    <load-file-form id="load_file_form"></load-file-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// world wide methods import
import ww_plugin from '~/plugins/ww_plugin.js'

// Vuex - index.js import

import store from '~/store/index.js'

// levels_a

import sel_server from '~/components/modules/ren_start_levels/options_a/sel_server.vue';
import sel_pc_p from '~/components/modules/ren_start_levels/options_a/sel_pc_p.vue';
import sel_pc_s from '~/components/modules/ren_start_levels/options_a/sel_pc_s.vue';

// levels_a_sv

import r_er_server from '~/components/modules/ren_start_levels/options_a/options_a_sv/r_er_server.vue';
import r_pr_server from '~/components/modules/ren_start_levels/options_a/options_a_sv/r_pr_server.vue';

//levels_a_p

import r_p_list from '~/components/modules/ren_start_levels/options_a/options_a_p/r_p_list.vue';

//levels_b

import zip_upload from '~/components/modules/ren_start_levels/options_b/sel_zip_upload.vue';
import load_file from '~/components/modules/ren_start_levels/options_b/sel_load_file.vue';
import zip_upload_form from '~/components/modules/ren_start_levels/options_b/zip_upload_form.vue';
import load_file_form from '~/components/modules/ren_start_levels/options_b/load_file_form.vue';


export default {
    components: {

        //levels_a
        
        "sel-server": sel_server,
        "sel-pc-p": sel_pc_p,
        "sel-pc-s": sel_pc_s,

        //levels_a_sv

        "r-er-server": r_er_server,
        "r-pr-server": r_pr_server,

        //levels_a_pc_p

        "r-p-list": r_p_list,

        //levels_b

        "zip-upload": zip_upload,
        "load-file": load_file,
        "zip-upload-form": zip_upload_form,
        "load-file-form": load_file_form,

        store,
        ww_plugin
        
    },
    methods: {
        auto_check: function() {
            this.$store.dispatch('setInfo', {
                infos: {
                    type: {
                        stage: 'a'
                    }
                }
            })
        }
    },
    mounted() {

        // console.log(this.$state)
        // console.log(store.state);

        // var status = 'a';

        // var render_type_big = ''; // server or personal or shared
        // var render_type_small = ''; // server: pr or er, personal: name of pc, shared: code of pc
        // var upload_type = ''; // zip or exist
        // var uploaded = false; // true or false

        // var project_info = new Array({
        //     file_name: '', // project file name (ex: test.aep) 
        //     comp_name: '', // composition name
        //     file_ext: '', // project file extension (ex: aep)
        //     file_size: '' // file size
        // });

        // var plugins = new Array({
        //     plugin_use: false, // true or false
        //     plugin_num: 0, // plugin using number
        //     plugin_info: {} // plugin infos
        // });

        // var payment = new Array({
        //     paid: false,
        //     card_company: '',
        //     pay_type: '',
        //     dig_6_pw: '', // if pay_type is fast_r_pay
        //     enc_c_info: '', // if pay_type is fast_r_pay
        //     card_num: '',
        //     card_pw_2digit: '',
        //     card_cvc: '',
        //     card_own: '',
        //     card_pn: ''
        // })

        // var rendering_project_total = new Array({
        //     render_type: {
        //         big: render_type_big,
        //         small: render_type_small
        //     },
        //     upload_type: upload_type,
        //     uploaded: uploaded,
        //     project_info: project_info,
        //     plugins: plugins,
        //     payment: payment
        // })
        
        //levels_a


        //main_a_stage

        //server selected
        // var infos = new Array();

        // document.getElementById("sel_server_selector").onclick = function() {
        // }

        // //pc_p selected

        // document.getElementById("sel_pc_p_selector").onclick = function() {
            
        // }

        //level_a --> level_b
            // document.getElementById('sel_server_selector').onclick ||
            // document.getElementById('sel_pc_p_selector').onclick ||
            // document.getElementById('sel_pc_s_selector').onclick
            // document.getElementById('sel_pc_p_ed_selector').onclick

            
        document.getElementById('auto_click').click();
        
    }
    
}
</script>

<style>

/* selctor_common_css */

.select_area {
    width: 300px;
    height: 400px;
    border-radius: 46px;
    background-color: rgba(35, 103, 250, 0.062);
    transition: .3s ease;
    cursor: pointer;
}
.select_area .img {
    width: 120px;
    height: auto;
    margin: auto;
    position: relative;
    top: 100px;
}
.select_area .img img {
    width: 120px;
    height: auto;
}
.select_area .type {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-top: 150px;
    color: rgb(0, 0, 0);
}
.select_area .explain_type {
    margin-top: 25px;
    font-size: 10px;
    font-weight: 300;
    text-align: center;
    color: rgb(102, 102, 102);
}
.select_area:hover {
    background-color: rgba(0, 80, 252, 0.137);
}

.project_select {
    position: relative;
    top: 80px;
}

/* module_big_common_css */

.module_big {
    position: relative;
    width: 900px;
    height: 400px;
    border-radius: 46px;
    background-color: rgba(35, 103, 250, 0.062);
    transition: .3s ease;
    cursor: pointer;
}

/* tag-css */

.selector_pr_sv, .selector_er_sv, .selector_p_reged, .project_select, .zip_upload_form {
    /* opacity: 0;
    display: none; */
}


</style>
