const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const thuongHieu = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    img: {
        type: String,
        required: true
    }

});
module.exports = mongoose.models.brand || mongoose.model('brand', thuongHieu);
