const fs = require('fs');
const requestOk = 200;
const requestFailed = 400;

class persist {
    atributos = [];
    ruta = "";

    constructor(atributos, ruta){
        this.atributos = atributos;
        this.ruta = ruta;
    }

    //cargar datos
    obtenerDatos(){
        let data = fs.readFileSync(this.ruta);
        let myObject = (data == "")? [] : JSON.parse(data);
        return myObject;
    }

    //cargar dato
    obtenerDato(request){
        let myObject = this.obtenerDatos();
        return myObject.filter((item) => eval("item." + this.atributos[0]) == eval("request." + this.atributos[0]))
    }

    agregarDatos(request){
        //cargar datos
        let myObject = this.obtenerDatos();

        //creacion del cuerpo del objeto identado
        let cuerpo = "{\n";
        this.atributos.forEach(atributo => {
            cuerpo += '\t"'+ atributo +'" : "' + eval("request."+atributo) +'",\n';
        });
        cuerpo = cuerpo.slice(0, -2) + '\n';
        cuerpo += "}";

        //añadir objeto a los datos
        myObject.push(JSON.parse(cuerpo));

        //guardar datos
        const data = JSON.stringify(myObject,null,2);
        this.writeJson(data);
        return requestOk;
    }

    eliminarDatos(request){
        //cargar datos
        let myObject = this.obtenerDatos();
        
        //encontrar atributo a eliminar
        let indAtr=-1;
        for (let index = 0; index < this.atributos.length; index++) {
            if(eval("request." + this.atributos[index]) != undefined){
                indAtr = index;
                break;
            }
        }
        if(indAtr == -1) return requestFailed;

        //borrar objetos con el valor pedido
        myObject = myObject.filter((item) => eval("item." + this.atributos[indAtr]) != eval("request." + this.atributos[indAtr]))

        //guardar datos
        const data = JSON.stringify(myObject,null,2);
        this.writeJson(data);
        return requestOk;
    }

    //guardar datos
    writeJson(data) {
        fs.writeFile(this.ruta, data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        });
    }

    //comprobar que todos los atributos esten diligenciados
    comprobarAtr(request){

        for (let index = 0; index < this.atributos.length; index++) {
            if(eval("request." + this.atributos[index]) == undefined){
                return false;
            }
        }
        return true;
    }
}


module.exports = {persist}