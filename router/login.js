let express =require('express');
let router = express.Router();
let models = require('../models');
var utility = require('../helper/util.js');
// var crypt = require('../helper/encrypter.js');
router.get('/',(req, res)=>{
  res.render('login',{info:'Login tidak terdaftar!',err:false});
});
router.post('/',(req, res)=>{
   models.Users.findOne({
       where: {user_name: req.body.user_name}
   })



/*
  //  models.User.findOne({where:{username:req.body.username}})
   .then(login=>{

     // res.send(tools.crypt('123',tools.rand()))
     let rand=login.salt;
     let reqPass=req.body.password;
     let pass=tools.crypt(reqPass,rand);
     let isPass=login.password;
     if(pass==isPass){
      //  req.session.haslogin=true;
      //  req.session.user={username:req.body.username, logTime:new Date()}
      //  res.redirect('/');
       req.session.login={isLogin:true,err:false,role:userLogin.role,userId:userLogin.id};
       var hour = 3600000;
       req.session.cookie.expires = new Date(Date.now() + hour);
       req.session.cookie.maxAge = hour;
       res.redirect('/');


     }else{
       res.render('login',{err:true, info:'Password Salah!'});
      //  res.redirect('/login')
     }
*/




  .then(userLogin => {
      if (userLogin==null) {
        res.render('login',{err:true, info:'Login tidak terdaftar!'});
      } else {
        let passFromTable = userLogin.user_pass;
        let passFromClien =  utility.getMd5(req.body.user_pass+userLogin.salt.trim());
        if(passFromTable===passFromClien){
            req.session.login={isLogin:true,err:false,role:userLogin.role,userId:userLogin.id};
            var hour = 3600000;
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = hour;
            res.redirect('/');
        }else{
            res.render('login',{err:true, info:'Password Salah!'});
        }
      }
  })
  .catch(err=>{
    console.log(err)
  })
});
module.exports = router;
