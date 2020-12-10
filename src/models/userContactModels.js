const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserContactModel = new Schema({
    name: String,
    email: {type: String, trim:true},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    created_at: { type: Number, default: Date.now },
    deleted_at: { type: Number, default: null }
})
UserContactModel.statics = {
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
    },
    countItem(){
        return this.countDocuments({}).exec()
    }
}

module.exports = mongoose.model("userContact", UserContactModel)