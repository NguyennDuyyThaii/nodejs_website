const mongoose = require("mongoose")

const Schema = mongoose.Schema

let invoiceSchema = new Schema({
    name_user: String,
    email: {type: String, trim: true},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    total_price: String,
    date_of_sale: {type: Number, default: Date.now},
    product_detail: {},
    status: {type: String, default: 'Đang chuyển hàng'}
})
invoiceSchema.statics = {
    listAll(){
        return this.find()
    },
    countItem(){
        return this.countDocuments({}).exec()
    },
    updateInvoices(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    }
}
module.exports = mongoose.model("invoice", invoiceSchema)