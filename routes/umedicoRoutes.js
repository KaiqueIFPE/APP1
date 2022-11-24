const express = require("express");
const routes = express.Router();


const umedicoController = require("../controllers/umedicoController");
const auth = require("../middlewares/umedicoAuth");

routes.get("/umedico/relatorio", auth, umedicoController.relatorio);
routes.get("/umedico/", auth, umedicoController.listar);
routes.get("/umedico/cadastrar/:email?", umedicoController.cadastrarGet);
routes.post("/umedico", umedicoController.cadastrarPost);
routes.get("/umedico/login",umedicoController.login);
routes.post("/umedico/login", umedicoController.loginpost);
routes.get("/umedico/remover/:email", auth, umedicoController.remover);
routes.get("/umedico/logout", auth, umedicoController.logout);
routes.get("/umedico/:email", auth, umedicoController.detalhar);



module.exports = routes;