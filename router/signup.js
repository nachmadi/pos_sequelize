var express=require('express');
var router=new express.Router();
var models=require('../models');

router.get('/', function (req, res) {
  res.render('signup');
});
router.post('/',(req,res)=>{
  let user={
    user_name:req.body.user_name,
    user_pass:req.body.user_pass,
    salt:'123',
    role:'customer',
    deposito:0
  }
  models.Users.create(user)
  .then(users=>{
    res.redirect('/users');
  })
  .catch(err=>{
    res.render('login');
  })
})
module.exports=router
