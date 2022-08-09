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

//Obtener matricula
router.get('/mejorProm', (request, response) => {
    response.send(matriculas);
})

//Eliminar matricula
router.delete('/', (request, response) => {
    listaModificada = eliminarDatos(matriculas,request.body,atrMatrO);
    if(listaModificada != []){
        matriculas = listaModificada;
        response.status(requestOk).end();
    }
    guardar(cursos,rutaCurs);
    response.status(requestFailed).end();
})

//Agregar matricula
router.post('/',(request,response) => {
    let existe = false;
    //comprobacion de que el codigo no este repetido
    matriculas.forEach(matricula => {
        if((matricula.estudiante == request.body.estudiante) && (matricula.curso == request.body.curso)) {
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
    let notaFinal;
    if(cuerpoPet.notas.length ==3){
        notaFinal = cuerpoPet.notas[0]*0.35 + cuerpoPet.notas[1]*0.35 + cuerpoPet.notas[2]*0.30;
    }
    else{
        notaFinal = cuerpoPet.notas[0]*0.30 + cuerpoPet.notas[1]*0.25 + cuerpoPet.notas[2]*0.20 + cuerpoPet.notas[3]*0.25;
    }
    console.log("Notas: "+JSON.stringify(cuerpoPet.notas));
    return {
        "estudiante" : cuerpoPet.estudiante,
        "curso" : cuerpoPet.curso,
        "notas" : cuerpoPet.notas,
        "notaFinal" : notaFinal.toPrecision(3)
    }
}

module.exports = router