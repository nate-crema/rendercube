$(document).ready(function() {

    // $('body').scrollTop(0);

   $(window).scroll(function() {
       var height = $(document).scrollTop();

       //Video Opacity Setting
        if ( 0 <= height) {
            $('.video_intro').css('opacity', 1);
        } else if (height < 0) {
            $('.video_intro').css('opacity', 1-height/100);
        }

       //background color change
       if (0<= height) {
           console.log(height);
            var r_back = 255-height/2;
            var g_back= 255-height/2;
            var b_back = 255-height/2;
            document.body.style.backgroundColor = 'rgb(' + r_back + ',' + g_back + ',' + b_back + ')';
        }else if (r <= 0 || g <= 0 || b <= 0) {
            document.body.style.backgroundColor = 'rgb(0, 0, 0)';
        }

        //Color Change
        if (height < 280) {
            var logo_url = "url('./source/img/logo_black.png')";
            $('.navbar').css('color', 'black');
            $('.logo').css('background-image', logo_url);
            $('.dots').css('background-color', 'black');
            $('.dots').css('border-color', 'black');
            $('.special').css('color', 'black');
            $('.special').css('color', 'black');
        } else if (280 <= height) {
            var logo_url = "url('./source/img/logo_white.png')";
            $('.navbar').css('color', 'white');
            $('.logo').css('background-image', logo_url);
            $('.dots').css('background-color', 'white');
            $('.dots').css('border-color', 'white');
            $('.special').css('color', 'rgb(196, 196, 196)');
            $('.special').css('color', 'rgb(196, 196, 196)');
        }

        //Dots change
       if (height <= 150) {
            $('.dot_a').addClass('selected');
            $('.dot_b').removeClass('selected');
            $('.dot_c').removeClass('selected');
            $('.dot_d').removeClass('selected');
            $('.dot_a').css('', '');
        } else if (150 <= height && height < 370) {
            $('.dot_a').removeClass('selected');
            $('.dot_b').addClass('selected');
            $('.dot_c').removeClass('selected');
            $('.dot_d').removeClass('selected');
        } else if (370 <= height && height < 590) {
            $('.dot_a').removeClass('selected');
            $('.dot_b').removeClass('selected');
            $('.dot_c').addClass('selected');
            $('.dot_d').removeClass('selected');
        } else if (590 <= height) {
            $('.dot_a').removeClass('selected');
            $('.dot_b').removeClass('selected');
            $('.dot_c').removeClass('selected');
            $('.dot_d').addClass('selected');
        }

       //main-a
       if (0 <= height && height < 50) {
           $('main-a').css('opacity', 1);
           $('.main-a').css('display', 'block');
       } else if (50 <= height && height <= 150) {
           $('.main-a').css('top', -(height-50)/2);
           $('.main-a').css('opacity', 1-(height-50)/100);
           $('.main-a').css('display', 'block');
       } else if (150 < height) {
            $('.main-a').css('opacity', 0);
            $('.main-a').css('display', 'none');
       }


       //main-b

       //height setting
        if (height <= 150) {
            $('.main-b').css('top', 280);
        } else if (150 < height && height <= 200) {
            $('.main-b').css('top', 280-(height-100)/2);
        } else if (height > 200 && 340 >= height) {
            $('.main-b').css('top', 230+height-200);
        } else if (height > 340 && 390 >= height) {
            $('.main-b').css('top', 370);
        }

       //opacity setting
       if (height <= 175) {
            $('.main-b').css('opacity', 0);
            $('.main-b').css('display', 'none');
       } else if (175 < height && height <= 200) {
            $('.main-b').css('display', 'block');
            $('.main-b').css('opacity', (height-175)/25);
       } else if (200 < height && height <= 350) {
            $('.main-b').css('display', 'block');
            $('.main-b').css('opacity', 1);
       } else if (350 < height && height <= 385) {
            $('.main-b').css('display', 'block');
            $('.main-b').css('opacity', 1-(height-350)/25);
       } else if (385 < height) {
            $('.main-b').css('opacity', 0);
            $('.main-b').css('display', 'none');
       }

       //main-c

       //height setting
       if (height <= 440) {
           $('.main-c').css('top', 420);
       } else if (440 < height && height <= 560) {
           $('.main-c').css('top', 420+height-440);
       } else if (560 < height) {
           $('.main-c').css('top', 540);
       }
       


       //opacity setting

       if (370 >= height) {
           $('.main-c').css('opacity', 0);
           $('.main-c').css('display', 'none'); 
       } else if (height > 370 && 395 >= height) {
           $('.main-c').css('display', 'block'); 
           $('.main-c').css('opacity', (height-370)/25); 
       } else if (height > 395 && 560 >= height) { 
           $('.main-c').css('display', 'block'); 
           $('.main-c').css('opacity', 1);
       } else if (height > 560 && 610 >= height) {
           $('.main-c').css('display', 'block'); 
           $('.main-c').css('opacity', 1-(height-560)/25); 
       } else if (height > 610) {
           $('.main-c').css('opacity', 0); 
           $('.main-c').css('display', 'none'); 
       }

       

       //main-d

       //height setting

       if (630 <= height) {
        //    $('.main-d').css('top', 800+(height-630));
           document.body.scrollTop = 630;
       }


       //opacity setting

       if (600 >= height) {
           $('.main-d').css('opacity', 0);
       } else if (height > 600 && 625 >= height) {
           $('.main-d').css('display', 'block'); 
           $('.main-d').css('opacity', (height-600)/25);
       } else if (height > 625) {
           $('.main-d').css('opacity', 1);
           $('.main-d').css('display', 'block'); 
       }



       if (height <= 620) {
           
       } else if (height > 620) {
           $('.html').scrollTop(620);
       }
   });
});