const { consultarDatos } = require("./consulta");

function agregarDato(lista, dato, atributos){

    console.log("Agregar dato: lista, dato, atributos", lista, dato, atributos);
    if(Object.values(dato).length != atributos.length) {
        console.log("Atr no completos");
        return false;}
    for (const key in dato) {
        if(!atributos.includes(key) || dato[key] == null) {
            console.log("Atr no valido");
            return false;}
    }
    lista.push(dato);
    return true;
}

function eliminarDatos(lista, dato, atributos){

    if(dato == null) return lista;

    //verificar que los atributos de dato sean validos
    for (const key in dato) {
        if(!atributos.includes(key) || dato[key] == null) {
            console.log("retorna ", key,dato[key]);
            return [];
        }
    }

    //borrar objetos con el valor pedido
    listamod = lista.filter((item) => {
        //console.log("sfdsfds",item,"sfdsfds",dato,"sfdsfds");
        for (const keyD in dato) {
            let contiene = false
            for (const keyI in item) {
                if(keyD == keyI && item[keyI] == dato[keyD]) contiene = true;
            }
            if (!contiene) return true;
        }
        return false;
    })

    return listamod;
}

function modificarDatos(lista, dato, remplazo, atributos, atributosModf){
    console.log("remplazo ",remplazo);
    console.log("atributosModf ",atributosModf);
    let datosElim = consultarDatos(lista, dato, atributos);
    console.log("datosElim ",datosElim);
    console.log("lista",lista," dato",dato," atributos", atributos);
    if(datosElim == undefined) return [];
    let listMod = eliminarDatos(lista, dato, atributos);
    if(listMod == []) return [];
    let extra = atributos - atributosModf;
    if(extra!=0){
        datosElim.forEach(datoElim => {
            for (const key in datoElim) {
                if(remplazo[key]==undefined){
                    remplazo[key] = datoElim[key]
                    console.log(key);
                }
            }
            let cop = JSON.parse(JSON.stringify(remplazo))
            if(!agregarDato(listMod, cop, atributos)) return [];
        });
    }
    console.log("listmod", listMod);
    return listMod;
}

module.exports = {agregarDato, eliminarDatos, modificarDatos};