function OrderDao() {
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

    this.selectziduan = function (call, name) {

        var userGetSql = "SELECT * FROM orders where username ='" + name + "'";


        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            call(test);
        });

        this.connection.end();
    }


}

module.exports = OrderDao;