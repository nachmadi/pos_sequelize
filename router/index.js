let express =require('express');
let router = express.Router();

let models = require('../models');

router.get('/',(req, res)=>{
  if ((req.session) && (req.session.login)){
      if(req.session.login.isLogin){
        res.render('index');
      }else{
        res.redirect('/login');
      }
      //next();
  }else{
    res.redirect('/login'); // arahkan login
  }
});

module.exports = router;
