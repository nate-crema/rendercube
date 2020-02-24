<template>
    <div class="select_area sel_server boxes" v-on:click="sel_server_selector_click()">
        <div class="img">
            <img src="~/assets/img/server_b.svg" class="img_explain"/>
        </div>
        <p class="type">서버에서 처리하기</p>
        <p class="explain_type">Rendercube 메인 서비스 서버에서 처리합니다.<br>아직 베타이기 때문에 간헐적으로 느릴 수 있습니다.</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    components: {
    },
    methods: {
        sel_server_selector_click: function() {
            console.log('sefes');
            // infos.stage = "a_server";
            // infos.render_type_big = "server";
            // console.log(infos);

            
            
            // //erase stage
            // this.$remove_stage('#sel_server_selector', '#sel_pc_p_selector', '#sel_pc_s_selector');

            // //load stage
            // this.$load_stage('.selector_pr_sv', '.selector_er_sv');

            // update: 20190907

            // save status
            axios.post('/api/stage_save', {
                data: {
                    tf: false,
                    ren_id: undefined,
                    zip_info: undefined,
                    stage: 'sel_server'
                }
            })
            .then(function(res) {
                setTimeout(() => {
                    location.reload(); 
                }, 1000);
            });
            this.$remove_stage('.levels_a');
            this.$remove_title();
            // this.$change_title('서버에서 처리하기');
        },
        mounted() {
            console.log(this);
        }
    }
}
</script>

<style>
.sel_server {
    position: relative;
    top: 80px;
    left: 10px;
}
</style>
