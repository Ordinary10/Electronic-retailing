/**
 * Created by dell on 2018/10/18.
 */
function checkedDao() {
    this.init = function () {
        var mysql = require('mysql');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'progresss'
        });
        this.connection.connect();
    }
    this.selectUserByName = function (call) {
        var userGetSql = "SELECT * from userinformation ";
        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            //console.log(result);
            var test = JSON.stringify(result);

            var data = JSON.parse(test);
            call(data);
        });
    }

    this.SelectYhname = function (call) {
        var NameGetSql = "SELECT * from Shopping ";
        this.connection.query(NameGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            //console.log(result);
            var test = JSON.stringify(result);

            var dataOrder = JSON.parse(test);

            call(dataOrder);
        });
    }

    this.selectorder = function (name, call) {
        // console.log(name)
        var sql = "select passwords from userinformation where username='" + name + "'";
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            // console.log(result);
            var test = JSON.stringify(result);

            var dataOrder = JSON.parse(test);

            call(dataOrder);
        });
    }

    this.end = function () {
        this.connection.end();
    }
}
module.exports = checkedDao;