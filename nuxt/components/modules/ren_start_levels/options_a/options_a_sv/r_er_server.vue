<template>
    <div class="selector_er_sv select_area level_a_end boxes" v-on:click="page_load_b_sr_er()">
        <div class="img">
            <img src="~/assets/img/server_c.svg" class="img_explain"/>
        </div>
        <p class="type">Rendercube E.R. Service Server</p>
        <p class="explain_type">급한 렌더링을 위한 분들에게 제공하는 급속렌더링 서버입니다.<br>렌더링 프레임, 화질 등의 제한이 있을 수 있습니다.</p>
    </div>
</template>

<script>

import ww_plugin from '~/plugins/ww_plugin.js';
import axios from 'axios';
export default {
    components: {
        ww_plugin
    },
    methods: {
        page_load_b_sr_er: function() {
            console.log('sel_server_selector clicked');
            // infos.render_type_small = "er";
            // infos.stage = "b";

            this.$store.dispatch('setInfo', {
                infos: {
                    type: {
                        rtype: {
                            b: 'server',
                            s: 'er'
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
.selector_er_sv {
    width: 300px;
    height: 400px;
    position: relative;
    left: 550px;
    top: 80px;
}
.selector_er_sv .type {
    font-size: 16px !important;
}
</style>
