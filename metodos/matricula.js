const express = require('express');
const router = express.Router();
const {cargar,guardar} = require("./funciones/base/persistencia");
const {agregarDato,eliminarDatos,modificarDatos} = require("./funciones/base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./funciones/base/consulta");
const funcCurs = require("./funciones/funcCurs");
const funcMatr = require("./funciones/funcMatr");
const funcEst = require("./funciones/funcEst");
const { json } = require('body-parser');
const requestOk = 200;
const requestFailed = 400;
const rutaMatr = "./archivos/matriculas.json";
const atrMatr = ["estudiante","curso","notas","notaFinal"]
const atrMatrO = ["estudiante","curso","notas"]
const atrMatrModf = ["notas"]

//Obtener matriculas
router.get('/', (request, response) => {
    response.send(funcMatr.matriculas);
})

//Obtener matricula
router.get('/consulta', (request, response) => {
    response.send(consultarDatos(funcMatr.matriculas,request.body,atrMatr));
})


//Agregar matricula
router.post('/',(request,response) => {
    let cuerpoPet = request.body
    //comprobacion de que el codigo no este repetido
    let repetido = false;
    funcMatr.matriculas.forEach(matricula => {
        if(matricula.estudiante == cuerpoPet.estudiante &&
            matricula.curso == cuerpoPet.curso) {
            response.status(requestFailed).end();
            repetido = true;
            return;
        }
    });
    if(repetido) return;
    
    //comprueba de que el estudiante y el curso existan
    if(funcCurs.consultar({nombre: cuerpoPet.curso}).length == 0
    || funcEst.consultar({codigo: cuerpoPet.estudiante}).length == 0){
        response.status(requestFailed).end();
        return;
    }

    //agreagar dato
    if(agregarDato(funcMatr.matriculas,crearMatr(cuerpoPet),atrMatr)){
        //actualizando promedio del estudiante
        actPromedio(cuerpoPet.estudiante);

        funcEst.guardar();
        funcMatr.guardar();
        response.status(requestOk).end();
    }

    response.status(requestFailed).end();
})

//Eliminar matricula
router.delete('/', (request, response) => {
    listaModificada = eliminarDatos(matriculas,request.body,atrMatr);
    if(listaModificada.length > 0){
        matriculas = listaModificada;
        response.status(requestOk).end();
        guardar(matriculas,rutaMatr);
    }
    response.status(requestFailed).end();
})

//Modificar matricula
router.put('/', (request, response) => {
    
    valores = Object.values(request.body)
    remplazado = valores.shift()
    remplazo = valores.shift()
    let listaModificada = modificarDatos(funcMatr.matriculas, remplazado, remplazo, atrMatr,atrMatrModf);

    listaMod = []
    for (let index = 0; index < listaModificada.length; index++) {
        let reg = crearMatr(listaModificada[index])
        registro = 
        {
            "estudiante" : reg.estudiante,
            "curso" : reg.curso,
            "notas" : reg.notas,
            "notaFinal" : reg.notaFinal
        }
        listaMod.push(registro);
        console.log("objeto copiado:",registro);
    }

    console.log(listaMod);

    funcEst.estudiantes.forEach(estudiante => {
        actPromedio(estudiante.codigo,listaMod);
    });
    if(listaMod.length != 0){
        funcMatr.matriculas = listaMod;
        funcMatr.guardar();
        funcEst.guardar();
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
    
    let notas = [];
    let definitiva = 0;

    porcentajes = funcCurs.getPorcentajes({nombre: cuerpoPet.curso})
    porcentajes.forEach(prct => {
        let nota = cuerpoPet.notas.shift();
        notas.push(nota);
        definitiva += nota * prct
    });


    return {
        "estudiante" : cuerpoPet.estudiante,
        "curso" : cuerpoPet.curso,
        "notas" : notas,
        "notaFinal" : Math.round(definitiva*100)/100
    }
}

function actPromedio(codigoEst,lista = funcMatr.matriculas){

    let estudiante = consultarDatos(funcEst.estudiantes,{codigo: codigoEst},["codigo"])[0];
    let cursos = consultarDatos(lista,{estudiante: codigoEst},["estudiante"]);
    let creditosTotal = 0;
    let acumulado = 0;
    cursos.forEach(curso => {
        let materia = funcCurs.consultar({nombre: curso.curso});
        let creditos = parseInt(materia[0].creditos);
        acumulado += curso.notaFinal * creditos;
        creditosTotal += creditos;
    });
    estudiante.promedio = Math.round(acumulado*100/creditosTotal)/100;
    if(isNaN(estudiante.promedio)) estudiante.promedio = 0;
    funcEst.modificar({codigo:estudiante.codigo},estudiante);
}

module.exports = router;