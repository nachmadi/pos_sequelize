// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var md5 = require('md5');
// var utility = require('./helper/util.js');
//
// var login = require('./router/login.js');
// var index = require('./router/index.js');
// var user = require('./router/users.js');
//
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.set('view engine', 'ejs');
// app.use(express.static('asset'))
// app.use(express.static(__dirname + '/asset'));
// // app.use("/asset", express.static(__dirname + '/asset'));
//
// app.use('/asset', express.static(path.join(__dirname, '/asset')))
// app.use(session({secret:'secret',cookies:{}}))
// // deklarasi letak file.js {otomatis di tambah s}
// app.use('/', index);
// app.use('/users', user);
// app.listen(process.env.PORT || 3000,()=>{
//   console.log('Gunakan port 3000');
// });
// // Logout endpoint
// /*
// app.get('/logout', function (req, res) {
//   req.session.destroy();
//   res.send("logout success!");
// });
// */
// // console.log(utility.getMd5("123"+"123"));
//
// // app.use(function (req, res) {
// //   if ((req.session)&&(req.session.login)) {
// //       res.redirect('/');
// //   } else {
// //       res.redirect('/login') // arahkan login
// //   }
// // })
// //


var express = require('express');
var path = require('path');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');
var path = require('path')
app.use('/static',express.static(__dirname + '/public'));
// app.use(express.static(config.root + '/public',{ maxAge: 86400000 }));
var session = require('express-session');
var md5 = require('md5');
var utility = require('./helper/util.js');
var login = require('./router/login.js');
var index = require('./router/index.js');
var user = require('./router/users.js');
var transaksi = require('./router/transaksis.js');
app.use(session({
  secret:'secret',
  cookies:{}
}))
app.use('/login', login);
app.use('/',(req,res,next)=>{
  if(req.session.login){
    next()
  }else{
    res.redirect('/login');
  }
})
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});
app.use('/', index);
app.use('/users', user);
app.use('/transaksis', transaksi);
app.listen(process.env.PORT||3000,()=>{
  console.log('Listening Port 3000')
});
