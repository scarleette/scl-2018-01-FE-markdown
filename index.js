#! /usr/bin/env node

const funciones = require('./src/md-links');
const fs = require('fs');
const [, , ...args] = process.argv;

// console.log('holi');
// console.log(funciones);
funciones.rutaAbsoluta(args[0]);

