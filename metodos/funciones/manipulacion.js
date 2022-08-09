function agregarDato(lista, dato, atributos){
    if(Object.values(dato).length != atributos.length) {
        return false;}
    for (const key in dato) {
        if(!atributos.includes(key) || dato[key] == null) {
            return false;}
    }
    lista.push(dato);
    console.log(lista);
    return true;
}

function eliminarDatos(lista, dato, atributos){

    //verificar que los atributos de dato sean validos
    for (const key in dato) {
        if(!atributos.includes(key) || dato[key] == null) {
            return [];
        }
    }

    //borrar objetos con el valor pedido
    listamod = lista.filter((item) => {
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

function modificarDatos(lista, dato, remplazo, atributos){

    let listMod = eliminarDatos(lista, dato, atributos);
    if(listMod == []) return [];
    let extra = lista.length - listMod.length;
    for (let index = 0; index < extra; index++) {
        if(!agregarDato(listMod, remplazo, atributos)) return [];
    }
    return listMod;
}

module.exports = {agregarDato, eliminarDatos, modificarDatos};