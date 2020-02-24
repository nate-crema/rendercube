import Vuex from 'vuex'
import axios from 'axios';

// server link
var server_link = "http://localhost:554";


// const store = () => new Vuex.Store({

//   state: {
//     status: '',
//     render_type_big: '',
//     render_type_small: '',
//     upload_type: '',
//     uploaded: false,
//     project_info: {
//         file_name: '', // project file name (ex: test.aep) 
//         comp_name: '', // composition name
//         file_ext: '', // project file extension (ex: aep)
//         file_size: '' // file size
//     },
//     plugins: {
//         plugin_use: false, // true or false
//         plugin_num: 0, // plugin using number
//         plugin_info: {} // plugin infos
//     },
//     payment: {
//         paid: false,
//         card_company: '',
//         pay_type: '',
//         dig_6_pw: '', // if pay_type is fast_r_pay
//         enc_c_info: '', // if pay_type is fast_r_pay
//         card_num: '',
//         card_pw_2digit: '',
//         card_cvc: '',
//         card_own: '',
//         card_pn: ''
//     }
//   },
//   mutations: {
//     change_status(state, contents) {
//         Vue.set(state.status, contents.index, contents.new)
//     },
//     change_render_type_big(state, contents) {
//         state.render_type_big = contents
//     },
//     change_render_type_small(state, contents) {
//         state.render_type_small = contents
//     },
//     change_upload_type(state, contents) {
//         state.upload_type = contents
//     },
//     change_uploaded(state, contents) {
//         state.uploaded = contents
//     },

//     //Login Function
    
//   }
// })

// const store = () => new Vuex.Store({

//     state: {
//         loginInfo: {
//             logininfo_enc: null,
//             id: null,
//             username: null,
//             license: null,
//             cl_id: null
//         }
//     },
//     mutations: {
//         SET_USER (state, enc_session) {
//             state.loginInfo.logininfo_enc = enc_session
//         }
//     },
//     actions: {
//         //pre-called method before server-rendering every page
//         nuxtServerInit ({commit}, {req}) {
//             if (req.session && req.session.loginInfo) {
//                 commit('SET_USER', req.session.loginInfo);
//             }
//         },

//         async login ({commit}, {id, pw}) {
//             try {

//                 await axios.post('/api/login', { id, pw })
//                 .then(function(response) {
//                     var res = response.data;
//                     if (res.login == true) {
//                         commit('SET_USR', res.enc_session);
//                     }
//                 })

//             } catch (e) {
//                 if (e.response && e.response.status === 401) {
//                     throw new Error('Bad Credentials');
//                 }
//                 throw e;
//             }
//         },

//         async logout ({commit}) {
//             await axios.post('/api/logout')
//             commit("SET_USER", null);
//         }
//     }

// })

export const state = () =>  ({
    // stage_rendering_save
    stage_save: 'no',
    // login
    loginInfo: null,
    // payment
    payment: {
        paid: false,
        card_company: '',
        pay_type: '',
        dig_6_pw: '', // if pay_type is fast_r_pay
        enc_c_info: '', // if pay_type is fast_r_pay
        card_num: '',
        card_pw_2digit: '',
        card_cvc: '',
        card_own: '',
        card_pn: ''
    },
    // license
    license: {
         
    },
    // rendering
    rendering: {
        stage: '',
        render_type_big: '',
        render_type_small: '',
        upload_type: '',
        uploaded: false,
        project_info: {
            file_name: '', // project file name (ex: test.aep) 
            comp_name: '', // composition name
            file_ext: '', // project file extension (ex: aep)
            file_size: '' // file size
        },
        plugins: {
            plugin_use: false, // true or false
            plugin_num: 0, // plugin using number
            plugin_info: {} // plugin infos
        }
    }
})

