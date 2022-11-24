const req = require("express/lib/request");

function auth(req,res,next){
    if(req.session.umedico){
        next();
    } else{
        res.redirect("/umedico/login");
    }
}

module.exports = auth;