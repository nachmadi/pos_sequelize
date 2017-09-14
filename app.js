var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var md5 = require('md5');
var utility = require('./helper/util.js');

var login = require('./router/login.js');
var index = require('./router/index.js');
var barang = require('./router/barangs.js');
var report = require('./router/reports.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
  secret: 'rahasia',
  cookie: {maxAge: 60000}
}))

// deklarasi letak file.js {otomatis di tambah s}
app.set('view engine', 'ejs');
var path = require('path')
app.use('/static',express.static(__dirname + '/public'));


app.use('/login', login);
app.use('/index', index);
app.use('/barangs', barang);
app.use('/reports', report);

// app.use(function (req, res) {
//   if ((req.session)&&(req.session.login)) {
//       res.redirect('/index');
//   } else {
//       res.redirect('/login') // arahkan login
//   }
// })


// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.listen(process.env.PORT||3001,()=>{
  console.log('Listening Port 3001')
});
