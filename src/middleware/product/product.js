const multer = require("multer")
const {transUploadImage} = require("./../../../lang/vi")
const uuid = require("uuid/v4")
let storage = multer.diskStorage({
    destination: (req,res,callback) => {
        let dir = "./src/public/images/product/avatar"
        callback(null, dir)
    },
    filename: (req,file,callback) => {
        let math = ["image/png","image/jpeg","image/jpg"]
        if(math.indexOf(file.mimetype) === -1){
            return callback(transUploadImage.type_of_image, null)
        }

        let filename = `${Date.now()}-${uuid()}-${file.originalname}`
        callback(null,filename)
    }
})

let uploadFile = multer({
    storage: storage
}).single("avatar")
// util.promisify để bên controller or service có thể dùng async-await
let uploadFileMiddleware = (req,res,next) => {
    uploadFile(req,res, (err) => {
        req.uploadError = err
        next()
    })
}

module.exports = uploadFileMiddleware