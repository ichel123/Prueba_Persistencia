const express = require('express');
const app = express();
const fs = require('fs');

const fileMatriculas = "matriculas.json";
const fileEstudiantes = "user.json";
const fileCursos = "cursos.json";


function getMatriculas(){
    //Obtener matriculas
    app.get('/matriculas', (request, response) => {
        response.send(obtenerDatos(fileMatriculas))
    })
}

function getEstudiantes(){
    //Obtener estudiantes
    app.get('/estudiantes', (request, response) => {
        response.send(obtenerDatos(fileEstudiantes))
    })
}

function getCursos(){
    //Obtener cursos
    app.get('/cursos', (request, response) => {
        response.send(obtenerDatos(fileCursos));
    })
}

function obtenerDatos(file){
    let data = fs.readFileSync(file);
    let myObject = JSON.parse(data);
    return myObject;
}
exports.get = getMatriculas;