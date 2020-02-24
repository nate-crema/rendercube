var ww_plugin = {};
ww_plugin.install = function(Vue, options) {

    const methods = {
        //levels_a_effects

        load_stage: function(a_part, b_part) {
            $(b_part).css('display', 'block');
            $(a_part).css('display', 'block');
            setTimeout(() => {
                $(b_part).addClass('fadeIn time_1_5s animated');
                $(a_part).addClass('fadeIn time_1_5s animated');
            }, 500);
        },

        remove_stage: function(a_part, b_part, c_part, d_part, e_part) {
            if (e_part) {
                $(a_part).addClass('fadeOut time_0_5s animated');
                $(b_part).addClass('fadeOut time_0_5s delay_0_1s animated');
                $(c_part).addClass('fadeOut time_0_5s delay_0_2s animated');
                $(d_part).addClass('fadeOut time_0_5s delay_0_3s animated');
                $(e_part).addClass('fadeOut time_0_5s delay_0_4s animated');

                setTimeout(() => {
                    $(a_part).css('display', 'none');
                    $(b_part).css('display', 'none');
                    $(c_part).css('display', 'none');
                    $(d_part).css('display', 'none');
                    $(e_part).css('display', 'none');
                }, 600);
            } else if (d_part) {
                $(a_part).addClass('fadeOut time_0_5s animated');
                $(b_part).addClass('fadeOut time_0_5s delay_0_1s animated');
                $(c_part).addClass('fadeOut time_0_5s delay_0_2s animated');
                $(d_part).addClass('fadeOut time_0_5s delay_0_3s animated');

                setTimeout(() => {
                    $(a_part).css('display', 'none');
                    $(b_part).css('display', 'none');
                    $(c_part).css('display', 'none');
                    $(d_part).css('display', 'none');
                }, 600);
            } else if (c_part) {
                $(a_part).addClass('fadeOut time_0_5s animated');
                $(b_part).addClass('fadeOut time_0_5s delay_0_1s animated');
                $(c_part).addClass('fadeOut time_0_5s delay_0_2s animated');

                setTimeout(() => {
                    $(a_part).css('display', 'none');
                    $(b_part).css('display', 'none');
                    $(c_part).css('display', 'none');
                }, 600);
            } else if (b_part) {
                $(a_part).addClass('fadeOut time_0_5s animated');
                $(b_part).addClass('fadeOut time_0_5s delay_0_1s animated');

                setTimeout(() => {
                    $(a_part).css('display', 'none');
                    $(b_part).css('display', 'none');
                }, 600);
            } else if (a_part) {
                $(a_part).addClass('fadeOut time_0_5s animated');

                setTimeout(() => {
                    $(a_part).css('display', 'none');
                }, 400);
            } else {
                console.log('Error! remove_stage has no variables.')
            }
        },

        remove_title: function() {
            $('.title').addClass('fadeOutDown time_0_5s');
            $('.title').removeClass('fadeInDown time_1s animated');
            $('.subtitle').addClass('fadeOutDown time_1s');
            $('.title').addClass('animated');
        },

        change_title: function(title, subtitle, subtitle_margin) {
            if (subtitle_margin) {
                $('.subtitle').removeClass('fadeInDown delay_0_2s time_0_8s animated');
                $('.title').addClass('fadeOutDown time_0_5s');
                $('.subtitle').addClass('fadeOutDown time_1s');
                $('.title').removeClass('fadeInDown time_1s animated');
                $('.title').addClass('animated');
                $('.subtitle').addClass('animated');
                setTimeout(() => {
                    $('.title').removeClass('fadeOutDown time_1s');
                    $('.subtitle').removeClass('fadeOutDown time_1s');
                    $('.subtitle').css('margin-left', subtitle_margin);
                    $('.title').addClass('fadeInDown time_1s');
                    $('.subtitle').addClass('fadeInDown time_1s delay_0_2s');
                    document.getElementById('main_title').innerHTML = title;
                    document.getElementById('main_subtitle').innerHTML = subtitle;
                }, 1000);
            } else if (title) {
                $('.title').addClass('fadeOutDown time_0_5s');
                $('.title').removeClass('fadeInDown time_1s animated');
                $('.subtitle').addClass('fadeOutDown time_1s');
                $('.title').addClass('animated');
                setTimeout(() => {
                    $('.title').removeClass('fadeOutDown time_1s');
                    $('.title').addClass('fadeInDown time_1s');
                    document.getElementById('main_title').innerHTML = title;
                }, 1000);
            } else {
                console.log("Error! title_change_function has not variables");
            }
        },

        ww_change_vuecomp: function(before, after, animation_time_input, delay) {
            let delay_time;
            let animation_time;
            if (animation_time_input) {
                if (delay) {
                    // delay time separation
                    const delay_separation = delay.split(".");
                    if (delay_separation.length >= 3) {
                        console.error("ww_change_vuecom: ERROR! delay definition has unvalid input");
                    } else {
                        if (anim_time_separation.length == 2) {
                            delay_time = "delay_" + anim_time_separation[0] + "_" + anim_time_separation[1];
                        } else if (anim_time_separation == 1) {
                            delay_time = "delay_" + anim_time_separation[0];
                        }
                    }
                }
                // animation time separation
                const anim_time_separation = animation_time_input.split(".");
                if (anim_time_separation.length >= 3) {
                    console.error("ww_change_vuecom: ERROR! animation time definition has unvalid input");
                } else {
                    if (anim_time_separation.length == 2) {
                        animation_time = "time_" + anim_time_separation[0] + "_" + anim_time_separation[1];
                    } else if (anim_time_separation == 1) {
                        animation_time = "time_" + anim_time_separation[0];
                    }

                    if (delay) {
                        $(before).addClass("fadeOut " + animation_time + " " + delay_time + " animated");
                    } else {
                        $(before).addClass("fadeOut " + animation_time + "" + " animated");   
                    }
                    $(after).addClass("fadeIn " + animation_time + "" + " animated");
                }
            } else {
                console.error("ww_change_vuecom: ERROR! animation time definition has no input");
            }
        }
    }

    Vue.prototype.$load_stage = methods.load_stage
    Vue.prototype.$remove_stage = methods.remove_stage
    Vue.prototype.$change_title = methods.change_title
    Vue.prototype.$ww_change_vuecomp = methods.ww_change_vuecomp
    Vue.prototype.$remove_title = methods.remove_title

    Vue.load_stage = methods.load_stage
    Vue.remove_stage = methods.remove_stage
    Vue.change_title = methods.change_title
    Vue.ww_change_vuecomp = methods.ww_change_vuecomp
    Vue.remove_title = methods.remove_title

    Vue.mixin({
        methods: {
            load_stage: methods.load_stage,
            remove_stage: methods.remove_stage,
            change_title: methods.change_title,
            ww_change_vuecomp: methods.ww_change_vuecomp,
            remove_title: methods.remove_title
        },
        mounted: function() {
            console.log('Loaded: ww_plugin');
            console.log(methods);
        }
    })
}

export default ww_plugin;