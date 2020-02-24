<template>
  <div class="main-cover">
    
  </div>
</template>

<script>
import logo from '~/components/logo.vue';
import side_menu from '~/components/sidemenu.vue';

var a = false;

export default {
  components: {
    logo,
    "side-menu": side_menu
  },
  mounted() {

    loadProgressBar()
    // var a = false;

    console.log(a);

    test();


    function test() {
        console.log('test');
        a = true;
        console.log(a);
    }

    console.log('outer');
    console.log(a);
  },
  data() {
    return {
      a: a
    }
  }
}
</script>

<style>
* {
  font-family: "Noto Sans KR";
}
html {
  background-color: rgb(255, 255, 248);
}

</style>

