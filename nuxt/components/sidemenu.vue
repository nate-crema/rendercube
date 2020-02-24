<template>
    <div class="side_menu">
        <ul class="side_ul">
            <li class="fir_first"><router-link to="/workarea/dashboard">Dashboard</router-link></li>
            <li><router-link to="/workarea/uploaded">업로드 파일 관리</router-link></li>
            <li><router-link to="/workarea/ren_stb">렌더링열</router-link></li>
            <li><router-link to="/workarea/ren_start">렌더링 시작</router-link></li>
            <li><router-link to="/workarea/system_live">시스템 사용량</router-link></li>
            <div class="bar"></div>
            <li class="sec_first"><router-link to="/workarea/payment">결제</router-link></li>
            <li><router-link to="/workarea/storage_change">저장공간 변경</router-link></li>
            <li><router-link to="/workarea/fee_change">요금제 변경</router-link></li>
            <li><router-link to="/workarea/preference">환경설정</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.side_menu .side_ul {
    position: absolute;
    top: 250px;
    left: 50px;
    color: black;
    font-size: 20px;
    width: 550px;
    list-style: none;
}

.side_menu .side_ul li {
    margin-bottom: 20px;
    font-weight: 300;
}

.side_menu .side_ul .fir_first {
    font-weight: 700;
    color: #2053b2;
}

.side_menu .side_ul .bar {
    position: relative;
    top: 30px;
    width: 70px;
    height: 2px;
    border-radius: 2px;
    background-color: black;
}

.side_menu .side_ul .sec_first {
    margin-top: 70px;
}
</style>
