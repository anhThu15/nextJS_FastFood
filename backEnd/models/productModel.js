const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const sanPham = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    hot:{
        type:Boolean,
        required:true
    },
    brandId: {
        type: ObjectId,
        ref:'brand',
        required: true
    },
    categoryId: {
        type: ObjectId,
        ref:'category', 
        required: true
    }

});
module.exports = mongoose.models.product || mongoose.model('product', sanPham);
