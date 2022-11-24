const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const umedicoSchema = Schema({

    nome: String,
    email: String,
    senha : String
})

module.exports = mongoose.model("Umedico", umedicoSchema);