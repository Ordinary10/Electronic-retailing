var Dao = require("../Dao/Dao");
var dao = new Dao();
module.exports = {

    login: function (req,res) {
        var name = req.body.name;
        var password = req.body.password;
        // console.log("控制层的name，password:",name,password);
        dao.login(name,password,function(data){
           res.end(data);
        });
    },

    resgined:function(req,res){
        var name = req.body.name;
        var password = req.body.password;
        // console.log("控制层的name，password:",name,password);
        dao.resgined(name,password,function(result){
            if(result){
                res.end("注册成功，请在左侧登录。。。");
            }else{
                res.end("账号已存在，请重新注册。。。");
            }
        })
    },

    index:function(req,res){
        if(!req.session.sign){
            req.session.sign=true;
            res.render("index",{user:"Login",exit:"Registered"});
            return;
        }else{
            var name = req.cookies.name;
            console.log(name);
            res.render("index",{user:name,exit:"cancellation"});
        }
    }



}