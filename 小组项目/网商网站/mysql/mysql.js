function Mysql(){
    this.init = function(){
        var mysql = require("mysql");//引入模块
        this.connection = mysql.createConnection({
            host:"localhost",   //主机IP
            user:"root",       //数据库账号
            password:"123456",  //数据库密码
            port:"3306",      //数据库端口号
            database: "userinfor"  //链接的数据
        });
        this.connection.connect(); //创立链接
    };//链接数据库函数


    this.selectUser = function(name,call){
        var sql = "select password from userinfors where name="+name;//账号查询语句
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            call(result);
        })
    };//查询账号函数

    this.insertUser = function(name,password,call){
        var crypto = require("crypto");
        var name = crypto(name);
        var password = crypto(password);//加密存储
        var date = new Date();
        var sql = "insert into userinfors(name,password,date) values(?,?,?)";
        var userinfor = [name,password,date];
        this.connection.query(sql,userinfor,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            call(result);
        })

    };//数据库写入用户信息函数

    this.end = function(){
        this.connection.end();
    };//断开数据库链接
}


module.exports = Mysql;