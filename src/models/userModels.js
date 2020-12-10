const mongoose = require("mongoose")
const bcryt = require("bcrypt")

let Schema = mongoose.Schema

let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    avatar: {type: String, default: null},
    role: {type: String, default: 'user'},
    local: {
        email: {type: String, trim:true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
})
UserSchema.statics = {
    // create 1 user
    createNew(item){
        return this.create(item)
    },
    // check email user already exist
    findByEmail(email){
        return this.findOne({"local.email" : email}).exec()
    },
    // xóa tài khoản theo cái id
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    // token
    verify(token){
        return this.findOneAndUpdate(
            {"local.verifyToken": token},
            {"local.isActive": true, "local.verifyToken": null}
        )
    },
    // tim theo id
    findUserById(id) {
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
UserSchema.methods = {
    comparePassword(password){
        return bcryt.compare(password, this.local.password)
    }
}
module.exports = mongoose.model("user", UserSchema)