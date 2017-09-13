let express =require('express');
let router = express.Router();

let models = require('../models');
var utility = require('../helper/util.js');

router.get('/',(req, res)=>{
  res.render('login',{info:'Login tidak terdaftar!',err:false});
});

router.post('/',(req, res)=>{
   models.Users.findOne({
       where: {user_name: req.body.user_name}
   })
  .then(userLogin => {
      if (userLogin==null) {
        res.render('login',{err:true, info:'Login tidak terdaftar!'});
      } else {
        let passFromTable = userLogin.user_pass;
        let passFromClien =  utility.getMd5(req.body.user_pass+userLogin.salt.trim());

        //console.log(passFromTable+" "+passFromClien);
        if(passFromTable===passFromClien){
            req.session.login = {isLogin:true, err:false, role: userLogin.role};
            res.redirect('/index');
        }else{
            res.render('login',{err:true, info:'Password Salah!'});
        }
        //res.session.level = userLogin.level_user;

      }
  })

});


module.exports = router;
