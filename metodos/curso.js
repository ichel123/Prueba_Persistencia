const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/persistencia");
const {agregarDato,eliminarDatos} = require("./funciones/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/consulta");
const requestOk = 200;
const requestFailed = 400;
const rutaCurs = "./archivos/cursos.json";
const atrCurs = ["nombre","tipo","creditos","nota grupal"]
const atrCursO = ["nombre","tipo","creditos"]

let cursos;

router.use(function (req, res, next) {
    if(cursos == null){cursos = cargar(rutaCurs)}
    next();
    // guardar(cursos,rutaCurs);
})

//Obtener cursos
router.get('/', (request, response) => {
    response.send(cursos);
})

//Obtener curso
router.post('/consulta', (request, response) => {
    console.log(request.body);
    response.send(consultarDatos(cursos,request.body,atrCurs));
})

//Eliminar curso
router.delete('/', (request, response) => {
    listaModificada = eliminarDatos(cursos,request.body,atrCurs);
    if(listaModificada != []){
        cursos = listaModificada;
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

//Agregar curso
router.post('/',(request,response) => {
    //comprobacion de que el nombre no este repetido
    cursos.forEach(curso => {
        if(curso.nombre == request.body.nombre) {
            response.status(requestFailed).end();
            return;
        }
    });
    
    //agreagar dato
    if(agregarDato(cursos,crearCurs(request.body),atrCurs)){
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

//Modificar curso
router.put('/', (request, response) => {
    
    valores = Object.values(request.body)
    remplazado = valores.shift()
    remplazo = valores.shift()
    listaModificada = modificarDatos(cursos, remplazado, remplazo, atrEst);
    if(listaModificada != []){
        cursos = listaModificada;
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

function crearCurs(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrEstO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrEstO.includes(key) || cuerpoPet[key] == null) return {};
    }

    return {
        "nombre" : cuerpoPet.nombre,
        "tipo" : cuerpoPet.tipo,
        "creditos" : cuerpoPet.creditos,
        "nota grupal" : 0
    }
}

module.exports = router