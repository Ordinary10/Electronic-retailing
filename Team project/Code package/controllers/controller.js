var Dao = require("../Dao/Dao");
var dao = new Dao();
module.exports = {

    login: function (req,res) {
        var name = req.body.name;
        var password = req.body.password;
        // console.log("控制层的name，password:",name,password);
        dao.login(name,password,function(result){
            switch(result){
                case 1:
                    res.end("账号不存在，请确认账号。。。");
                break;
                case 2:
                    res.end("登录成功，正在跳转。。。");
                break;
                case 3:
                    res.end("密码错误，请确认密码。。。");
                break;
            }
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
    }



}