const PostModels = require("./../models/postModels")

let addPost = async (title, avatar, short_detail, detail) => {
    let item = {
        title: title,
        avatar: avatar,
        short_detail: short_detail,
        detail: detail
    }
    await PostModels.createNew(item)
}
let editPost = async (id,title, avatar, short_detail, detail) => {
    let item = {
        title: title,
        avatar: avatar,
        short_detail: short_detail,
        detail: detail
    }
    await PostModels.updateUser(id,item)
}

module.exports = {
    addPost: addPost,
    editPost: editPost
}