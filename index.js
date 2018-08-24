#! /usr/bin/env node

const funciones = require('./src/md-links');
const fs = require('fs');
const [, , ...args] = process.argv;


funciones.rutaAbsoluta(args[0]);

