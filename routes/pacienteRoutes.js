const express = require("express");
const routes = express.Router();

const pacienteController = require("../controllers/pacienteController");
const auth = require("../middlewares/umedicoAuth");

routes.get("/paciente/",auth, pacienteController.listar);
routes.post("/paciente",auth, pacienteController.cadastrarPost);
routes.get("/paciente/cadastrar/:cpf?",auth, pacienteController.cadastrarGet);
routes.get("/paciente/relatorio",auth, pacienteController.relatorio);
routes.get("/paciente/:cpf",auth, pacienteController.detalhar);
routes.get("/paciente/remover/:cpf",auth, pacienteController.remover);

module.exports = routes;