module.exports = function(req, res, next) {
    //get session id:
    console.log(req.session.id);

    //set login session:
    req.session.loginyn = 'n';

    next();

}