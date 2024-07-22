var express = require('express');
var router = express.Router();
var upload = require('../ulity/upload');
var sendMail = require('../ulity/sendMail');

var modelProduct = require('../models/productModel');
var modelUser = require('../models/userModel');
var modelBrand = require('../models/brandModel');
var modelCategory = require('../models/categoryModel');
var modelOrder = require('../models/orderModel');


/* GET home page. */

router.get('/:id', async function(req, res, next) {
  try{
    var id = req.params.id;
    var data = await modelOrder.find({"id_user":id});
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});


router.get('/:id/orderDetails', async function(req, res, next) {
  try{
    var id = req.params.id;
    var data = await modelOrder.findById(id);
    res.json(data.orderDetail)

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});



router.post('/add_orders', async function(req, res, next) {
  try{
    const {id_user,address, total, orderDetail}= req.body;
    const newOrder = {
      id_user,
      address,
      status: 'wait',
      total,
      orderDetail
    }
    const orders = await modelOrder.create(newOrder)

    if (!orders) {
      return res.status(404).json({ message: 'Không có gọi món' });
    }
    
    const newOrderDetail = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      }

    // res.json(orders.orderDetail)
      
    orders.orderDetail.push(newOrderDetail);
    await orders.save()
    res.json({status: 1, orders})

  }catch (error) {
    res.status(500).json({ message: error.message }); // Trả về lỗi nếu có lỗi xảy ra
  }
});



module.exports = router;
