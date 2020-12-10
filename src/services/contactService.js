const ContactModel = require("./../models/userContactModels")
let addContact = async (name, email, phone, address) => {
    let item = {
        name: name,
        email: email,
        phone: phone,
        address: address
    }
    await ContactModel.createNew(item)
}
let editContact = async (id, name, email, phone, address) => {
    let item = {
        name: name,
        email: email,
        phone: phone,
        address: address
    }
    await ContactModel.updateItem(id, item)
}
module.exports = {
    addContact: addContact,
    editContact: editContact
}