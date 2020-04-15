const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"d0a8su2jd2md02ud28Jda783h", resave:false, saveUninitialized: true}));
app.use(routes);
app.listen(process.env.PORT || 3333);