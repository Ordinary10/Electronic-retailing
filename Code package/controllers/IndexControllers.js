exports.items = function (req, res) {
    var Sql = require('./Sql');
    var sql = new Sql();
    sql.init();
    sql.selectshangpin(function (data) {
        res.render('items', { data: data });
    });
    sql.end();
}

exports.add = function (req, res) {
    var name = req.body.itemname;
    var introduction = req.body.instroduction;
    var prices = req.body.price;
    var path = req.body.path;
    var Sql = require('./Sql');
    var sql = new Sql();
    sql.init(); 
    console.log(name,introduction,prices,path)
    sql.insertshangpin(name,introduction,prices,path,function(result){
       
       if(result==1){
           res.end("添加成功,请刷新！")
       }else{
           res.end("添加失败！")
       }
    });
    sql.end();
}

exports.del = function (req, res) {
    var name = req.body.itemname;
    var Sql = require('./Sql');
    var sql = new Sql();
    sql.init();
    sql.chaxunshangpin(name,function(data){
        sql.init();  //会断开，所以先要重新连接
        if (data.length == 0) {
            res.end("没有该商品，请检查商品名称！")
        } else {
            sql.delshangpin(name,function(result){
                res.end("删除成功！")
        
            });
            sql.end();
        }
   })  
    
}
