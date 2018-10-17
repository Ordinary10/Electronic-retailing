function Dao(){
    var Mysql = require("../mysql/mysql");
    var mysql = new Mysql();
    this.login = function(name,password,call){
        // console.log("业务层的name，password:",name,password);
        mysql.init();//创建链接
        mysql.selectUser(name,function(result){
            if(result.length==0){
                call(1);
            }else if(result[0].password==password){
                call(2);
            }else{
                call(3);
            }
        });
        mysql.end();//断开连接
    };
    
    this.resgined = function(name,password,call){
        // console.log("注册时业务层的name，password:",name,password);
        mysql.init();//创建链接
        mysql.selectUser(name,function(result){
            if(result.length==0){
                mysql.insertUser(name,password);
                call(true);
            }else{
                call(false);
            }
            mysql.end();//断开连接
        });
    }




}

module.exports = Dao;