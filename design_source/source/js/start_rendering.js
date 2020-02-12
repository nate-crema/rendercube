function re_login() {
    axios.get('/logout')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    window.location.href = "/login";
}

function step_a() {
    var id_body = document.getElementById("id_body_display").innerHTML;
    var license_body = document.getElementById("license_body_display").innerHTML;

    console.log(id_body);
    console.log(license_body);


    if (id_body == "" || license_body == "") {
        alert('Login Information have some trouble. Please try again');
        window.location.href='/login';
        return false;
    } else {
        $('.step_bar_cover').addClass('GoRight duration_0_8s');
        $('.step_bar_cover').removeClass('fadeInRight fadein_1s');
        $('.step_bar_cover').addClass('GoRight duration_0_8s');
        $('.step_a').addClass('fadeOutDown duration_0_4s');
        $('.step_b').addClass('fadeIn fadein_1s');
        $('.step_b').css('display', 'block');
        $('.title_text_under_a').removeClass('fadeIn fadein_2s');
        $('.title_text_under_a').addClass('fadeOut_remain duration_0_4s');
        $('.title_text_under_b').css('display', 'block');
        $('.title_text_under_b').addClass('fadeIn fadein_2s');

        document.getElementById("button_step_title").innerHTML = "Rendering";

        document.getElementById("button_next").setAttribute( "onClick", "javascript: step_b();" );
    }
}
    
function step_b() {
    var file_check = document.getElementById("input_file_zip").value;
    console.log(file_check);
    
    var filename_check = document.getElementById('input_filename').value;
    var comp_check = document.getElementById('input_comp').value;

    if (file_check && filename_check && comp_check) {
        document.getElementById("start_rendering_form").submit();
    } else {
        alert("Some information missed! Please check again");
    }
    
}