<template>
    <div class="select_area sel_pc_p boxes" v-on:click="sel_pc_p_selector_click()">
        <div class="img">
            <img src="~/assets/img/pc_p.svg" class="img_explain"/>
        </div>
        <p class="type">개인PC에서 처리하기</p>
        <p class="explain_type">개인용 PC에서 렌더링을 합니다.<br>사전에 Rendercube 원격 렌더링 프로그램에 <br>등록되어있어야 합니다.</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        sel_pc_p_selector_click: function() {
            console.log('personal pc rendering clicked');
            // infos.render_type_big = 'personal';
            // infos.stage = "a_pc_p"

            // //erase stage
            // this.$remove_stage('#sel_server_selector', '#sel_pc_p_selector', '#sel_pc_s_selector');

            // //load stage
            // this.$load_stage('.selector_p_reged');

            // update: 20190907

            // save status
            axios.post('/api/stage_save', {
                data: {
                    tf: false,
                    ren_id: undefined,
                    zip_info: undefined,
                    stage: 'sel_p'
                }
            })
            .then(function(res) {
                setTimeout(() => {
                    location.reload(); 
                }, 1000);
            });
            this.$remove_stage('.levels_a');
            this.$remove_title();
            // this.$change_title('개인PC에서 처리하기', '등록된 PC를 선택해주세요', '380px');
        }
    }
}
</script>

<style>
.sel_pc_p {
    position: relative;
    top: -320px;
    left: 380px;
}
</style>
