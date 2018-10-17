//1,引入express
var express = require('express');
var app = express();

//2,设置模板引擎
var path = require('path');
//3,设置视图地址
app.set('views', path.join(__dirname, '/views'));
//4,设置ejs引擎
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//5,静态文件
app.use(express.static('public'));

//6,引入body-parser模块
var bodyParser = require('body-parser');
//7，创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var controller = require("./controllers/controller");

app.get('/',function(req,res){
    res.render("index",{});
});


app.get('/index',function(req,res){
    res.render("index",{});
});

app.get('/contact',function(req,res){
    res.render("contact",{});
});

app.get('/checkout-1',function(req,res){
    res.render("checkout-1",{});
});

app.get('/products-grid',function(req,res){
    res.render("products-grid",{});
});

app.get('/shopping-cart',function(req,res){
    res.render("shopping-cart",{});
});

app.post("/login",urlencodedParser,controller.login);

app.post("/resigned",urlencodedParser,controller.resgined);


app.listen(9999,function(){
    console.log("请通过http://coalhost:9999/index访问");
});
