const CategoryModel = require("./../models/categoryModel")
let addCategory = async (catename) => {
    let item = {
        cate_name: catename
    }
    await CategoryModel.createNew(item)
}
let editCategory = async (id, catename) => {
    let item = {
        cate_name: catename
    }
    await CategoryModel.updateItem(id, item)
}
module.exports = {
    addCategory: addCategory,
    editCategory: editCategory
}