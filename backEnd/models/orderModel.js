const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const goiMon = new Schema({
    id: { type: ObjectId }, // khóa chính
    address: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    orderDetail:[
        {
            name: {type: String},
            price: {type: Number},
            quantity: {type:Number}
        }
    ],
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    id_user: {
        type: ObjectId,
        ref:'user', 
        required: true
    }
});
module.exports = mongoose.models.order|| mongoose.model('order', goiMon);
