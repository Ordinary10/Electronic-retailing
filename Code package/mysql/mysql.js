function Mysql(){
    var crypto = function(data){
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        var buffer = md5.update(data).digest('hex');
        return buffer;
    };//加密函数

    this.init = function(){
        var mysql = require("mysql");//引入模块
        this.connection = mysql.createConnection({
            host:"localhost",   //主机IP
            user:"root",       //数据库账号
            password:"123456",  //数据库密码
            port:"3306",      //数据库端口号
            database: "progresss"  //链接的数据
        });
        this.connection.connect(); //创立链接
    };//链接数据库函数


    this.selectUser = function(name,call){
        // console.log("数据库的name：",name);
        var sql = "select passwords from userinformation where username='"+name+"'";//账号查询语句
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            // console.log("数据库查询返回值：",test);
            call(test);
        })
    };//查询账号函数

    this.insertUser = function(name,password,call){
        // var name = crypto(name);
        // var password = crypto(password);//加密存储
        var date = new Date();
        var sql = "insert into userinformation(username,passwords,date) values(?,?,?)";
        var userinfor = [name,password,date];
        console.log(userinfor);
        this.connection.query(sql,userinfor,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            // console.log("注册时数据层的返回值：",result);
        })

    };//数据库写入用户信息函数

    this.itemsinfor = function(call){
        var sql = "select * from items ";//所有商品详情查询语句
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            call(test);
        })
    };

    this.shoppinginfor = function(name,call){

        

        var sql = "select id from userinformation where username='"+name+"'";
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            var userid = test[0];
            call(userid);
        })
    };

    this.shopitem = function(userid,call){
        var sql = "select shopping.items,shopping.price,shopping.numbers,items.imgs from shopping inner join items on shopping.items=items.name where shopping.userid='"+userid+"'";
        //  var sql2="select userinformation.username,shopping.items,shopping.price from userinformation join shopping on shopping.userid=userinformation.id";
        // var sql = "select items,price,numbers from shopping where userid=' "+userid+"'";
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            call(test);
        })
    };

    this.addshopping = function(name,call){     
        var sql = "select id from userinformation where username='"+name+"'";
        this.connection.query(sql,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            call(test);
        })
    };

    this.writeshopping =function(userid,name,price,num,call){
        var sql = "insert into shopping(userid,price,items,numbers) values(?,?,?,?)";
        var arr = [userid,price,name,num];
        this.connection.query(sql,arr,function(err,result){
            if(err){
                console.log("error:",err.message)
                return;
            };
            call("1");
        })
    }


    this.end = function(){
        this.connection.end();
    };//断开数据库链接
}


module.exports = Mysql;