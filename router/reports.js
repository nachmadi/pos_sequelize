let express =require('express');
let router = express.Router();

let models = require('../models');
var utility = require('../helper/util.js');

//
// router.use(function (req, res, next) {
//   if ((req.session)&&(req.session.login)) {
//       next();
//   } else {
//       res.redirect('/login') // arahkan login
//   }
// })

router.get('/',(req, res)=>{
    res.render('report');
});


router.get('/iserttransaksi',(req, res)=>{
   models.Transaksis.create({
     trans_tgl: utility.GetFormattedDate(),
     trans_total: 10,
     UsersId : 2
   })
   .then(result=>{
     console.log(result.id);
      models.Transaksis.findAll()
      .then(hasil=>{
           res.send(hasil);
      })
   })
   .catch(error=> {
      res.send(error);
   });
});

router.get('/insertdetil',(req, res)=>{
   models.Detils.create({
     harga: 1500,
     jml_beli: 2,
     sub_total: 3000,
     TransaksisId: 1,
     BarangsId: 3
   })
   .then(result=>{
      models.Detils.findAll()
      .then(hasil=>{
           res.send(hasil);
      })
   })
   .catch(error=> {
      res.send(error);
   });
});

router.get('/lt',(req, res)=>{
   models.Transaksis.findAll({include:[{model:models.Users},{
      // through akan menghasilkan query INNER JOIN
       model: models.Barangs
       ,
       through:'Detils'
   }]})
  .then(hasil=>{
       res.send({reportTrans:hasil});
  })
   .catch(error=> {
      res.send(error);
   });
});

router.get('/ld',(req, res)=>{
   models.Detils.findAll({
     where:{BarangId:3},
     include: [{model: models.Transaksis, include:[{model : models.Users}]}, {model:models.Barangs}]
   })
  .then(hasil=>{
       res.send(hasil);
  })
   .catch(error=> {
      res.send(error);
   });
});

router.get('/lu',(req, res)=>{
   models.Users.findAll({
     include:[{
        // menghasilkan query LEFT OUTER JOIN
        model: models.Transaksis
        ,
        include:[{
           // through akan menghasilkan query INNER JOIN
            model: models.Barangs
            ,
            through:'Detils'
        }]
     }]
   })
  .then(hasil=>{
       res.send(hasil);
       //res.render('lap_customer',{reportCus:hasil});
  })
   .catch(error=> {
      res.send(error);
   });
});

router.get('/lb',(req, res)=>{
   models.Barangs.findAll({
         include:[{
           // through akan menghasilkan query INNER JOIN
            model: models.Transaksis
            ,
            through:'Detils'
        }]
   })
  .then(hasil=>{
       //res.render('lap_barang',{reportBrg:hasil});
       res.send({reportBrg:hasil});
  })
   .catch(error=> {
      res.send(error);
   });
});

router.post('/lb',(req, res)=>{
   //let jnsLaporan = req.body.cmb_JnsTrans;
   //let bulan = req.body.cmbBln;
   //let tahun = req.body.cmbThn;

   if(req.body.cmb_JnsTrans==1){
     models.Users.findAll({
       include:[{
          // menghasilkan query LEFT OUTER JOIN
          model: models.Transaksis
          ,
          include:[{
             // through akan menghasilkan query INNER JOIN
              model: models.Barangs
              ,
              through:'Detils'
          }]
       }]
     })
    .then(hasil=>{
          // res.send(hasil);
         res.render('lap_customer',{reportCus:hasil});
    })
     .catch(error=> {
        res.send(error);
     });
   }else if(req.body.cmb_JnsTrans==2){
       models.Barangs.findAll({
             include:[{
               // through akan menghasilkan query INNER JOIN
                model: models.Transaksis
                ,
                through:'Detils'
            }]
       })
      .then(hasil=>{
           res.render('lap_barang',{reportBrg:hasil});
           //res.send({reportBrg:hasil});
      })
       .catch(error=> {
          res.send(error);
       });
    } else if(req.body.cmb_JnsTrans==3){
      models.Transaksis.findAll({include:[{model:models.Users},{
         // through akan menghasilkan query INNER JOIN
          model: models.Barangs
          ,
          through:'Detils'
      }]})
      .then(hasil=>{
          res.render('lap_transaksi',{reportTrans:hasil});
      })
      .catch(error=> {
         res.send(error);
      });
    }
});



router.get('/lbg',(req, res)=>{
   models.Barangs.findAll({
          attributes: [
             "Barangs.harga",
             "Barangs.nama_barang"
        //     ,
        //    [ models.sequelize.fn('count', models.sequelize.literal('*')), 'cnt' ],
        //    [ models.sequelize.col('Barangs.id'), 'Id_Barang' ]
          ],
        //  where: { name: { $like: '%ooth%' } }
         include:[{
            //attributes:['Transakses.trans_tgl',[models.sequelize.fn('sum', models.sequelize.col('Transakses.Detils.jml_beli')), 'total']],
            attributes:[],
            // through akan menghasilkan query INNER JOIN
            model: models.Transaksis
            ,
            through:'Detils'
        }]
        ,
        group:'Barangs.id'
   })
  .then(hasil=>{
       res.send(hasil);
  })
   .catch(err=> {
     console.log(err);
     console.log(err.toString());
      res.send(err);
   });
});

module.exports = router;
