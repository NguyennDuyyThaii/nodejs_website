const mongoose = require("mongoose")

let Schema = mongoose.Schema

let ProductSchema = new Schema({
    name: String,
    avatar: {type: Array, default: null},
    detail: String,
    price: {type: Number},
    sale_price: {type: Number},
    cate_id: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    images: {type: Array, default: null},
    qtySeller: Number,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
}, {
    toJSON: {virtuals: true}
})
mongoose.set('useCreateIndex', true);
ProductSchema.index({ name: 'text' })
ProductSchema.virtual("categories", {
    ref: "category",
    localField: "cate_id",
    foreignField: "_id"
})
ProductSchema.statics = {
    listAll() {
        return this.find().populate("categories").exec()
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
    findProductById(id) {
        return this.findById(id).exec()
    },
    // update theo id
    updateProduct(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    }

}
module.exports = mongoose.model("product", ProductSchema)