function login_check() {
    var email_read = document.getElementById("email").value;
    var pw_read = document.getElementById("pw").value;

    console.log(email_read);

    if (email_read != "" && pw_read != "") {
        document.getElementById("login_form_tag").submit();
    } else {
        alert("ID or PW is missing! Please Check Again");
        return false;
    }
}
