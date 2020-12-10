const { validationResult } = require("express-validator/check")
const { registerService } = require("./../../services/index")
let getSignUp = (req, res) => {
    return res.render('admin/login-register/signUp', {
        errors: req.flash("errors"),
        success: req.flash("success")
    })
}

let postRegister = async (req, res) => {
    let errorArr = []
    let successArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/signup")
    }
    try {
        let createUser =  await registerService.register(req.body.email, req.body.password, req.body.gender, req.protocol, req.get("host"))
        successArr.push(createUser)
        req.flash("success", successArr)
        return res.redirect("/signup")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/signup")
    }
   
}

let verifyAccount = async (req,res) => {
    let errorArr = []
    let successArr = []
    try{
        let verifySuccess = await registerService.verifyAccount(req.params.token)
        successArr.push(verifySuccess)
        req.flash("success", successArr)
        return res.redirect("/signup")
    }catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/signup")
    }
}
module.exports = {
    getSignUp: getSignUp,
    postRegister: postRegister,
    verifyAccount: verifyAccount
}