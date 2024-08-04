const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // smtp có thể thay đổi theo trình duyệt
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'thuntaps35657@fpt.edu.vn',
      pass: 'twexabfkdeltenvg'
    }
  });

// sử dụng pass ứng dụng khi upload lên server sau nhé
  
module.exports = { transporter };