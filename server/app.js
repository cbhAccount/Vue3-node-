var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JWT = require('./utils/JWT');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webProductRouter = require('./routes/web/ProductRouter');
const { log } = require('console');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webNewsRouter);
app.use(webProductRouter);

app.use((req,res,next)=>{
 //如果token存在且有效，next()
 if(req.url==='/adminapi/user/login'){
   next();
   return;
 }
 const token = req.headers.authorization.split(" ")[1];
//  console.log(token);
 if(token){
    const result = JWT.verify(token);
    if(result){
      // console.log(result);
      const newToken = JWT.generate({
        _id:result._id,
        username:result.username
      },'1d');
      // console.log(newToken);
      res.header('Authorization',newToken);
      next();
    } else{
       //如果token不存在或者无效，res.json({code:401,msg:'请登录'})
      res.status(401).json({code:401,msg:'请登录'});
    }
 }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

//adminapi 后台系统接口
//webapi 企业官网接口
app.use(UserRouter)
app.use(NewsRouter);
app.use(ProductRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
