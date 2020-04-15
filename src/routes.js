const express = require('express');
const routes = express.Router();

const Contact = require('./models/contactModel');
const User = require('./models/userModel');

routes.get('/', function(req, res, next){
    console.log('login');
});

routes.post("/login", function(req, res){
    try{
        const username = req.body.username;
        const password = req.body.password;
       
        User.findOne({username: username, password: password}, function(err, user){
            if (err){
                console.log(err);
                return res.status(500).send();
            }
            if(!user){
                return res.status(404).json({error: 'Usuário/Senha inválido ou desconhecido!'});
            }
            req.session.user = user;
            return res.status(200).json(user.firstname);
        })

    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao cadastrar usuário!'})
    }
});

// routes.get('/dashboard', function(req, res){
//     if(!req.session.user){
//         return res.status(401).send();
//     }
//     return res.status(200).send('Bem vindo ao seu Gerenciador de Contatos');
// })

routes.post('/register', function(req, res){
    try{
        const username = req.body.username;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;

        const newuser = new User();
        newuser.username = username;
        newuser.password = password;
        newuser.firstname = firstname;
        newuser.lastname = lastname;

        newuser.save(function(err, savedUser){
            if (err){
                console.log(err);
                return res.status(500).send();
            }
            return res.status(200).send();
        });

    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao cadastrar usuário!'})
    }
})

routes.post('/new', async (req, res) => {
    try{
        const {name, lastname, phones, emails, addresses, username} = req.body;
        //const username = req.headers.authorization;
        const contact = await Contact.create({name, lastname, phones, emails, addresses, username});

        await contact.save();
        return res.send({contact});

    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao cadastrar contato!'})
    }
});

routes.get('/contacts', async(req, res) =>{
    const user = req.headers.authorization;
    try{
        const contact = await Contact.find({username: user});
        return res.send({contact});
    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao localizar contatos!'})
    }
});

routes.get('/contacts/:id', async(req, res) =>{
    const user = req.headers.authorization;
    try{
        const {id} = req.params;
        const contact = await Contact.find({_id: id});
        return res.send({contact});
    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao localizar contatos!'})
    }
});

routes.delete('/contacts/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        await Contact.findOneAndRemove({_id: id})
        return res.status(204).send();
    } catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao deletar o contato!'})
    }
});

routes.put('/contacts/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
        return res.status(201).send(contact);
    }catch (err){
        console.log(err);
        return res.status(400).send({Erro: 'Erro ao editar o contato!'})
    }
});

module.exports = routes;