const express = require('express');
const router = express.Router();
const persist = require("../persistencia").persist;
const requestOk = 200;
const requestFailed = 400;

let persistencia = new persist(["nombres","apellidos","codigo"],"./archivos/estudiantes.json");

//Obtener estudiantes
router.get('/', (request, response) => {
    response.send(persistencia.obtenerDatos());
})

//Obtener estudiante
router.post('/', (request, response) => {
    response.send(persistencia.obtenerDato(request.body));
})

//Eliminar estudiante
router.post('/eliminar', (request, response) => {
    response.status(persistencia.eliminarDatos(request.body)).end();
})

//Agregar estudiante
router.post('/agregar',(request,response) => {
    //cuerpo de la peticion
    let cuerpoPet = request.body;

    //comprobar que esten todos los datos
    if(!persistencia.comprobarAtr(cuerpoPet)) {
        response.status(requestFailed).end();
        return;
    }

    //comprobacion de que el codigo no este repetido
    let estudiantes = persistencia.obtenerDatos();
    let existe = false;
    estudiantes.forEach(estudiante => {
        if(estudiante.codigo == cuerpoPet.codigo) existe = true;
    });

    console.log(!existe);
    //agreagar dato
    let responseStatus = (!existe)? persistencia.agregarDatos(cuerpoPet) : requestFailed;

    response.status(responseStatus).end();
})


module.exports = router