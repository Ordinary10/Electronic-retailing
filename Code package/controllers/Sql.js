function Sql() {
    this.init = function () {
        var mysql = require('mysql');  //调用MySQL模块

        //1，创建一个connection
        this.connection = mysql.createConnection({
            host: 'localhost',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: '123456',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'progresss'          //数据库里面的数据
        });
        //2,连接
        this.connection.connect();
    }

    //查询
    this.selectshangpin = function (call) {
        var select = "select * from items";
        this.connection.query(select, function (err, result) {
            if (err) {
                console.log('[select ERROR] - ', err.message);
                return;
            }
            var test = JSON.stringify(result);
            var data = JSON.parse(test);
            call(data);
        });
    }

    //增加
    this.insertshangpin = function (name,introduction,prices,path,call) {
        var add = "insert into items(name,introduction,prices,imgs) values(?,?,?,?)";
        var arr=[name,introduction,prices,path];
        // console.log(arr);
        this.connection.query(add,arr, function (err, result) {
            if (err) {
                console.log('[select ERROR] - ', err.message);
                return;
            }
            call(1);
        });
    }

    //删除
    this.delshangpin = function (name, call) {
        var del = "delete from items where name='"+name+"'";
        //2,执行删除
        this.connection.query(del, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    }
    //删除前先检查商品名称是否存在
    this.chaxunshangpin = function (name,call) {
        var select = "select * from items where name = '"+name+"'";
        this.connection.query(select, function (err, result) {
            if (err) {
                console.log('[select ERROR] - ', err.message);
                return;
            }
            var test = JSON.stringify(result);
            var data = JSON.parse(test);
            // console.log(data);
            call(data);
        });
        this.connection.end();
    }

    this.end = function(){
        this.connection.end();
    }

}
module.exports = Sql;