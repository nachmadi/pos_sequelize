let express =require('express');
let router = express.Router();

let models = require('../models');


router.use(function (req, res, next) {
  if ((req.session)&&(req.session.login)) {
      next();
  } else {
      res.redirect('/login') // arahkan login
  }
})

router.get('/',(req, res)=>{
   models.Barangs.all()
      .then(allBarangs => {
       //res.send({students:allStudents});
      res.render('barangs',{barangs:allBarangs});
    })

});

router.get('/add',(req, res)=>{
    res.render('barangs_Add',{err:false});
})

router.post('/add',(req, res)=>{
   models.Barangs.create({
     nama_barang: req.body.nama_barang,
     satuan: req.body.satuan,
     harga: req.body.harga,
     stock: req.body.stock
   })
   .then(result=>{
       res.redirect('/barangs/add');
   })
   .catch(error=> {
      res.render('student_Add',{error: error.errors[0].message,err:true});
   });
});

router.get('/delete/:id',(req, res)=>{
  models.Barangs.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result=>{
      res.redirect('/barangs');
  })
  .catch(error=> {
      res.send({error:error.stack});
  });
})

router.get('/edit/:id',(req, res)=>{
  models.Barangs.findOne({
      where: {id: req.params.id}
  })
  .then(barang => {
      res.render('barangs_Edit',{barang:barang});
  })
})

router.post('/edit/:id',(req, res)=>{
  models.Barangs.update({
    nama_barang: req.body.nama_barang,
    satuan: req.body.satuan,
    harga: req.body.harga,
    stock: req.body.stock},
    {where: { id: req.params.id} }
  )
  .then(result=>{
    res.redirect('/barangs');
  })
  .catch(err=>{
    res.send({error:error.stack});
  })
})

module.exports = router;
