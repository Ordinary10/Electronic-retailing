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



// var accountController = require('./controllers/AccountController');
// app.get('/account', accountController.account);
// app.post('/login',urlencodedParser, accountController.login);
// var indexController = require('./Controllers/IndexController');

// app.get('/index',{});
// app.get('/register',{});

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

app.post("/login",urlencodedParser,function(req,res){
    res.end("登录成功");
});

app.post("/resigned",urlencodedParser,function(req,res){
    res.end("注册成功");
});


app.listen(9999,function(){
    console.log("请通过http://coalhost:9999/index访问");
});
