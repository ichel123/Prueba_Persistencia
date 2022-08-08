const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/persistencia");
const {agregarDato} = require("./funciones/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/consulta");
const requestOk = 200;
const requestFailed = 400;
const rutaMatr = "./archivos/matriculas.json";
const atrMatr = ["estudiante","curso","notas","nota final"]
const atrMatrO = ["estudiante","curso","notas"]


let matriculas;

router.use(function (req, res, next) {
    if(matriculas == null){matriculas = cargar(rutaMatr)}
    next();
    guardar(matriculas,rutaMatr);
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
    //comprobacion de que el codigo no este repetido
    matriculas.forEach(matricula => {
        if(matricula.codigo == request.body.codigo) {
            response.status(requestFailed).end();
            return;
        }
    });
    
    //agreagar dato
    if(agregarDato(matriculas,crearMatr(request.body),atrMatr)){
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

function crearMatr(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrMatrO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrMatrO.includes(key) || cuerpoPet[key] == null) return {};
    }

    return {
        "estudiante" : cuerpoPet.nombres,
        "curso" : cuerpoPet.apellidos,
        "notas" : cuerpoPet.codigo,
        "nota final" : 0
    }
}

module.exports = router