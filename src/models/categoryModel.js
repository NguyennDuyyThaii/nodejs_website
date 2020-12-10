const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategoryModel = new Schema({
    cate_name: String,
    created_at: { type: Number, default: Date.now },
    deleted_at: { type: Number, default: null }
})

CategoryModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find().exec()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    },
    findItemById(id){
        return this.findById(id).exec()
    },
    updateItem(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    }
}

module.exports = mongoose.model("category", CategoryModel)