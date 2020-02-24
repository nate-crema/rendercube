<template>
    <div class="selector_p_reged">
        <div class="question_not_reg">
            <p class="q">등록이 안되어있나요?</p>
            <a class="reg_go" href="/workarea/reg_renfarm">등록하러 가기 ></a>
        </div>
        <div class="reg_pc_list" v-if="result == true">
            <div class="module_pc_p level_a_end boxes" id="pc_p_obj" v-on:click="page_load_b_p('pc_info_' + pc_info.index)"
            v-for="pc_info in pc_spec"
            :key="pc_info.value"
            :class="'pc_info_' + pc_info.index"
            :style="{left: pc_info.index * 400 - 400 + 'px'}">
                <div class="img">
                    <img src=""/>
                </div>
                <p class="pc_p_name">{{pc_info.name}}</p>
                <div class="infos_pc">
                    <p class="pc_p_os">os: {{pc_info.os}}</p>
                    <p class="pc_p_cpu">cpu: {{pc_info.cpu}}</p>
                    <p class="pc_p_ram">ram: {{pc_info.ram}}</p>
                    <p class="pc_p_gpu">gpu: {{pc_info.gpu}}</p>
                </div>
            </div>
        </div>
        <div class="none_pcs" v-if="result == false">
            <div id="pc_p_obj"></div>
            <p>no result</p>
        </div>
    </div>
</template>

<script>

//axios import

import axios from "axios";


let a;

export default {
    components: {

    },
    
    mounted() {
        // async load_file({project}) {
        //     const ip = await this.$axios.$get('http://icanhazip.com')
        //     this.ip = ip
        // }
        
    },
    data () {
        axios.post('http://localhost:80/').then(response => {
            this.result = response.data.result,
            this.pc_num = response.data.pc_num,
            this.pc_spec = response.data.pc_spec
        })
        return {
            result: false,
            pc_num: 0,
            pc_spec: []
        }
    },
    methods: {
        page_load_b_p: function(obj) {
            console.log(obj);
            console.log('sel_server_selector clicked');

            //record infos

            this.$store.dispatch('setInfo', {
                infos: {
                    type: {
                        rtype: {
                            b: 'pc_p',
                            s: obj
                        },
                        stage: 'b'
                    }
                }
            });

            // //erase stage

            // $('#r_p_list').addClass('fadeOut time_0_5s animated');

            // setTimeout(() => {
            //     $('#r_p_list').css('display', 'none');
            // }, 400);

            // //load stage

            // $('.project_select').css('display', 'block');
            // setTimeout(() => {
            //     $('.project_select').addClass('fadeIn time_1_5s animated');
            // }, 500);

            // $('.subtitle').removeClass('fadeInDown delay_0_2s time_0_8s animated');
            // $('.title').addClass('fadeOutDown time_0_5s');
            // $('.subtitle').addClass('fadeOutDown time_1s');
            // $('.title').removeClass('fadeInDown time_1s animated');
            // $('.title').addClass('animated');
            // $('.subtitle').addClass('animated');
            // setTimeout(() => {
            //     $('.title').removeClass('fadeOutDown time_1s');
            //     $('.subtitle').removeClass('fadeOutDown time_1s');
            //     $('.subtitle').css('margin-left', '250px');
            //     $('.title').addClass('fadeInDown time_1s');
            //     $('.subtitle').addClass('fadeInDown time_1s delay_0_2s');
            //     document.getElementById('main_title').innerHTML = '프로젝트 선택';
            //     document.getElementById('main_subtitle').innerHTML = '렌더링할 프로젝트를 선택합니다.';
            // }, 1000);

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

            this.$remove_stage('.reg_pc_list');
            this.$remove_title();
        }

    }
}
</script>

<style>
.question_not_reg {
    position: relative;
    left: 1000px;
}
.reg_pc_list {
    position: relative;
    overflow: auto;
    width: 1200px;
    height: 450px;
    top: 30px;
}
.module_pc_p {
    width: 300px;
    height: 400px;
    border-radius: 46px;
    background-color: rgba(35, 103, 250, 0.062);
    transition: .3s ease;
    cursor: pointer;
    position: absolute;
}
.module_pc_p .img {
    width: 120px;
    height: auto;
    margin: auto;
    position: relative;
    top: 100px;
}
.module_pc_p .img img {
    width: 120px;
    height: auto;
}
.module_pc_p .pc_p_name {
    font-size: 30px;
    font-weight: 300;
    position: relative;
    top: 250px;
    left: 50px;
}
.module_pc_p .infos_pc {
    position: relative;
    top: 200px;
    right: -160px;
    font-size: 10px;
}
.module_pc_p .infos_pc p {
    color: rgb(158, 158, 158);
}


.module_pc_p:hover {
    background-color: rgba(0, 80, 252, 0.137);
}
</style>
