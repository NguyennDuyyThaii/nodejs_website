let getSignIn = async(req, res) => {
    return res.render("admin/login-register/signIn", {
        success: req.flash("success"),
        errors: req.flash("errors")
    })
}


module.exports = {
    getSignIn: getSignIn
}