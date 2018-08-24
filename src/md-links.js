
const path = require('path');
const fs = require('fs');
const marked = require('marked');


function rutaAbsoluta(ruta) {
  const rutaCompleta = path.resolve(ruta);
  /* console.log(rutaCompleta);*/
  comprueboExtencion(rutaCompleta);
  return rutaCompleta;
}

function leerRutacompleta(ruta2) {
  fs.readFile(ruta2, 'utf-8', (err, data)=> {
    if (err) throw err;
    console.log(data);
  });
}

function comprueboExtencion(ruta3) {
  const extencionPermitida = '.md';
  const extencion = (ruta3.substring(ruta3.lastIndexOf('.'))).toLowerCase();
  if (extencion === extencionPermitida) {
    leerRutacompleta(ruta3);
    console.log('Esto si funciona, es .md');
  } else {
    console.log('error esto no es .md');
  }
}

module.exports = {
  rutaAbsoluta,
};
