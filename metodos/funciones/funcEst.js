const {cargar,guardar} = require("./base/persistencia");
const {agregarDato,eliminarDatos, modificarDatos} = require("./base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./base/consulta");
const rutaEst = "./archivos/estudiantes.json";
const atrEst = ["nombres","apellidos","codigo","promedio"]
const atrEstModf = ["nombres","apellidos"]
const atrEstO = ["nombres","apellidos","codigo"]

let estudiantes = cargar(rutaEst);

let funcEst = {
    estudiantes : estudiantes,
    modificar : function (elementos,remplazo,lista=this.estudiantes) {return modificarDatos(lista,elementos,remplazo,atrEstModf)},
    consultar : function (cuerpo) {return consultarDatos(this.estudiantes,cuerpo,atrEst)},
    guardar : function () {guardar(this.estudiantes,rutaEst)},
    cargar : () => {this.estudiantes = cargar(rutaEst)}
}

module.exports = funcEst;