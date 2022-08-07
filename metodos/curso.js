const express = require('express');
const router = express.Router();
const persist = require("../persistencia").persist;
const requestFailed = 400;

let persistencia = new persist(["nombre","tipo","creditos"],"./archivos/cursos.json");

//Obtener cursos
router.get('/', (request, response) => {
    response.send(persistencia.obtenerDatos());
})

//Obtener curso
router.post('/', (request, response) => {
    response.send(persistencia.obtenerDato(request.body));
})

//Eliminar curso
router.post('/eliminar', (request, response) => {
    response.status(persistencia.eliminarDatos(request.body)).end();
})

//Agregar curso
router.post('/agregar',(request,response) => {
    //cuerpo de la peticion
    let cuerpoPet = request.body;

    //comprobar que esten todos los datos
    if(persistencia.comprobarAtr(request)) response.status(requestFailed).end();

    //comprobacion de que el nombre no este repetido
    let cursos = persistencia.obtenerDatos();
    let existe = false;
    cursos.forEach(curso => {
        if(curso.nombre == cuerpoPet.nombre) existe = true;
    });

    //agreagar dato
    let responseStatus = (!existe)? persistencia.agregarDatos(cuerpoPet) : requestFailed;
    response.status(responseStatus).end();
})


module.exports = router