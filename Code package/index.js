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
    name: 'user',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 60*60*1000 },     //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));

var controller = require("./controllers/controller");

app.get('/',controller.index);

app.get('/index',controller.index);

app.get('/contact',controller.contact);

app.get('/checkout-1',controller.checkout);

app.get('/products-grid',controller.products);

app.get('/shopping-cart',controller.shopping);

app.post("/login",urlencodedParser,controller.login);

app.post("/resigned",urlencodedParser,controller.resgined);

app.post("/cancellation",urlencodedParser,controller.cancellation);

app.get("/addshopping",controller.addshopping);
//后台管理模块
//设置路由地址
//用户管理
var checkedc=require('./controllers/checkedC.js');
app.get('/user',checkedc.checked);
app.post('/checked',urlencodedParser,checkedc.checkedOrder)
//商品详情
var indexcontrollers = require('./controllers/IndexControllers')
app.get('/items',indexcontrollers.items);
app.post('/add',urlencodedParser,indexcontrollers.add);
app.post('/del',urlencodedParser,indexcontrollers.del);
//订单详情
var ordercontrollers = require("./controllers/OrderControllers");

app.get('/order',ordercontrollers.finds);
app.post('/orders',urlencodedParser, ordercontrollers.find)

app.listen(9999,function(){
    console.log("请通过http://localhost:9999/ 访问");
});
