const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/persistencia");
const {agregarDato, eliminarDatos, modificarDatos} = require("./funciones/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/consulta");
const requestOk = 200;
const requestFailed = 400;
const rutaEst = "./archivos/estudiantes.json";
const atrEst = ["nombres","apellidos","codigo","promedio"]
const atrEstModf = ["nombres","apellidos"]
const atrEstO = ["nombres","apellidos","codigo"]


let estudiantes;

router.use(function (req, res, next) {
    if(estudiantes == null){estudiantes = cargar(rutaEst)}
    next();
})

//Obtener estudiantes
router.get('/', (request, response) => {
    response.send(estudiantes);
})

//Obtener estudiante
router.get('/consulta', (request, response) => {
    response.send(consultarDatos(estudiantes,request.body,atrEst));
})

//Eliminar estudiante
router.delete('/', (request, response) => {
    listaModificada = eliminarDatos(estudiantes,request.body,atrEst);
    if(listaModificada != []){
        estudiantes = listaModificada;
        response.status(requestOk).end();
    }
    guardar(estudiantes,rutaEst);
    response.status(requestFailed).end();
})

//Agregar estudiante
router.post('/',(request,response) => {
    //comprobacion de que el codigo no este repetido
    estudiantes.forEach(estudiante => {
        if(estudiante.codigo == request.body.codigo) {
            response.status(requestFailed).end();
            return;
        }
    });
    
    //agreagar dato
    if(agregarDato(estudiantes,crearEst(request.body),atrEst)){
        response.status(requestOk).end();
    }
    guardar(estudiantes,rutaEst);
    response.status(requestFailed).end();
})

//Modificar estudiante
router.put('/', (request, response) => {
    
    valores = Object.values(request.body)
    remplazado = valores.shift()
    remplazo = valores.shift()
    listaModificada = modificarDatos(estudiantes, remplazado, remplazo, atrEst);
    if(listaModificada != []){
        estudiantes = listaModificada;
        response.status(requestOk).end();
    }
    guardar(estudiantes,rutaEst);
    response.status(requestFailed).end();
})


function crearEst(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrEstO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrEstO.includes(key) || cuerpoPet[key] == null) return {};
    }

    return {
        "nombres" : cuerpoPet.nombres,
        "apellidos" : cuerpoPet.apellidos,
        "codigo" : cuerpoPet.codigo,
        "promedio" : 0
    }
}

module.exports = router