<template>
    <div class="login_cover">
        <div class="html_cover">
            <p class="logining">로그인중..</p>
        </div>
        <div class="login">
            <img class="logo_rendercube" src="~/assets/img/rendercube_logo.svg"/>
            <form v-if="!$store.state.loginInfo" class="login_form" @submit.prevent="login">
                <div class="inputs">
                    <input type="text" placeholder='아이디' class="id_input" id="id_input" name="id" v-model="id"/>
                    <input type="password" placeholder='비밀번호' class="pw_input" id="pw_input" name="pw" v-model="pw"/>
                </div>
                <div class="button_login_fake" id="button_login_fake">
                    <p class="text_button">로그인</p>
                </div>
                <button type="submit" class="button_login" id="button_login" hidden="hidden">Login</button>
            </form>
            <div v-else-if="formError" class="error">
                <p>error</p>
            </div>
            <div v-else-if="$store.state.loginInfo" class="logined">
                <p class="welcome_text_a">환영합니다, {{$store.state.loginInfo.username}}님!</p>
                <p class="welcome_text_b">id: {{$store.state.loginInfo.id}}</p>
                <div class="button_go_dashboard" id="button_go_dashboard">
                    <p class="text_button">대시보드로 이동</p>
                </div>
                <div class="button_logout_fake" id="button_logout_fake">
                    <p class="text_button">로그아웃</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            logined: 'n',
            formError: null,
            id: '',
            pw: ''
        }
    },
    methods: {
        async login() {
            try {
                $(".html_cover").css('display', 'block');
                $(".html_cover").css('opacity', '1');
                setTimeout(() => {
                    $(".html_cover").css('opacity', '0');
                    setTimeout(() => {
                        $(".html_cover").css('display', 'none');
                    }, 100);
                    this.$store.dispatch('login', {
                        id: this.id,
                        pw: this.pw
                    });
                    //reset field
                    this.id = '';
                    this.pw = '';
                    this.formError = null;
                    // location.href="/workarea/dashboard";
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }, 1500);
            } catch(e) {
                this.formError = e.message
            }
        },
        async logout() {
            try {
                await this.$store.dispatch('logout');
                location.reload();
            } catch(e) {
                this.formError = e.message;
            }
        }
    },
    mounted() {
        $(function() {
            $("#button_login_fake").click(function() {
                $("#button_login").click();
            });
            $("#button_logout_fake").click(function() {
                axios.post('/api/logout',{});
                location.reload();
            });
            $("#button_go_dashboard").click(function() {
                location.href="/workarea/dashboard";
            })
        }); 
    }
}
</script>

<style>
html {
    width: 100%;
    height: 100%;
    background-color: rgb(250, 250, 250);
}
/* login design */
.login_cover {
    position: relative;
    margin: auto;
    margin-top: 120px;
    width: 450px;
    height: 600px;
}
.login {
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 2px solid rgb(0, 12, 123); */
    /* background-color: rgb(253, 253, 239); */
    background-color: rgb(255, 255, 255);
    text-align: center;
    z-index: 10;
}
.login .logo_rendercube {
    position: relative;
    width: 250px;
    height: auto;
    top: 100px;
}
.login .inputs {
    width: 60%;
    margin: auto;
    position: relative;
    top: 200px;
}
.login .inputs input {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-bottom: 2px solid rgb(206, 206, 206);
    transition: .3s ease;
    font-size: 15px;
    width: 100%;
    font-family: "Noto Sans KR";
}
.login .inputs input:focus {
  outline: none;
  border-bottom-color: rgb(43, 85, 172);
}
.login .inputs .pw_input {
    margin-top: 70px;
}
.login .button_login_fake {
    width: 100%;
    height: 170px;
    background-color: white;
    color: rgb(43, 85, 172);
    text-align: center;
    position: relative;
    top: 270px;
    transition: .5s ease;
}
.login .button_login_fake .text_button {
    padding-top: 65px;
    font-size: 25px;
}
.login .button_login_fake:hover {
    background-color: rgb(43, 85, 172);
    color: white;
}

/* logining design */
.html_cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(43, 85, 172);
    display: none;
    opacity: 0;
    transition: .2s ease;
    z-index: 10000;
    text-align: center;
}
.html_cover .logining {
    font-size: 30px;
    color: white;
    padding-top: 270px;
}

/* logined design */
.logined {
    padding-top: 200px;
}
.logined .welcome_text_a {
    font-size: 30px;
}
.logined .welcome_text_b {
    font-size: 26px;
    padding-top: 30px;
}
.logined .button_logout_fake {
    width: 100%;
    height: 50px;
    background-color: white;
    color: rgb(172, 43, 43);
    transition: .3s ease;
    text-align: center;
    position: relative;
    top: 80px;
}
.logined .button_logout_fake .text_button {
    padding-top: 13px;
    font-size: 17px;
}
.logined .button_logout_fake:hover {
    background-color: rgb(172, 43, 43);
    color: white;
}

/* go_dashboard button design */

.logined .button_go_dashboard {
    width: 100%;
    height: 80px;
    background-color: white;
    color: rgb(43, 85, 172);
    transition: .3s ease;
    text-align: center;
    position: relative;
    top: 80px;
}
.logined .button_go_dashboard .text_button {
    padding-top: 25px;
    font-size: 20px;
}
.logined .button_go_dashboard:hover {
    background-color: rgb(43, 85, 172);
    color: white;
}
</style>
