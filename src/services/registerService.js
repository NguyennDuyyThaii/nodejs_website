const UserModel = require("./../models/userModels")
const { Registererrors, Registersuccess, Registermailer } = require("./../../lang/vi")
const sendMail = require("./../config/mailer")
const bcrypt = require("bcrypt")
const uuidv4 = require("uuid/v4")

let saltRound = 7
let register = (email, password, gender, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        // kiểm tra xem email tạo đã tồn tại hay chưa
        let userByEmail = await UserModel.findByEmail(email)
        if (userByEmail) {
            // Kiểm tra tài khoản này đã xóa hay chưa
            if (userByEmail.deletedAt != null) {
                return reject(Registererrors.account_removed)
            }
            // Kiểm tra tài khoản đã active chưa
            if (!userByEmail.local.isActive) {
                return reject(Registererrors.account_not_active)
            }
            return reject(Registererrors.email_in_use)
        }

        // tạo 1 tài khoản mới
        let salt = bcrypt.genSaltSync(saltRound)
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            } 
        }
        let user = await UserModel.createNew(userItem)

        // send email to active account
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`
        sendMail(email, Registermailer.subject, Registermailer.template(linkVerify))
            .then(success => {
                resolve(Registersuccess.userCreated(user.local.email))
            })
            .catch( async (error) => {
                // xóa hết thông tin người dùng để khi người dùng clink lại không bị báo các
                // lôi ở bên trên
                await UserModel.removeById(user._id)
                console.log(error)
                reject(Registermailer.send_faild)
            })
       
    }) 

}
let verifyAccount = (token) => {
    return new Promise( async (resolve,reject) => {
        await UserModel.verify(token)
        resolve(Registersuccess.account_actived)
    })  
}
module.exports = {
    register: register,
    verifyAccount: verifyAccount
}