var Dao = require("../Dao/Dao");
var dao = new Dao();
module.exports = {

    login: function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
        // console.log("控制层的name，password:",name,password);
        dao.login(name, password, function (num) {
            if (num == "2") {
                req.session.sign = true;
                res.cookie("name", name, { maxAge: 60 * 60 * 1000 });
                res.cookie("password", password, { maxAge: 60 * 60 * 1000 });
            }
            res.end(num);
        });
    },

    resgined: function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
        // console.log("控制层的name，password:",name,password);
        dao.resgined(name, password, function (result) {
            if (result) {
                res.end("注册成功，请在左侧登录。。。");
            } else {
                res.end("账号已存在，请重新注册。。。");
            }
        })
    },

    index: function (req, res) {
        dao.itemsinfor(function (data) {
            if (req.session.sign) {
                res.render("index", { user: req.cookies.name, exit: "cancellation", data: data });
                return;
            } else {
                res.render("index", { user: "Login", exit: "Resgined", data: data });
            }
        });
    },

    contact: function (req, res) {
        dao.itemsinfor(function (data) {
            if (req.session.sign) {
                res.render("contact", { user: req.cookies.name, exit: "cancellation" });
                return;
            } else {
                res.render("contact", { user: "Login", exit: "Resgined" });
            }
        });
    },

    checkout: function (req, res) {
        dao.itemsinfor(function (data) {
            // console.log(data);
            if (req.session.sign) {
                res.render("checkout-1", { user: req.cookies.name, exit: "cancellation" });
                return;
            } else {
                res.render("checkout-1", { user: "Login", exit: "Resgined" });
            }
        });
    },

    products: function (req, res) {
        dao.itemsinfor(function (data) {
            // console.log(data);
            if (req.session.sign) {
                res.render("products-grid", { user: req.cookies.name, exit: "cancellation" });
                return;
            } else {
                res.render("products-grid", { user: "Login", exit: "Resgined" });
            }
        });
    },

    shopping: function (req, res) {
        // console.log(req.cookies.name);
        if (req.cookies.name == undefined ||req.cookies.name=="Login") {
            dao.itemsinfor(function (data) {
                // console.log(req.session.sign)
                if (req.session.sign) {
                    res.render("index", { user: req.cookies.name, exit: "cancellation", data: data });
                    return;
                } else {
                    res.render("index", { user: "Login", exit: "Resgined", data: data });
                }
            });
            return;
        }
        var name = req.cookies.name;

        dao.shoppinginfor(name, function (data) {
            // console.log(name,data);
            res.render("shopping-cart", { user: name, exit: "cancellation", data: data });
        });
    },

    cancellation: function (req, res) {
        req.session.sign = false;
        req.cookies.name = "Login";
        res.render("checkout-1", { user: req.cookies.name, exit: "Resgined" });
    },

    addshopping:function(req,res){
        var name = req.query.name;
        var usename= req.query.username;
        dao.addshopping(usename,function(result){
            if(result!="1"){
                res.end("添加失败")
            }else{
                res.end("添加成功")
            }
        },name);
    }

}