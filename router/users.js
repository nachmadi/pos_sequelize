var express=require('express');
var router=new express.Router();
var models=require('../models');

router.get('/',(req,res)=>{
  models.Users.findAll()
  .then(users=>{
    res.render('users',{user:users,role:req.session.login.role});
  })
})
router.get('/add',(req,res)=>{
  res.render('users_add',{message:'',role:req.session.login.role});
})
router.post('/add',(req,res)=>{
  let obj={
    user_name:req.body.user_name,
    user_pass:req.body.user_pass,
    salt:'123',
    role:req.body.role,
    deposito:0
  }
  models.Users.create(obj)
  .then(users=>{
    res.redirect('/users');
  })
  .catch(err=>{
    res.render('users_add',{message:err.errors[0].message,role:req.session.login.role});
  })
})
router.get('/edit/:id',(req,res)=>{
  models.Users.findOne({where:{id:req.params.id}})
  .then(users=>{
    res.render('users_edit', {user:users,message:'',role:req.session.login.role});
  })
})
router.post('/edit/:id',(req,res)=>{
  // console.log(req.params.id)
  models.Users.update(req.body,{where:{id:req.params.id},validate:false})
  .then(users=>{
    res.redirect('/users');
  })
  .catch(err=>{
    models.Users.findOne({where:{id:req.params.id}})
    .then(users=>{
      res.render('users_edit',{user:users,message:err.errors[0].message,role:req.session.login.role})
    })
  })
})
router.get('/delete/:id',(req,res)=>{
  models.Users.destroy({where:{id:req.params.id}})
  .then(users=>{
    res.redirect('/users');
  })
})
module.exports=router
