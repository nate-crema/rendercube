<template>
    <div class="selector_pr_sv select_area level_a_end boxes" v-on:click="page_load_b_sr_pr()">
        <div class="img">
            <img src="~/assets/img/server_c.svg" class="img_explain"/>
        </div>
        <p class="type">Rendercube P.R. Service Server</p>
        <p class="explain_type">빠른 렌더링 속도를 제공하는 렌더링 서버입니다.<br>신청순서에 따라 렌더큐에 등록되어 렌더링됩니다.</p>
    </div>
</template>

<script>

// import
import ww_plugin from '~/plugins/ww_plugin.js';
import axios from 'axios';

export default {
    components: {
        ww_plugin
    },
    methods: {
        page_load_b_sr_pr: function() {
            console.log('sel_server_selector clicked');
            // infos.render_type_small = "pr";
            // infos.stage = "b";

            this.$store.dispatch('setInfo', {
                infos: {
                    type: {
                        rtype: {
                            b: 'server',
                            s: 'pr'
                        },
                        stage: 'b'
                    }
                }
            });

            // //erase stage
            // this.$remove_stage('#r_pr_server', '#r_er_server');
            // //load stage
            // this.$load_stage('.project_select');
            // update: 20190907

            // update: 20190907

            // save status
            axios.post('/api/stage_save', {
                data: {
                    tf: false,
                    ren_id: undefined,
                    zip_info: undefined,
                    stage: 'render_selected'
                }
            })
            .then(function(res) {
                setTimeout(() => {
                    location.reload(); 
                }, 1000);
            });

            this.$remove_stage('.levels_a_sv');
            this.$remove_title();
            // this.$change_title('프로젝트 선택', '렌더링할 프로젝트를 선택합니다.', '250px');
        }
    }
}
</script>

<style>
.selector_pr_sv {
    position: relative;
    top: -320px;
    left: 180px;
}
.selector_pr_sv .type {
    font-size: 16px !important;
}
</style>
