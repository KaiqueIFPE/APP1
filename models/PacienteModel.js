const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pacienteSchema = Schema({
    cpf : Number,
    nome: String,
    idade : Number
})

module.exports = mongoose.model("Paciente", pacienteSchema);