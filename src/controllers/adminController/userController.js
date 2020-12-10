const { validationResult } = require("express-validator/check")
const UserModel = require("./../../models/userModels")
const {userService} = require("./../../services/index")


let getUser = async (req,res) => {
    let user = await UserModel.find()
    user = JSON.parse(JSON.stringify(user))
    return res.render("admin/user/user", {
        success: req.flash("success"),
        data: {user: user},
        title: "Quản lý tài khoản"
    })
}
let removeUser = async (req,res) => {
    const id = req.params.id
    await UserModel.removeById({_id: id})
    res.redirect('/user')
    req.flash("success", transUser.deleteSuccess)
}
let getEdit = async (req,res) => {
    let id = req.params.id
    let user = await UserModel.findUserById({_id: id})
    return res.render("admin/user/edit-user", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        data: {user: user},
        title: "Sửa tài khoản"
    })
}

module.exports = {
    getUser: getUser,
    removeUser: removeUser,
    getEdit: getEdit
}