var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var uriUtil = require('mongodb-uri');
var fs = require('fs');
var mongoosePages = require('mongoose-pages');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var uri = 'mongodb://martin:@ds056727.mongolab.com:56727/pubguide';
//var uri = 'mongodb://admin:Kicassu95@178.62.90.33:27120/test';
mongoose.connect(uri);

fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

var pubs = mongoose.model('pubs');
var pub = "";
var info = "";

pubs.findOne({'Pub' : 'Altona Vinbar'}, function(err, pubs){
  if(err){
    console.log(err);
  }
  if(pubs){
    pub += "<p>" + pubs.Pub + "</p>";
    info += "<p>Aldersgrense: " + pubs.Aldersgrense + "</p>";
    info += "<p>Åpningstider: " + pubs.Apningstider + "</p>";
    info += "<p>Hjemmeside: <a href='" + pubs.Hjemmside + "'>" + pubs.Hjemmside + "</a></p>";
    info += "<p>Type bar: " + pubs.Type + "</p>";
    info += "<p>Adresse: " + pubs.Adresse + "</p>";
    info += "<p>Tlf: " + pubs.Tlf + "</p>";
    info += "<p>Mail: " + pubs.Mail + "</p>";
    info += "<p>Kleskode: " + pubs.Kleskode + "</p>";
    info += "<p>Inngangspris: " + pubs.Inngangspris + "</p>";
    info += "<p>Diverse: " + pubs.Diverse + "</p>";
  };
});

//building html doc


var http = require('http');
var url = require('url');
function buildHtml(req) {
  var header = '<title>Pubguide</title><link type="text/css" rel="stylesheet" href="./public/stylesheets/style.css"/><meta name="viewport" content="width=device-width"/><meta charset="UTF-8"/>';
  var body = '<div id="wrapper">' + '<header>' + '<h1>Project Bar-Berg</h1>' + '</header>';
      body += '<div id="hoved">' + '<div id="nav-bar">' + '<a href="#hovedinnhold">Hjem</a>' + '<a href="">Om</a>';
      body += '<a href="">Kontakt</a>' + '<div id="sok">' + '<p>Søk etter en bar i Bergen</p>';
      body += '<form action="">' + '<input type="text">' + '</form>' + '</div>' + '</div>';
      body += '<br>' + '<h2>' + pub + '</h2>' + '<div>' + info + '</div></div></div>';
  // concatenate header string
  // concatenate body string

  return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};

http.createServer(function (req, res) {
  var html = buildHtml(req);



  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  })
  res.end(html);

  var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/subpage':
            res.end('subpage');
        break;
        default:
            res.end('default');
        break;
    }


}).listen(8080);

console.log('running')

var docsPerPage = 1;
var pageNumber = 2;

//Using mongoosePages plugin to paginate each doc in db
app.get('/pubs', function(req, res) {
  mongoose.model('pubs').findPaginated({}, function(err, result) {
    if (err) throw err;
    res.send(result);
  }, docsPerPage, pageNumber); // pagination options go here
});

app.get('/pub', function(req, res) {
  mongoose.model('pub').find(function(err, pub) {
    res.send(pub);
  });
});

app.get('/ror', function(req, res) {
  mongoose.model('ror').find(function(err, ror) {
    res.send(ror);
  });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
