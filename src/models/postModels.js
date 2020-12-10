const mongoose = require("mongoose")

let Schema = mongoose.Schema

let PostSchema = new Schema({
    title: {type: String, default: null},
    avatar: {type: String, default: null},
    short_detail: String,
    detail: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
})
PostSchema.statics = {
    listAll() {
        return this.find().exec()
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
module.exports = mongoose.model("post", PostSchema)