function checkId() {
    var inputed = $('.id').val();
    $.ajax({
        data : {
            id : inputed
        },
        url : "/id_duplicate_check",
        success : function(data) {
            if(inputed=="" && data=='0') {
                $(".signupbtn").prop("disabled", true);
                $(".signupbtn").css("background-color", "#aaaaaa");
                $("#checkaa").css("background-color", "#FFCECE");
                idCheck = 0;
            } else if (data == '0') {
                $("#checkaa").css("background-color", "#B0F6AC");
                idCheck = 1;
                if(idCheck==1 && pwdCheck == 1) {
                    $(".signupbtn").prop("disabled", false);
                    $(".signupbtn").css("background-color", "#4CAF50");
                    signupCheck();
                } 
            } else if (data == '1') {
                $(".signupbtn").prop("disabled", true);
                $(".signupbtn").css("background-color", "#aaaaaa");
                $("#checkaa").css("background-color", "#FFCECE");
                idCheck = 0;
            } 
        }
    });
}