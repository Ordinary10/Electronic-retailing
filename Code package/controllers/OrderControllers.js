module.exports={

    find:function(req,res){
        var search=req.body.sousuo;
        var OrderDao=require('./OrderDao');

       var orderdao= new OrderDao();

        orderdao.init();

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

        var OrderDao=require('./OrderDao');

        var orderdao= new OrderDao();

        orderdao.init();

        orderdao.selectziduan(function(result){
            //console.log(result);
            res.render("order",{result:result});

        },name)

    }

}
