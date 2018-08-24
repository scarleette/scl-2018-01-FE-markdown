// prueba para realizar test con jest
const path = require('path');
const fs = require('fs');


function rutaAbsoluta(ruta) {
  const rutaCompleta = path.resolve(ruta);
  //console.log(rutaCompleta);
  fs.readFile(rutaCompleta, 'utf-8', (err, data)=> {
    if (err) throw err;
    console.log(data);
  });
}
 
module.exports = {
  rutaAbsoluta,
};
