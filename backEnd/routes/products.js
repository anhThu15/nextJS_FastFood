var express = require('express');
var router = express.Router();
var upload = require('../ulity/upload');
var sendMail = require('../ulity/sendMail');

var modelProduct = require('../models/productModel');
var modelUser = require('../models/userModel');
var modelBrand = require('../models/brandModel');
var modelCategory = require('../models/categoryModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    var data = await modelProduct.find();
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/detail', function(req, res, next) {
  res.render('product_detail', { title: 'Trang chi tiết sản phẩm' });
});

router.get('/orders/:id', async function(req, res, next) {
  try{
    var id = req.params.id;
    var data = await modelUser.findById(id);
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/range/:x/:y', async function(req, res, next) {
  try{
    var {x,y} = req.params;
    var data = await modelProduct.find({"price":  { $gte: Number(x), $lte: Number(y) }});
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/productByCate/:id', async function(req, res, next) {
  try{
    var {id} = req.params;
    var data = await modelProduct.find({"categoryId": id });
  }catch(e){
    res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/hot', async function(req, res, next) {
  try{
    var data = await modelProduct.find({"hot": true });
  }catch(e){
    res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

module.exports = router;
