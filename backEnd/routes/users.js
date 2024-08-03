var express = require('express');
var router = express.Router();
var sendMail = require('../ulity/sendMail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const authen = require('../middleware/authen');

var modelProduct = require('../models/productModel');
var modelUser = require('../models/userModel');
var modelBrand = require('../models/brandModel');
var modelCategory = require('../models/categoryModel');

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  try{
    var {email, password} = req.body;
    const data = await modelUser.findOne({email});
    // console.log(data.password);
    if(!data){
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(password, data.password);

    if (!match) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    const token = jwt.sign({ email: data.email, permission_user: data.permission_user }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});


router.post('/sigin', async function(req, res, next) {
  try{
    var {name,email,phone,password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 
    
    const user = await modelUser.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }else{

      const newUser = modelUser({ 
        name, email, phone, password:hash, permission_user:'user'
      });

      await newUser.save()
  
      if(newUser != null){
          res.json({status: 1, message:"Thành công", user: newUser});
      }else{
          res.json({status: 0, message:"thất bại"});
      }
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});




router.post("/send-mail", async function(req, res, next){
  try{
    const {to, subject, content} = req.body;

    const mailOptions = {
      from: "anhThune <admin@thunta.com>",
      to: to,
      subject: subject,
      html: content
    };
    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công"});
  }catch(err){
    res.json({ status: 0, message: "Gửi mail thất bại"});
  }
});



module.exports = router;
