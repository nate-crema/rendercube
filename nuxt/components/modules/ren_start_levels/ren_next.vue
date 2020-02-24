<template>
    <div class="levels">
        <p class="rendering_id_show"></p>
        <div class="levels_c" v-if="$store.state.stage_save.stage == 'unzipped'">
            <input-pinfo id="input_pinfo"></input-pinfo>
        </div>
        <div class="levels_d" v-else-if="$store.state.stage_save.stage == 'input_pinfo'">
            <user-plugin id="user_plugin"></user-plugin>
        </div>
        <!--<div class="levels_e">
            <pay id="pay"></pay>
        </div>
        <div class="levels_f">
            <end id="end"></end>
        </div>
        <div class="levels_g">
            <end-show id="end_show"></end-show>
        </div> -->
    </div>
</template>

<script>

// import

// options_c
import input_pinfo from '~/components/modules/ren_next_levels/options_c/input_pinfo.vue';
// options_d
import user_plugin from '~/components/modules/ren_next_levels/options_d/user_plugin.vue';
// options_e
import pay from '~/components/modules/ren_next_levels/options_e/pay.vue';
// options_f
import end from '~/components/modules/ren_next_levels/options_f/end.vue';
// options_g
import end_show from '~/components/modules/ren_next_levels/options_g/end_show.vue';



import axios from 'axios';


export default {
    // data() {
    //     // var ren_id_server = axios.post('/api/stage_save_load');
    //     // setTimeout(() => {
            
    //     // }, 2000);
    //     // console.log(ren_id_server);
    //     // return {
    //     //     ren_id: ren_id_server
    //     // }
    // },
    components: {
        "input-pinfo": input_pinfo,
        "user-plugin": user_plugin,
        "pay": pay,
        "end": end,
        "end-show": end_show
    }, 
    methods: {

    },
    mounted() {
        // this.$change_title('렌더링 이어하기', '업로드된 렌더링 파일의 정보를 입력해주세요.', '300px');
    }
}
</script>

<style>

</style>