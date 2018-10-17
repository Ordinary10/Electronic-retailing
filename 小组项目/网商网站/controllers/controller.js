var Dao = require("../Dao/Dao");
var dao = new Dao();
module.exports = {

    login: function () {
        //6,引入body-parser模块
        var bodyParser = require('body-parser');
        //7，创建 application/x-www-form-urlencoded 编码解析
        var urlencodedParser = bodyParser.urlencoded({ extended: false });
        var name = bodyParser.body.name;
        var password = bodyParser.body.password;
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
    }



}