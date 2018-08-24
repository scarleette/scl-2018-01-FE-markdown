#! /usr/bin/env node

const funciones = require('./src/md-links');
const [, , ...args] = process.argv;

funciones.rutaAbsoluta(args[0]);

