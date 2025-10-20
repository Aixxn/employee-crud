var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');

var app = express();

var mongoose = require('mongoose');

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://maazures_db_user:73QWsN09gHZwj7mk@expressdb.lywqzch.mongodb.net/?retryWrites=true&w=majority&appName=expressdb";

// Disable buffering for Vercel serverless
mongoose.set('bufferCommands', false);

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Connect before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error('Error:', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Only start server if not in production (local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
}

module.exports = app;