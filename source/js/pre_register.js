function send_register() {
    var email_read = document.getElementById("input_email").value;
    var pw_read = document.getElementById("input_pw").value;

    console.log(email_read);

    if (email_read != "" && pw_read != "") {
        document.getElementById("login_form").submit();
    } else {
        alert("정보가 모두 입력되지 않았습니다! 다시한번 확인해주세요!ㅇ");
        return false;
    }
}