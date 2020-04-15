const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kontakto', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('conectado no banco...'))
.catch(err => console.log('Erro ao conectar...', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;