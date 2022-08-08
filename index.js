const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const port = 3000;

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/estudiantes', require("./metodos/estudiante"));
app.use('/cursos', require("./metodos/curso"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 