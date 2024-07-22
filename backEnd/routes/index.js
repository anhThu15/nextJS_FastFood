var express = require('express');
var router = express.Router();

var modelProduct = require('../models/productModel');
var modelUser = require('../models/userModel');
var modelBrand = require('../models/brandModel');
var modelCategory = require('../models/categoryModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang Chủ' });
});
// router.get('/product', function(req, res, next) {
//   res.render('page_product', { title: 'Trang Thực Đơn' });
// });

router.get('/product', async function(req, res, next) {
  try{
    var type = req.query.type;
    var data = await modelProduct.find({"type": type});
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/products/:type/:brandID', async function(req, res, next) {
  try{
    var {type,brandID} = req.params;
    var data = await modelProduct.find({"type": type,"brandId":brandID});
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/product_detail/:id', async function(req, res, next) {
  try{
    var id = req.params.id;
    var data = await modelProduct.findById(id).populate('categoryId', 'name').populate('brandId', 'name');;
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});


router.get('/search/:q', async function(req, res, next) {
  try{
    var {q} = req.params;
    var data = await modelProduct.find({"name": new RegExp(q, 'i')});
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/random', async function(req, res, next) {
  try{
      var data = await modelProduct.aggregate([{ $sample: { size: 4 } }]);
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

router.get('/map', function(req, res, next) {
  res.render('page_map', { title: 'Trang Địa Chỉ' });
});
router.get('/cart', function(req, res, next) {
  res.render('page_cart', { title: 'Trang Giỏ Hàng' });
});
router.get('/deal', function(req, res, next) {
  res.render('page_deal', { title: 'Trang Giỏ Hàng' });
});




module.exports = router;
