<template>
  <div class="main-cover">
    <logo></logo>
    <sidemenu></sidemenu>
    <div class="page_area">
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
import logo from '~/components/logo.vue'
import sidemenu from '~/components/sidemenu.vue'
import axios from 'axios';

export default {
  components: {
    logo,
    sidemenu,
    axios
  },
  middleware: 'auth',
  // created() {
  //   if (this.$store.state.loginInfo == null) {
  //     // alert("로그인이 되어있지 않습니다. \n 먼저 로그인을 해주세요!");
  //     // location.href="/login";
  //   }
  // }
}
</script>

<style>
/* main_animation.css */

@import url("~/assets/css/animate.css");

/* main_design.css */
* {
  font-family: "Noto Sans KR";
  text-decoration: none;
  color: black;
}
html, body, #__nuxt, #__layout {
  width: 100%;
  height: 100%;
}
html {
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #F8F8F8;
}
.main-cover {
  width: 100%;
  height: 100%; 
}
.page_area {
  width: 1200px;
  height: 600px;
  position: absolute;
  top: 150px;
  left: 370px;
}

/* header_common_css */

.line_title {
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: #2053b2;
    margin-top: 30px;
}
.title {
    font-size: 40px;
    font-weight: 300;
    color: #2053b2;
}
.subtitle {
    font-size: 15px;
    font-weight: 100;
    margin-left: 300px;
    margin-top: -25px;
}
.comment {
    font-size: 15px;
    font-weight: 100;
    margin-top: 30px;
    margin-left: 50px;
}

/*module common design*/
.module {
    border-radius: 25px;
    background-color: rgba(0, 133, 255, 0.08);
}
</style>

