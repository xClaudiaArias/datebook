const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const db = require('./database')
const md5 = require('md5');


// ROUTERS 🟢
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const createRouter = require('./routes/create');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const settingsRouter = require('./routes/settings');
const aboutRouter = require('./routes/about');

const app = express();
const port = 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


// ROUTERS 🟢
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/user/id', userRouter);
app.use('/create', createRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/settings', settingsRouter);
app.use('/about', aboutRouter);

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

module.exports = app;