/**
 * Created by dell on 2018/10/18.
 */
exports.checked = function(req,res){
    var Chaxun = require('./checkedDao.js');
    var chaxun =new Chaxun();
    chaxun.init();
    chaxun.selectUserByName(function(data){
        // console.log("��������")
        res.render('user',{data:data,num:1});
    });

    chaxun.end();

}
exports.checkedOrder =function(req,res){
    var name = req.body.yhName;
    // console.log(name);
    var ChaxunOrder = require('./checkedDao.js');
    var chaxunOrder =new ChaxunOrder();
    chaxunOrder.init();
    chaxunOrder.selectorder(name, function (result) {
        if(result.length!=0){
            res.end(JSON.stringify(result))
        }else{
            res.end("0");
        }

    })


    chaxunOrder.end();
}
