function register_check() {
    var email_read = document.getElementById("email").value;
    var pw_read = document.getElementById("pw").value;
    var name_read = document.getElementById("name").value;
    
    if (email_read.includes("@") == false || email_read.includes(".") == false || email_read.length < 8) {
        alert("Please insert email in email form");
        return false;
    } else if (pw_read.length < 8 || pw_read.includes(" ") == true) {
        alert("PW is weak! PW must be longer more than 8");
        return false;
    } else {
        if (email_read != "" && pw_read != "" && name_read != "") {
            document.getElementById("login_form_tag").submit();
        } else {
            alert("Form is missing! Please Check Again");
            return false;
        }
    }
}