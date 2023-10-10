const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require("express-session");
const restricted = require("./middleware/restricted")

const app = express();
const port = 3000

const sessionConfig = {
  name: 'monster',
  secret: 'blue diamonds',
  cookie: { 
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true //means no access from javascript hackers
  }, // 1 week
  resave: false, // resave every time you go back and forth??
  saveUninitialized: true // GDPR laws requires this to be false because user has to give consent
};



// ROUTERS 🟢
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const createRouter = require('./routes/create');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const settingsRouter = require('./routes/settings');
const aboutRouter = require('./routes/about');
const postsRouter = require('./routes/posts');
const dashboardRouter = require('./routes/dashboard')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(session(sessionConfig))


// ROUTERS 🟢
app.use('/', indexRouter);
app.use('/dashboard', restricted, dashboardRouter)
app.use('/user', restricted, userRouter);
app.use('/user/id', userRouter);
app.use('/create', createRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/settings', settingsRouter);
app.use('/about', aboutRouter);
app.use('/posts', postsRouter);

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
