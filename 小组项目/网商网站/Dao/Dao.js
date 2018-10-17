function Dao(){
    var Mysql = require("../mysql/mysql");
    this.mysql = new Mysql();
    this.login = function(name,password,call){
        this.mysql.init();//创建链接
        this.mysql.selectUser(name,password,function(result){
            if(result.length==0){
                call(1);
            }else if(result[0]==password){
                call(2);
            }else{
                call(3);
            }
        })
    }



}

module.exports = Dao;