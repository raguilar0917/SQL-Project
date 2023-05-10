var createError = require('http-errors');
var mysql = require('mysql2');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const db = require('./conf/database');
var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();

const port = 3030;


app.listen(port, () =>{
  console.log(`http://localhost:${port}....`);
});

app.use(cors()); 

// Define the root route
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + 'public'));


// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Define other routes here...
app.get('/get-students', async (req, res) => {
  const query = 'SELECT * FROM Student';
  db.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results);
  });
});

app.get('/get-book', async (req, res) => {
  const query = 'SELECT * FROM DBClass.Book;';
  db.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results);
  });
});

app.get('/get-libraries', async (req, res) => {
  const query = 'SELECT * FROM DBClass.Library;';
  db.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results);
  });
});

app.get('/get-rentals', async (req, res) => {
  const query = 'SELECT * FROM DBClass.Rental;';
  db.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results);
  });
});


app.get('/student/:studentID', (req, res) => {

  let _id = req.params.studentID;
  let prompt = 'SELECT * FROM Student WHERE studentID=?;'
  db.query(
    prompt,[_id],
     function(error, results, fields){
    if(error){
      res.json(error);
    }else{
      res.json(results);
    }
  });
});

app.get('/libraries', (req, res) => {
  db.query('SELECT * FROM Library;', function(error, results, fields){
    if(error){
      res.json(error);
    }else{
      res.json(results);
    }
  });
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
