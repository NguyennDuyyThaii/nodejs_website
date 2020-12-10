const multer = require("multer")
const {transUploadImage} = require("./../../../lang/vi")
const uuid = require("uuid/v4")
let storage = multer.diskStorage({
    destination: (req,res,callback) => {
        let dir = "./src/public/images/product/imagess"
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

let uploadMultipleFile = multer({
    storage: storage
}).array("images", 17)

let uploadMultipleFileMiddlewareProduct = (req,res,next) => {
    uploadMultipleFile(req,res, (err) => {
        req.uploadErrors = err
        next()
    })
}

module.exports = uploadMultipleFileMiddlewareProduct

