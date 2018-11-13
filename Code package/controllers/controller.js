var Dao = require("./Dao");
var dao = new Dao();
module.exports = {

    login: function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
        dao.login(name, password, function (num) {
            if (num == "2") {
                req.session.user = { username: name };
                res.cookie("name", name, { maxAge: 60 * 60 * 1000 });
            }
            res.end(num);
        });
    },

    resgined: function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
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
            if (req.session.user) {
                res.render("index", { user: req.session.user.username, exit: "cancellation", data: data });
                return;
            } else {
                res.render("index", { user: "Login", exit: "Resgined", data: data });
            }
        });
    },

    contact: function (req, res) {
        dao.itemsinfor(function (data) {
            if (req.session.user) {
                res.render("contact", { user: req.session.user.username, exit: "cancellation" });
                return;
            } else {
                res.render("contact", { user: "Login", exit: "Resgined" });
            }
        });
    },

    checkout: function (req, res) {
        dao.itemsinfor(function (data) {
            // console.log(data);
            if (req.session.user) {
                res.render("checkout-1", { user: req.session.user.username, exit: "cancellation" });
                return;
            } else {
                res.render("checkout-1", { user: "Login", exit: "Resgined" });
            }
        });
    },

    products: function (req, res) {
        dao.itemsinfor(function (data) {
            // console.log(data);
            if (req.session.user) {
                res.render("products-grid", { user: req.session.user.username, exit: "cancellation" });
                return;
            } else {
                res.render("products-grid", { user: "Login", exit: "Resgined" });
            }
        });
    },

    shopping: function (req, res) {
        // console.log(req.cookies.name);
        if (!req.cookies.name) {
            dao.itemsinfor(function (data) {
                // console.log(req.session.sign)
                if (req.session.user) {
                    res.render("index", { user: req.session.user.username, exit: "cancellation", data: data });
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
        req.session.user = { username: "Login" };
        res.cookie("name", req.session.user.username, { maxAge: 0 })
        res.render("checkout-1", { user: req.session.user.username, exit: "Resgined" });
    },

    addshopping: function (req, res) {
        var name = req.query.name;
        var username = req.query.username;
        var price = req.query.price;
        var num = req.query.num;
        // console.log(name, username, price, num)

        dao.addshopping(name, username, price, num, function (data) {
            if (data == "1") {
                res.end("1")
            } else if (data == "2") {
                res.end("2")
            }
        });
    }

}