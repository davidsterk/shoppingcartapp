const express = require('express');
const cors = require('cors')
const app = express();
const {expressPort, frontendServer} = require("./config/project_env");

app.use(cors({
  origin: [`${frontendServer}`],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(expressPort, function(){
  console.log(`http://localhost:${expressPort}`);
});

