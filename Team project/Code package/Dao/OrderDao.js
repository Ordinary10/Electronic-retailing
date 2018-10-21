function OrderDao(){
      this.init=function(){
        //1.����MySQLģ��
        var mysql = require('mysql');//����ģ��
        //2.����һ��connection
        this.connection=mysql.createConnection({
            host: '192.168.1.2',       //���� ip
            user: 'root',            //MySQL��֤�û���
            password: '123456',                //MySQL��֤�û�����
            port: '3306',                 //�˿ں�
            database: 'progresss'          //���ݿ����������
        });
        //3.����
        this.connection.connect();
    }

    this.selectziduan=function(call,name){
        //1.��дsql���
        //console.log(name);
        var userGetSql="SELECT * FROM orders where username ='"+name+"'";
        //2,���в�ѯ����
        /**
         *query��mysql���ִ�еķ���
         * 1��userAddSql��д��sql���
         * 2��function (err, result)���ص�������err��ִ�д���ʱ���ش�һ��errֵ����ִ�гɹ�ʱ������result
         */

        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            var data = JSON.stringify(result);
            var test = JSON.parse(data);
            call(test);
        });
        //3,���ӽ���
        this.connection.end();
     }


}








module.exports=OrderDao;