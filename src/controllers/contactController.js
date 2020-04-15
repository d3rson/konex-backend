const Contact = require('../models/contact');

module.exports = {
    async cadastrar (req, res) {
        try{
            const {name, lastname} = req.body;
            const contact = await Contact.create({name, lastname});
            
            await contact.save();
            console.log({contact});
            //return res.send({contact});

        } catch (err){
            console.log(err);
            return res.status(400).send({Erro: 'Erro ao cadastrar contato;'})
        }
    }
}