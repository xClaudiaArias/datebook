const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require("express-session");
const restricted = require("./middleware/restricted")
const authBlock = require("./middleware/authBlock")

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// ROUTERS 🟢
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const createRouter = require('./routes/create');
const authRouter = require('./routes/auth');
const logoutRouter = require('./routes/logout')
const accountRouter = require('./routes/account');
const postsRouter = require('./routes/posts');
const settingsRouter = require('./routes/settings');
const editRouter = require('./routes/edit')



// ROUTES 🟢
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/user/id', userRouter);
app.use('/user/update/user_id', userRouter);
app.use('/user/delete/user_id', userRouter);
app.use('/create', createRouter);
app.use('/auth/', authBlock, authRouter);
app.use('/auth/login', authRouter);
app.use('/auth/register', authRouter);
app.use('/auth/logout', authRouter);
app.use('/posts', postsRouter);
app.use('/posts/id', postsRouter);
app.use('/posts/user/user_id', postsRouter);
app.use('/account', accountRouter);
app.use('/settings', settingsRouter);
app.use('/settings/update/user_id', settingsRouter);
app.use('/edit', editRouter)
app.use('/edit/post_id', editRouter);
app.use('/posts/delete/post_id', postsRouter);


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
