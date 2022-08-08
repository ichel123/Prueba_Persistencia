const fs = require('fs');

function cargar(ruta){
    let data = fs.readFileSync(ruta);
    let dataObject = (data == "")? [] : JSON.parse(data);
    return dataObject;
}

//guardar datos
function guardar(data,ruta) {
    const datatxt = JSON.stringify(data,null,2);
    fs.writeFile(ruta, JSON.stringify(data,null,2), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
    });
}

module.exports = {cargar,guardar};