const express = require('express');
const router = express.Router();
const {agregarDato,eliminarDatos,modificarDatos} = require("./funciones/base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/base/consulta");
const funcMatr = require("./funciones/funcMatr");
const funcCurs = require("./funciones/funcCurs");
const requestOk = 200;
const requestFailed = 400;
const rutaCurs = "./archivos/cursos.json";
const atrCurs = ["nombre","tipo","creditos"]
const atrCursO = ["nombre","tipo","creditos"]
const atrCursModf = ["nombre","creditos"]

//let cursos = cagar(rutaCurs);

//console.log("3 "+funcMatr);

//Obtener cursos
router.get('/', (request, response) => {
    response.send(funcCurs.cursos);
})

//Obtener curso
router.post('/consulta', (request, response) => {
    response.send(consultarDatos(funcCurs.cursos,request.body,atrCurs));
})

//Eliminar curso
router.delete('/', (request, response) => {
    let cursosB = consultarDatos(funcCurs.cursos,request.body,atrCurs);
    let auxMatr = funcMatr.matriculas;
    cursosB.forEach(cursoB => {
        let matriculaB = {
            curso: cursoB.nombre
        }
        auxMatr = funcMatr.borrar(auxMatr,matriculaB);
        if(auxMatr == []) { 
            response.status(requestFailed).end();
            return;
        }
    });
    listaModificada = eliminarDatos(funcCurs.cursos,request.body,atrCurs);
    
    if(listaModificada != [] && auxMatr != []){
        funcCurs.cursos = listaModificada;
        funcMatr.matriculas = auxMatr;
        response.status(requestOk).end();
    }
    funcMatr.guardar()
    funcCurs.guardar();
    response.status(requestFailed).end();
})

//Agregar curso
router.post('/',(request,response) => {
    //comprobacion de que el nombre no este repetido
    let repetido = false;
    funcCurs.cursos.forEach(curso => {
        if(curso.nombre == request.body.nombre) {
            repetido = true;
            response.status(requestFailed).end();
            return;
        }
    });
    if(repetido)return;

    //agreagar dato
    if(agregarDato(funcCurs.cursos,crearCurs(request.body),atrCurs)){
        funcCurs.guardar();
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

//Modificar curso
router.put('/', (request, response) => {
    
    valores = Object.values(request.body)
    remplazado = valores.shift()
    remplazo = valores.shift()
    listMatr = funcMatr.modificar({curso:remplazado.nombre},{curso: remplazo.nombre},["curso"])
    listaModificada = modificarDatos(funcCurs.cursos, remplazado, remplazo, atrCurs,["nombre","creditos"]);
    if(listaModificada.length != 0){
        funcCurs.cursos = listaModificada;
        funcMatr.guardar();
        funcCurs.guardar();
        response.status(requestOk).end();
        return;
    }
    response.status(requestFailed).end();
})

function crearCurs(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrCursO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrCursO.includes(key) || cuerpoPet[key] == null) return {};
    }

    return {
        "nombre" : cuerpoPet.nombre,
        "tipo" : cuerpoPet.tipo,
        "creditos" : cuerpoPet.creditos
    }
}

module.exports = router