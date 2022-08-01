const router = express.Router();

router.post('/estudiantes/agregar',(request,response) => {
    agregarDatos(request.body, fileEstudiantes);
    response.status(200).end();
});

function agregarDatos(request, file){
    let myObject = obtenerDatos(file);
    let dataAdd = {
      "id": myObject[myObject.length - 1].id + 1,
      "nombres": request.nombres,
      "apellidos": request.apellidos,
      "codigo": request.codigo
    }
  
    myObject.push(dataAdd);
    const data = JSON.stringify(myObject);
    writeJson(data, file);
    console.log(data);
}
function writeJson(data, file) {
    fs.writeFile(file, data, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
    });
}