//  Librería debe exportar una función u objeto al entorno global (window) 
// y hacer uso de features de ES6 donde sea apropiado

console.log('holi');
const funciones = require('./src/md-links');
const fs = require('fs');

console.log(fs.constants.readlink);

console.log(funciones);
console.log(funciones.suma(1, 2));
console.log(funciones.resta(1, 2));