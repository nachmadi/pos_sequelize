let express =require('express');
let router = express.Router();
let models = require('../models');

router.get('/',(req,res)=>{
  models.Barangs.findAll()
  .then(barangs=>{
      res.render('index', {barang:barangs,role:req.session.login.role});
  })
  .catch(err=>{
    console.log(err)
  })
})
router.get('/item/:id',(req,res)=>{
  models.Barangs.findOne({where:{id:req.params.id}})
  .then(barangs=>{
    let session=req.session.login;
    res.render('item', {barang:barangs,role:req.session.login.role});
  })
})
router.post('/item/:id',(req,res)=>{
  let sub_total=req.body.harga*req.body.jml_beli;
  let idTransaksi=1;
  let item={
    harga:req.body.harga,
    jml_beli:req.body.jml_beli,
    sub_total:sub_total,
    TransaksisId:idTransaksi,
    BarangId:req.params.id
  }
  models.Item.create(item)
  .then(item=>{
    res.redirect('/');
  })
})
router.get('/delete/:id',(req,res)=>{
  models.Item.destroy({where:{id:req.params.id}})
  .then(items=>{
    let sessions=req.session.login;
    res.redirect('/cart');
  })
})
router.get('/cart',(req,res)=>{
  models.Item.findAll({include:[{model:models.Barangs}]})
  .then(items=>{
    // res.send(items)
    if(Object.keys(items).length === 0){
      res.redirect('/')
    }else{
      let sessions=req.session.login;
      res.render('carts', {item:items,session:sessions,role:req.session.login.role});
    }
  })
  .catch(err=>{
    console.log(err)
  })
})
module.exports = router;
