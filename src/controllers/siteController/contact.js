
const {contactService} = require("./../../services/index")
const { transContact } = require("./../../../lang/vi")
const {validationResult} = require("express-validator/check")

let postContact = async (req,res) => {
    let errorArr = []
    let validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/getContact")
    }
    try {
        await contactService.addContact(req.body.name,req.body.email,req.body.phone,req.body.address)
        req.flash("success", transContact.createSuccess)
        return res.redirect("/getContact")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/getContact")
    }
}

module.exports = {
    postContact: postContact
}