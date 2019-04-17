
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const autoCompleteSchema = new Schema({
    text: String,
})

const AutoComplete = mongoose.model("AutoComplete", autoCompleteSchema, "autoCompletes")



module.exports = AutoComplete