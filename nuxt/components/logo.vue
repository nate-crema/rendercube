<template>
    <div class="logo_part">
        <img src="~/assets/img/rendercube_logo.svg"/>
        <!-- <p class="welcome_text">환영합니다, {{$store.state.loginInfo.username}}님</p> -->
        <router-link :to="{ path: '/login'}" class="welcome_text" replace>환영합니다, {{$store.state.loginInfo.username}}님</router-link>
    </div>
</template>

<script>

import img from "~/assets/img/logo_a.png";

export default {
    img
}
</script>

<style>
.logo_part * {
    position: absolute;
    font-family: "Noto Sans KR";
}
.logo_part img {
    width: 220px;
    height: auto;
    top: 50px;
    left: 50px;
}
.logo_part .welcome_text {
    font-size: 16px;
    width: 250px;
    top: 150px;
    left: 50px;
}
</style>
