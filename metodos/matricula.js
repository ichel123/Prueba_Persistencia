const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/persistencia");
const {agregarDato} = require("./funciones/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/consulta");
const requestOk = 200;
const requestFailed = 400;
const rutaMatr = "./archivos/matriculas.json";
const atrMatr = ["estudiante","curso","notas","notaFinal"]
const atrMatrO = ["estudiante","curso","notas"]


let matriculas;

router.use(function (req, res, next) {
    if(matriculas == null){matriculas = cargar(rutaMatr)}
    next();
})

//Obtener matriculas
router.get('/', (request, response) => {
    response.send(matriculas);
})

//Obtener matricula
router.get('/consulta', (request, response) => {
    response.send(consultarDatos(matriculas,request.body,atrMatr));
})


//Agregar matricula
router.post('/',(request,response) => {
    let existe = false;
    //comprobacion de que el codigo no este repetido
    matriculas.forEach(matricula => {
        if(matricula.estudiante == request.body.estudiante) {
            response.status(requestFailed).end();
            existe = true;
            return;
        }
    });
    if(existe) {
        return;
    }
    //agreagar dato
    if(agregarDato(matriculas,crearMatr(request.body),atrMatr)){
        console.log("200");
        response.status(requestOk).end();
    }
    guardar(matriculas,rutaMatr);
    response.status(requestFailed).end();
})

function crearMatr(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrMatrO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrMatrO.includes(key) || cuerpoPet[key] == null) return {};
    }

    return {
        "estudiante" : cuerpoPet.estudiante,
        "curso" : cuerpoPet.curso,
        "notas" : cuerpoPet.notas,
        "notaFinal" : 0
    }
}

module.exports = router