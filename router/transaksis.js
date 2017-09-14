var express=require('express');
var router=new express.Router();
var models=require('../models');

router.post('/',(req,res)=>{
  res.send(req.body);
  console.log(req.body)
})
module.exports=router
