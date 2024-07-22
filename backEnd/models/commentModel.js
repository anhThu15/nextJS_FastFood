const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const binhLuan = new Schema({
    id: { type: ObjectId }, // khóa chính
    date: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    description: {
        type: String,
        required: true
    },
    id_product:{
        type: String,
        required:true
    },
    id_user:{
        type: String,
        required:true
    }

});
module.exports = mongoose.models.commnent || mongoose.model('comment', binhLuan);
