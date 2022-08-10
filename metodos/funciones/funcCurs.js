const {cargar,guardar} = require("./base/persistencia");
const {agregarDato,eliminarDatos} = require("./base/manipulacion");
const {consultarDatos,consultarDatosFunc} = require("./base/consulta");
const rutaCurs = "./archivos/cursos.json";
const atrCurs = ["nombre","tipo","creditos"]
const atrCursO = ["nombre","tipo","creditos"]

let cursos = cargar(rutaCurs);

let funcCurs = {
    cursos : cursos,
    getPorcentajes : function (curso) {
        let curs = consultarDatos(this.cursos,curso,atrCurs);
        switch (curs[0].tipo) {
            case "Teórico-Práctico":
                return [0.30, 0.25, 0.20, 0.25];
            case "Teórico":
                return [0.35, 0.35, 0.30];
            default:
                return [];
        }
    },
    consultar : function (datos){return consultarDatos(this.cursos,datos,atrCurs)},
    guardar : function () {guardar(this.cursos,rutaCurs)},
    cargar : function () {this.cursos = cargar(rutaCurs)}
}

module.exports = funcCurs;