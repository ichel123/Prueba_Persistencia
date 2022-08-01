const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const port = 3000;
const fs = require('fs');

const fileMatriculas = "matriculas.json";
const fileEstudiantes = "user.json";
const fileCursos = "cursos.json";

const requestOk = 200;
const requestFailed = 400;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Obtener matriculas
app.get('/matriculas', (request, response) => {
  response.send(obtenerDatos(fileMatriculas))
})

//Obtener estudiantes
app.get('/estudiantes', (request, response) => {
  response.send(obtenerDatos(fileEstudiantes))
})

//Obtener cursos
app.get('/cursos', (request, response) => {
  response.send(obtenerDatos(fileCursos));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 

router.post('/estudiantes/agregar',(request,response) => {
  let responseStatus = agregarDatos(request.body, fileEstudiantes);
  response.status(responseStatus).end();
});

app.use('/', router);


function obtenerDatos(file){
  let data = fs.readFileSync(file);
  let myObject = JSON.parse(data);
  return myObject;
}

function agregarDatos(request, file){
  let myObject = obtenerDatos(file);
  let existe = false;
  for(let i=0; i<myObject.length; i++){
    if(myObject[i].codigo === request.codigo){
      existe = true;
    }
  }
  if(!existe){
    let dataAdd = {
      "id": myObject[myObject.length - 1].id + 1,
      "nombres": request.nombres,
      "apellidos": request.apellidos,
      "codigo": request.codigo
    }
    myObject.push(dataAdd);
    const data = JSON.stringify(myObject);
    writeJson(data, file);
    console.log(data);
    return requestOk;
  }
  else {
    return requestFailed;
  }
}

function writeJson(data, file) {
  fs.writeFile(file, data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
}

