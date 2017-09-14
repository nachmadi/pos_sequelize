var express=require('express');
var router=new express.Router();
var models=require('../models');
var utility = require('../helper/util.js');
router.post('/',(req,res)=>{
  models.Users.findOne({where:{id:req.session.login.userId}})
  .then(users=>{
    let total=parseInt(req.body.total)
    let deposito=users.deposito;
    if(total<=1000){
      res.send('minimum belanja Rp. 1000');
    }else{
        if((deposito-total)<=1000){
          res.send('Saldo anda tidak cukup');
        }else{
          let transaksi={
            trans_tgl:utility.GetFormattedDate(),
            trans_total:req.body.total,
            UsersId:req.session.login.userId
          }
          models.Transaksis.create(transaksi)
          .then(trx=>{
            let TrxId=trx.id;
            models.Item.findAll()
            .then(items=>{
              let c=0;
              items.forEach(item=>{
                let temp={
                  harga:item.harga,
                  jml_beli:item.jml_beli,
                  sub_total:item.sub_total,
                  TransaksisId:TrxId,
                  BarangsId:item.BarangId
                }
                models.Detils.create(temp)
                .then(insert=>{
                  models.Barangs.findOne({where:{id:item.BarangId}})
                  .then(barang=>{
                    let oldStok=barang.stok;
                    let newStok=oldStok-item.jml_beli;
                    let dataStok={
                      stok:newStok
                    }
                    models.Barangs.update(dataStok,{where:{id:item.BarangId}})
                    .then(upd=>{
                      if(c>=items.length){
                        models.Item.destroy({where: {},truncate: true})
                        res.redirect('/')
                      }
                    })
                  })
                })
                c++;
              })
            })
          })
        }
    }
  })
  .catch(err=>{
    console.log(err)
  })
});
module.exports=router
