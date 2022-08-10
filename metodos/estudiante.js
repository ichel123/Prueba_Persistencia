const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/base/persistencia");
const {agregarDato, eliminarDatos, modificarDatos} = require("./funciones/base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/base/consulta");
const funcMatr = require("./funciones/funcMatr");
const funcEst = require("./funciones/funcEst");
const requestOk = 200;
const requestFailed = 400;
const rutaEst = "./archivos/estudiantes.json";
const atrEst = ["nombres","apellidos","codigo","promedio"]
const atrEstModf = ["nombres","apellidos"]
const atrEstO = ["nombres","apellidos","codigo"]

//Obtener estudiantes
router.get('/', (request, response) => {
    response.send(funcEst.estudiantes);
})

//Obtener estudiante
router.get('/consulta', (request, response) => {
    response.send(consultarDatos(funcEst.estudiantes,request.body,atrEst));
})

//Eliminar estudiante
router.delete('/', (request, response) => {
    console.log(funcEst.estudiantes);
    let estudiantesB = consultarDatos(funcEst.estudiantes,request.body,atrEst);
    let auxMatr = funcMatr.matriculas;
    console.log("Estudaintes: ",estudiantesB);
    estudiantesB.forEach(cursoB => {
        let matriculaB = {
            estudiante: cursoB.codigo
        }
        auxMatr = funcMatr.borrar(auxMatr,matriculaB);
        if(auxMatr == []) { 
            response.status(requestFailed).end();
            return;
        }
    });
    listaModificada = eliminarDatos(funcEst.estudiantes,request.body,atrEst);
    
    if(listaModificada != [] && auxMatr != []){
        funcEst.estudiantes = listaModificada;
        funcMatr.matriculas = auxMatr;
        response.status(requestOk).end();
    }
    funcMatr.guardar()
    funcEst.guardar();
    response.status(requestFailed).end();
})

//Agregar estudiante
router.post('/',(request,response) => {
    //comprobacion de que el codigo no este repetido
    let repetido = false;
    funcEst.estudiantes.forEach(estudiante => {
        if(estudiante.codigo == request.body.codigo) {
            repetido = true;
            response.status(requestFailed).end();
            return;
        }
    });
    if(repetido) return;

    //agreagar dato
    console.log("1",request.body);
    console.log("2",crearEst(request.body));
    if(agregarDato(funcEst.estudiantes,crearEst(request.body),atrEst)){
        funcEst.guardar();
        response.status(requestOk).end();
    }
    response.status(requestFailed).end();
})

//Modificar estudiante
router.put('/', (request, response) => {
    
    valores = Object.values(request.body)
    remplazado = valores.shift()
    remplazo = valores.shift()
    listaModificada = modificarDatos(funcEst.estudiantes, remplazado, remplazo, atrEst,["nombres","apellidos"]);
    console.log("listaModificada ",listaModificada)
    if(listaModificada.length != 0 ){
        funcEst.estudiantes = listaModificada;
        response.status(requestOk).end();
        funcEst.guardar();
        return;
    }
    response.status(requestFailed).end();
})


function crearEst(cuerpoPet){

    //comprobacion de que tenga un minimo de datos
    if(Object.values(cuerpoPet).length != atrEstO.length) return {};
    for (const key in cuerpoPet) {
        if(!atrEstO.includes(key) || cuerpoPet[key] == null) return {};
    }
    console.log("cuerpo",cuerpoPet);
    return {
        "nombres" : cuerpoPet.nombres,
        "apellidos" : cuerpoPet.apellidos,
        "codigo" : cuerpoPet.codigo,
        "promedio" : 0
    }
}

module.exports = router