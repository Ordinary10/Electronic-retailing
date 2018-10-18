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

var cookie = require("cookie-parser");
app.use(cookie());

var session = require("express-session");
app.use(session({
    secret:"12345",
    name: 'express_11_cookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 600*1000 },     //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));

var controller = require("./controllers/controller");

app.get('/',function(req,res){
    res.render("index",{user:"Login",exit:"Registered"});
});

app.get('/index',controller.index);

app.get('/contact',function(req,res){
    res.render("contact",{user:"Login",exit:"Registered"});
});

app.get('/checkout-1',function(req,res){
    res.render("checkout-1",{user:"Login",exit:"Registered"});
});

app.get('/products-grid',function(req,res){
    res.render("products-grid",{user:"Login",exit:"Registered"});
});

app.get('/shopping-cart',function(req,res){
    res.render("shopping-cart",{user:"Login",exit:"Registered"});
});

app.post("/login",urlencodedParser,controller.login);

app.post("/resigned",urlencodedParser,controller.resgined);


app.listen(9999,function(){
    console.log("请通过http://192.168.2.141:9999/ 访问");
});
