module.exports={
    //order:function(req,res){
    //    res.render("/order",{})
    //},
    find:function(req,res){
        var search=req.body.sousuo;

      //���붩�����ݴ���ģ��
        var OrderDao=require('../Dao/OrderDao');
        //��������
       var orderdao= new OrderDao();
        //��ʼ��
        orderdao.init();
        //��ѯ����
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
        //��������
        var orderdao= new OrderDao();
        //��ʼ��
        orderdao.init();
        //��ѯ����
        orderdao.selectziduan(function(result){
            //console.log(result);
            res.render("order",{result:result});

        },name)

    }

}
