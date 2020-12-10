const mongoose = require("mongoose")

let Schema = mongoose.Schema

let SlideshowSchema = new Schema({
    avatar: {type: String, default: null},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
})
SlideshowSchema.statics = {
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
    findSlideshowById(id) {
        return this.findById(id).exec()
    },
    // update theo id
    updateSlideshow(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    }

}
module.exports = mongoose.model("slideshow", SlideshowSchema)