function not_read_school_free() {
    alert(`현재 페이지가 준비되지 않았습니다 ㅠㅠ~
        확정된 학교는 아래와 같습니다.

        * 한국디지털미디어고등학교
    `);
}

$(document).ready(function() {

    //scroll animation
    $(window).scroll(function() {
        var height = $(document).scrollTop();
        console.log(height);

        // if (height < 150) {
        //     $('.main-contents-wrap-a').css('oipacity', 1);
        // } else if (150 < height && height <= 200) {
        //     $('.main-contents-wrap-a').css('opacity', 1-(height-150)/50);
        // } else if (height > 200) {
        //     $('.main-contents-wrap-a').css('opacity', 0);
        // }

        if (height <= 330) {
            // $('.cover_b').css('opacity', 0);
            $('.cover_b').css('display', 'none');
        } else if (330 < height && height <= 380) {
            // $('.cover_b').css('opacity', (height-330)/50);
            $('.cover_b').css('display', 'block');
        } else if (380 < height && height < 430) {
            $('.effect_text_b_b').addClass('fadeInRight');
            $('.effect_text_b_b').addClass('rem_ani');
            $('.effect_text_b_b').addClass('time_1_5s');
            $('.effect_text_a_b').addClass('fadeInRight');
            $('.effect_text_a_b').addClass('rem_ani');
            $('.effect_text_a_b').addClass('time_1_5s');
            $('.compare_test').addClass('fadeInDown');
            $('.compare_test').addClass('time_1_3s');
            $('.compare_test').addClass('rem_ani');
            $('.compare_test').addClass('delay_1_1s');
        }
        
        if (height <= 1250) {
            // $('.cover_c').css('opacity', 0);
            $('.cover_c').css('display', 'none');
        } else if (1250 < height && height <= 1300) {
            // $('.cover_c').css('opacity', (height-850)/50);
            $('.cover_c').css('display', 'block');
        } else if (1300 < height) {
            $('.effect_text_b_c').addClass('fadeInRight');
            $('.effect_text_b_c').addClass('rem_ani');
            $('.effect_text_b_c').addClass('time_1_5s');
            $('.effect_text_a_c').addClass('fadeInRight');
            $('.effect_text_a_c').addClass('rem_ani');
            $('.effect_text_a_c').addClass('time_1_5s');
        }

        if (height <= 1990) {
            $('.cover_d').css('display', 'none');
        } else if (1990 < height && height <= 2040) {
            $('.cover_d').css('display', 'block');
        } else if (2040 < height) {
            $('.effect_text_b_d').addClass('fadeInLeft');
            $('.effect_text_b_d').addClass('rem_ani');
            $('.effect_text_b_d').addClass('time_1_5s');
            $('.effect_text_a_d').addClass('fadeInLeft');
            $('.effect_text_a_d').addClass('rem_ani');
            $('.effect_text_a_d').addClass('time_1_5s');
        }
    })
})