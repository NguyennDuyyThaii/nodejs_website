const Site = require("./siteController")
const checkContact = require ("./contact")
const checkComment = require("./comment")
module.exports = {
    Site:Site,
    checkContact: checkContact,
    checkComment: checkComment,
}