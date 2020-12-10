const userContactModel = require("../../models/userContactModels")
const {contactService} = require("./../../services/index")
const { transContact } = require("./../../../lang/vi")
const {validationResult} = require("express-validator/check")
let getContact = async (req, res) => {
    let userContact = await userContactModel.listAll()
    contact = JSON.parse(JSON.stringify(userContact))
    return res.render("admin/contact/contact", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý người liên hệ",
        contact: contact
    })
}
let getRemoveContact = async (req, res) => {
    let id = req.params.id
    await userContactModel.removeById({ _id: id })
    req.flash("success", transContact.deleteSuccess)
    return res.redirect("/contact")
}
let getAddContact = (req, res) => {
    return res.render("admin/contact/add_contact", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Thêm người liên hệ"
    })
}
let postAddContact = async (req, res) => {
    let errorArr = []
    let validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/contact/add")
    }
    try {
        await contactService.addContact(req.body.name,req.body.email,req.body.phone,req.body.address)
        req.flash("success", transContact.createSuccess)
        return res.redirect("/contact")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/contact/add")
    }
}
let getEditCategory = async (req, res) => {
    let id = req.params.id
    let user = await userContactModel.findItemById({ _id: id })
    user = JSON.parse(JSON.stringify(user))
    return res.render("admin/contact/edit_contact", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Sửa người liên hệ",
        user : user
    })
}
let postEditContact = async (req, res) => {
    let id = req.params.id
    let errorArr = []
    let validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect(`/contact/edit/${id}`)
    }
    try {
        await contactService.editContact(id,req.body.name,req.body.email,req.body.phone,req.body.address)
        req.flash("success", transContact.editSuccess)
        return res.redirect("/contact")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect(`/contact/edit/${id}`)
    }
}
module.exports = {
    getContact: getContact,
    getAddContact: getAddContact,
    getRemoveContact: getRemoveContact,
    postAddContact: postAddContact,
    getEditCategory: getEditCategory,
    postEditContact: postEditContact
}