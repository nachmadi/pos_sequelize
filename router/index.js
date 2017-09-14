let express =require('express');
let router = express.Router();
let models = require('../models');

router.get('/',(req,res)=>{
  models.Barangs.findAll()
  .then(barangs=>{
    // console.log(barangs); 
    res.render('index', {barang:barangs});
  })
})
module.exports = router;
