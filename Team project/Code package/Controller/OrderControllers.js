module.exports={
    //order:function(req,res){
    //    res.render("/order",{})
    //},
    find:function(req,res){
        var search=req.body.sousuo;

      //引入订单数据处理模板
        var OrderDao=require('../Dao/OrderDao');
        //创建对象
       var orderdao= new OrderDao();
        //初始化
        orderdao.init();
        //查询数据
        orderdao.selectziduan(function(result){
            if(result.length!=0){
                res.end("1");
            }else{
                res.end("2");
            }

        },search)
    },

    finds:function(req,res){
        var name = req.query.name;
        if(name==undefined){
            res.render("order",{result:[]});
            return;
        }

        var OrderDao=require('../Dao/OrderDao');
        //创建对象
        var orderdao= new OrderDao();
        //初始化
        orderdao.init();
        //查询数据
        orderdao.selectziduan(function(result){
            //console.log(result);
            res.render("order",{result:result});

        },name)

    }

}
