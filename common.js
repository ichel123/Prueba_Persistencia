
const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 

app.use('/', router);

function obtenerDatos(file){
    let data = fs.readFileSync(file);
    let myObject = JSON.parse(data);
    return myObject;
}