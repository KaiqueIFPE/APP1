
const UmedicoModel = require("../models/UmedicoModel");
const bcryptjs = require ("bcryptjs");

class UmedicoController{

    static async relatorio(req,res){
        const listaUmedico = await UmedicoModel.find();
        res.render("umedico/relatorio", {listaUmedico});
    };

    
    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaUmedico = await UmedicoModel.find();
        res.render("umedico/listar", {listaUmedico, salvo, removido});
    };
    //Cadastrar Get serve para renderizar a página
    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro=req.query.e;
        let umedico={};
        let escondido= ""
        if (email){
         umedico = await UmedicoModel.findOne({email: email});
         escondido = "hidden";
        }
        
        res.render("umedico/cadastrar", {umedico, escondido, erro});
    }
    // É as funções
    static async cadastrarPost(req, res){
        const umedico = req.body;
        //atualização de
        if(umedico.id){
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(umedico.senha, salt);

            await UmedicoModel.findOneAndUpdate({email: umedico.email}, 
            {
                nome:umedico.nome,
                email: umedico.email,
                senha: hash
            
            });
            res.redirect("/umedico?s=3")
        } else{//cadastro

            const resultado = await UmedicoModel.findOne({email: umedico.email});
            if(resultado){
               
                res.redirect("/umedico/cadastrar?e=1");
            }

            else{

                const salt = bcryptjs.genSaltSync();
                const hash = bcryptjs.hashSync(umedico.senha, salt);

                const novoUmedico = new UmedicoModel({

                nome: umedico.nome,
                email:umedico.email,
                senha: hash
            });
            await novoUmedico.save();
            res.redirect("/umedico?s=1");
            }
        }
    }

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await UmedicoModel.findOne({email: email});
        res.render("umedico/detalhar", {resultado});
    };

    static async remover(req,res){
        const email = req.params.email;
        await UmedicoModel.findOneAndDelete({email: email});
        res.redirect("/umedico?r=1");
    };

    static async login(req,res){
        if(req.session.umedico){
            res.redirect("/");
        }else{
        const erro = req.query.e;
        res.render("umedico/login", ({erro}));

      }
    }

    static async loginpost(req,res){
        const umedico= req.body;
        const resultado = await UmedicoModel.findOne({email: umedico.email});
        if(resultado){//encontrou email
           if (bcryptjs.compareSync(umedico.senha, resultado.senha)){//senha confere
                req.session.umedico = resultado.email;
                res.redirect("/");
            }else{//senha incorreta
                res.redirect("/umedico/login?e=1");
            }
        
            
        }else{//email nao encontrado
            res.redirect("/umedico/login?e=1");
        }


    }

    static async logout(req,res){
        req.session.umedico =undefined;
        res.redirect("/umedico/login");

    }


  

}

module.exports = UmedicoController;