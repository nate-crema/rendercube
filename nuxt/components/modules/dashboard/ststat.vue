<template>
    <div class="modules_ststat module" :class="$mq">
        <router-link to="/workarea/storage_change" class="change_info">변경</router-link>
        <p class="modules_title">저장공간 사용률</p>
        <div class="st_p_cover">
            <div class="st_p_back" id="st_p_back"></div>
            <div class="st_p_real" :style="{width: stu.usage_p}"></div>
            <div class="info_literal">
                <p class="remain_text">{{stu.usage}}GB 사용중</p>
                <p class="total_text">전체용량: {{stu.total}}GB</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        //usage percent calculating - system usage
        
    }, data() {

        return {
            stu: {
                total: 30,
                usage: 30,
                usage_p: "100%"
            }
        }
    }
}
</script>

<style>
.modules_ststat {
    position: relative;
    top: 80px;
    width: 30%;
    height: 210px;
}
.modules_ststat .modules_title {
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
.modules_ststat .change_info {
    z-index: 1;
    margin-left: 210px;
    font-size: 14px;
    color: rgb(82, 82, 82);
    position: relative;
    top: 40px;
}
.modules_ststat .st_p_cover {
    width: 280px;
    height: 20px;
    /* margin-top: 60px; */
    /* margin-right: auto; */
    /* margin-left: auto; */
    position: relative;
    top: 10px;
    left: 12%;
}
.modules_ststat .st_p_cover .st_p_back {
    width: 280px;
    height: 20px;
    border-radius: 15px;
    background-color: #e0e0e0;
    /* margin-top: 60px; */
    /* margin-right: auto; */
    /* margin-left: auto; */
    position: relative;
}
.modules_ststat .st_p_cover .st_p_real {
    width: 100px;
    height: 20px;
    border-radius: 15px;
    background-color: rgb(21, 61, 121);
    position: relative;
    top: -20px;
}
.modules_ststat .st_p_cover .remain_text {
    position: relative;
    font-size: 15px;
    font-weight: 700;
    top: 13px;
    left: 30px;
}
.modules_ststat .st_p_cover .total_text {
    position: relative;
    font-size: 15px;
    font-weight: 700;
    top: -7px;
    left: 150px;
}

</style>