export const mutations = {

    toggleSidebar: function (state) {
        state.sidebar = !state.sidebar
    },
    LOGIN: function (state, user) {
        state.user = user
    },
    LOGOUT: function () {
        state.user = null
    },
    
    SET_USER (state, enc_session) {
        console.log(`
            SET_USER
            session: ` + enc_session + `
        `)
        state.loginInfo = enc_session
    },
    SET_PAYMENT (state, enc_session) {
        state.payment = enc_session
    },
    SET_LICENSE (state, enc_session) {
        state.license = enc_session
    },
    SET_RENDERING (state, enc_session) {
        state.rendering = enc_session
    },
    STAGE_SAVE (state, data) {
        state.stage_save = data
    },
    SET_INFO (state, {infos}) {
        console.log(infos);
        var type = infos.type;
        var result;
        if (type.stage) {
            //stage
            state.rendering.stage = type.stage
        }
        if (type.rtype) {
            //rendering_type
            if (type.rtype.b) {
              state.rendering.render_type_big = type.rtype.b;
              result = 'ok';
            }
            if (type.rtype.s) {
              state.rendering.render_type_small = type.rtype.s;
              result = 'ok';
            }
        }
        if (type.utype) {
            //upload_type
            state.rendering.upload_type = type.utype;
            result = 'ok';
        }
        if (type.ufn) {
            //uploaded (t or f)
            state.rendering.uploaded = type.ufn;
            result = 'ok';
        }
        if (type.pinfo) {
            //project_info
            state.rendering.project_info = {
              file_name: type.pinfo.file_name,
              comp_name: type.pinfo.comp_name,
              file_ext: type.pinfo.file_ext,
              file_size: type.pinfo.file_size,
            }
            result = 'ok';
        }
        if (type.plugins) {
            //plugins
            state.plugins = {
              plugin_use: type.plugins.plugin_use,
              plugin_num: type.plugins.plugin_num,
              plugin_info: type.plugins.plugin_info
            }
            result = 'ok';
        }

        if (result == 'ok') {
            console.log(result);
        } else {
            console.log('failed');
        }
        console.log(state);
    }
}

export const actions = {
    //pre-called method before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
        if(req.session.loginInfo) {
            console.log(req.session.loginInfo);
            commit('SET_USER', req.session.loginInfo);
        }
        if(req.session.payment) {
            commit('SET_PAYMENT', req.session.payment);
        }
        if(req.session.license) {
            commit('SET_LICENSE', req.session.license);
        }
        if(req.session.rendering) {
            commit('SET_RENDERING', req.session.rendering);
        }
        if(req.session.stage_save) {
            commit('STAGE_SAVE', req.session.stage_save);
        }
        // if (req.session && req.session.loginInfo) {
        //     commit('SET_USER', req.session.loginInfo);
        // }
    },


    // rendering info records

    async setInfo ({commit}, {infos}) {
        try {
            axios.post('/api/setInfo', {infos});
            commit('SET_INFO', {infos});
        } catch (e) {
            console.log(e);
        }
    },


    // login functions

    async login ({commit}, {id, pw}) {
        try {

            // await axios.post('/api/login', { id, pw }, {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            // .then(function(response) {
            //     // var res = response.data;
            //     // if (res.login == true) {
            //     //     commit('SET_USR', res.enc_session);
            //     // }
            //     console.log(response);
            //     if (response.data.result == "success") {
            //         console.log('test');
            //         commit('SET_USER', res.enc_session);
            //     }
            // })

            const { data } = await axios.post('/api/login', { id, pw })
            const data_stringified = JSON.stringify(data);
            console.log('data: '+ data_stringified);
            commit('LOGIN', data_stringified.enc_session);
            console.log("login - commited");
            commit('SET_USER', data_stringified);
            console.log("set_user - commited");

        } catch (e) {
            if (e.response && e.response.status === 401) {
                throw new Error('Bad Credentials');
            }
            throw e;
        }
    },

    // SET_STATUS_NEWREN (state, {data}) {
    //     state.stage_save = data
    // },

    stage_save({commit}, {array}) {
        commit("STAGE_SAVE", array.setdata);
    },

    async logout ({commit}) {
        await axios.post('/api/logout')
        commit("SET_USER", null);
        commit("ERA_ALL");
    }
}

// export default store
