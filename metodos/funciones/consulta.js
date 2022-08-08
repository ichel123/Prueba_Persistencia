function consultarDatos(lista, dato, atributos){
    console.log(JSON.stringify(dato));
    for (const key in dato) {
        if(!atributos.includes(key) || dato[key] == null) return;
    }

    //borrar objetos con el valor pedido
    return lista.filter((item) => {
        for (const keyD in dato) {
            let contiene = false
            for (const keyI in item) {
                if(keyD == keyI && item[keyI] == dato[keyD]) contiene = true;
            }
            if (!contiene) return false;
        }
        return true;
    })
}

function consultarDatosFunc(lista, condicion, atributos){

    //borrar objetos con el valor pedido

    return lista.filter((item) => {
        entradas = []
        for (const key in item) {
            if(atributos.includes(key)) entradas.push(item[ket]);
        }
        return condicion(Object.values(dato));
    })
}

module.exports = {consultarDatos,consultarDatosFunc};