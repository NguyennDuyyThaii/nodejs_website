const multer = require("multer")
const util = require("util")
const {transUploadImage} = require("./../../lang/vi")
const uuid = require("uuid/v4")
let storage = multer.diskStorage({
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
}).array("avatar", 17)
// util.promisify để bên controller or service có thể dùng async-await
let uploadMultipleFileMiddleware = util.promisify(uploadMultipleFile)

module.exports = uploadMultipleFileMiddleware
