var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var sendMailKZ = require('send-mail-kz');
var sg_api_key = 'SendGrid api key';
var mg_api_key = 'mailgun api key';
var mg_domain ='mailgun domain';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/send-mail', function(req,res) {
	sendMailKZ.sendMail(req.body, sg_api_key, mg_api_key, mg_domain, function(err, status){
		if(err) {
			res.send(err + '*****' + status);
		}else {
			res.send(status);
		}
	});
});

module.exports = app;
