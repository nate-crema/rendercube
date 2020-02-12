module.exports = function(app, fs, path, crypto, reg_model) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: "Rendercube - 베타서비스"
        });
    });
    app.get('/pre_register', function(req, res) {
        res.render('pre_register', {
            title: "Rendercube - 사전등록"
        });
    });
    app.get('/con_school', function(req, res) {
        res.render('con_school', {
            title: "Rendercube - 무료서비스 대상 학교"
        });
    })
    app.post('/pre_register', function(req, res) {

        var email = req.body.email;
        var pw = req.body.pw;

        //Password Encrypt

        var encrypt = crypto.createHash('sha256');

        encrypt.update(pw);

        var output_pw = encrypt.digest('hex');

    
        console.log(`
        ----| pre_register |----
        email: ` + email + `
        pw (after encrypt): ` + output_pw + `
        `);

        reg_model.find({
            email: email
        }, {
            _id: 0,
            email: 1
        }, function(err,reg_log) {
            console.log(reg_log);
            if (reg_log[0] != undefined) {
                console.log("duplcate account");
                res.render('pre_register_duplicate', {
                    title: "Rendercube - 이메일 중복",
                    email: email
                });
            } else {
                let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();
                const reg_user = new reg_model ({
                    email: email,
                    pw: output_pw,
                    date: date
                });
                console.log("logging");

                reg_user.save(function(err, result) {
                    console.log("loging");
                    if (err) {
                        console.log("error!");
                        res.end("Server Error: Please Call Manager");
                    }
                    console.log(`
                        ---| new user registerd! |---

                        ` + result + `
                    `);
                    res.render('register_welcome', {
                        email: email,
                        title: "Rendercube - 사전예약 완료"
                    });
                })
            }
        });
    });
}