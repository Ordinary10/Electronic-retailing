function Dao() {
    var Mysql = require("../mysql/mysql");
    var mysql = new Mysql();
    this.login = function (name, password, call) {
        // console.log("业务层的name，password:",name,password);
        mysql.init();//创建链接
        mysql.selectUser(name, function (result) {
            if (result.length == 0) {
                call("1");
            } else if (result[0].passwords == password) {
                call("2");
            } else {
                call("3");
            }
        });
        mysql.end();//断开连接
    };

    this.resgined = function (name, password, call) {
        // console.log("注册时业务层的name，password:",name,password);
        mysql.init();//创建链接
        mysql.selectUser(name, function (result) {
            if (result.length == 0) {
                mysql.insertUser(name, password);
                call(true);
            } else {
                call(false);
            }
            mysql.end();//断开连接
        });
    };

    this.itemsinfor = function (call) {
        mysql.init();//创建链接
        mysql.itemsinfor(function (data) {
            call(data);
            mysql.end();//断开连接
        });
    };

    this.shoppinginfor = function (name, call) {
        mysql.init();//创建链接
        mysql.shoppinginfor(name, function (userid) {
            mysql.end();//断开连接
            var userId = userid.id;
            mysql.init();//创建链接
            mysql.shopitem(userId, function (test) {
                call(test);
                mysql.end();//断开连接
            })
        })
    };

    this.addshopping = function (name,username,price,num,call) {
        mysql.init();//创建链接
        mysql.addshopping(username, function (result) {

            if(result.length==0){
                call("1");
            }else{
            mysql.init();//创建链接
            mysql.writeshopping(result[0].id, name,price,num, function (result) {
                call("2");
                mysql.end();//断开连接
            })
        }
        })
        mysql.end();//断开连接
    }
}

module.exports = Dao;