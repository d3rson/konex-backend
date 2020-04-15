const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ederson:dQqsP38AplJbO6z2@cluster0-bypua.mongodb.net/test?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('conectado no banco...'))
.catch(err => console.log('Erro ao conectar...', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;