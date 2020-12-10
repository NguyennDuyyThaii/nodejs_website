
let getSignIn = async (req,res) => {
    return res.render("admin/login-register/signIn", {
        success: req.flash("success")
    })
}


module.exports = {
    getSignIn: getSignIn
}