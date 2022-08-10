const {cargar,guardar} = require("./base/persistencia");
const {agregarDato,eliminarDatos,modificarDatos} = require("./base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./base/consulta");
const funcCurs = require("./funcCurs");
const rutaMatr = "./archivos/matriculas.json";
const atrMatr = ["estudiante","curso","notas","notaFinal"]
const atrMatrO = ["estudiante","curso","notas"]

// console.log("1 "+consultarDatos);
// console.log("2 "+funcCurs);

let matriculas = cargar(rutaMatr);

let funcMatr = {
    
    matriculas: matriculas,
    modificar : function (remplazado,remplazo,atrMatrModf){return modificarDatos(this.matriculas, remplazado, remplazo, atrMatr,atrMatrModf)},
    borrar : function (matricLis = this.matriculas,cuerpoPet) {
        listaModificada = eliminarDatos(matricLis,cuerpoPet,atrMatr);
        if(listaModificada != []){
            return listaModificada;
        }
        return [];
    },
    consultar : function (cuerpo) {return consultarDatos(this.matriculas,cuerpo,atrMatr)},
    guardar : function () {guardar(this.matriculas,rutaMatr)},
    cargar : function () {this.matriculas = cargar(rutaMatr)}
}

module.exports = funcMatr;