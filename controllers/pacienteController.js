// aqui ficam as funções

const PacienteModel = require("../models/PacienteModel");

class PacienteController{
   
    static async relatorio(req,res){
        const listaPacientes = await PacienteModel.find();
        res.render("paciente/relatorio", {listaPacientes});
    }


    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaPacientes = await PacienteModel.find();
        res.render("paciente/listar", {listaPacientes, salvo, removido});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.cpf;
        let paciente={};
        let escondido= ""
        if (cod){
         paciente = await PacienteModel.findOne({cpf: cod});
         escondido = "hidden";
        }
        
        res.render("paciente/cadastrar", {paciente, escondido});
    };
    // É as funções
    static async cadastrarPost(req, res){
        const paciente = req.body;
        //Quando clicka no atualizar
        if(paciente.id){
            await PacienteModel.findOneAndUpdate({cpf: paciente.cpf}, 
            {
                nome:paciente.nome,
                idade: paciente.idade
            
        });
            res.redirect("/paciente?s=3")

        } else{//cadastrar

            const novaPaciente = new PacienteModel({
            cpf: paciente.cpf,
            nome: paciente.nome,
            idade: paciente.idade
        });
        await novaPaciente.save();
        res.redirect("/paciente?s=1");
      }
    }

    static async detalhar(req, res){
        const cod = req.params.cpf;
        const resultado = await PacienteModel.findOne({cpf: cod});
        res.render("paciente/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.cpf;
        await PacienteModel.findOneAndDelete({cpf: cod});
        res.redirect("/paciente?r=1");
    };

}

module.exports = PacienteController;