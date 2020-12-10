const mongoose = require("mongoose")

let Schema = mongoose.Schema
let CommentSchema = new Schema({
    name: {type: String, default: null},
    email: {type: String, trim: true},
    content: String,
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
})
CommentSchema.virtual("products", {
    ref: "product",
    localField: "product_id",
    foreignField: "_id"
})
CommentSchema.statics = {
    listAll() {
        return this.find().populate("products").exec()
    },
    // create 1 user
    createNew(item){
        return this.create(item)
    },
    // xóa tài khoản theo cái id
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    // tim theo id
    findPostById(id) {
        return this.findById(id).exec()
    },
    // update theo id
    updateUser(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    }

}
module.exports = mongoose.model("comment", CommentSchema)