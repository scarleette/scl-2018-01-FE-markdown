
const path = require('path');
const fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');


function rutaAbsoluta(ruta) {
  const rutaCompleta = path.resolve(ruta);
  // console.log(rutaCompleta);
  return rutaCompleta;
}


function extraerLinea(ruta4) {
  leerRutacompleta(ruta4).then((data)=> {
    console.log(data);
    return data;
    }).then(data => {
    let lineaArchivo = data.split('\n');
    // console.log(lineaArchivo);
    let extraeLinea = lineaArchivo.map(elemento => {
    // console.log(elemento);
    const numeroLinea = (lineaArchivo.indexOf(elemento) + 1);
    // console.log(elemento);
    // return markdownLinkExtractor(elemento, numeroLinea);

    });
  });
};

// function extraerLinea(ruta4){
//   fs.readFile(ruta4, 'utf-8', (err, data)=> {
//     if (err) throw err;
//     // console.log(data);
//     let lineaArchivo = data.split('\n');
//     // console.log(lineaArchivo);
//     let extraeLinea = lineaArchivo.map(elemento => {
//     // console.log(elemento);
//     const numeroLinea = (lineaArchivo.indexOf(elemento) + 1);
//     // console.log(elemento);
//     // return markdownLinkExtractor(elemento, numeroLinea);
//     });
//     // console.log(extraeLinea);
//      extraeLinea = extraeLinea.filter(e => e.lenght !== 0);
//      extraeLinea = extraeLinea.reduce((elemento, elementos) => elemento.concat(elementos));
//     //  console.log(extraeLinea);
//   });
// };

function leerRutacompleta(ruta2){
  return new Promise((resolve, reject)=> {
    fs.readFile(ruta2, 'utf-8', (err, data)=> {
      if(err) reject(err);
      resolve(data);
    });
  })
};

function comprueboExtencion(ruta3) {
  const extencionPermitida = '.md';
  const extencion = (ruta3.substring(ruta3.lastIndexOf('.'))).toLowerCase();
  if (extencion !== extencionPermitida) {
    // leerRutacompleta(ruta3); 
    console.log('Esto no funciona, debe ser archivo .md');
  } else {
    // console.log('error esto no es .md');
    return true;
  }
};

function markdownLinkExtractor(markdown, numeroLinea) {
  const links = [];
  const renderer = new Marked.Renderer();

  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
      linea: numeroLinea
    });
  };

  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
      linea: numeroLinea
    });
  };

  Marked(markdown, {renderer: renderer});
  // console.log(links);
  // validarLink(links);
  return links;
};

function validarLink(links) {
  links.forEach(elemento => {
    let url = elemento.href;
    fetch(url).then(response => response
    ).then(data => {
      status = {
        status: {
          'url': data.url,
          'status': data.status,
          'statusText': data.statusText
        }       
      }
      // console.log(status);
    }).catch(error => {
      console.error('ERROR > ' + error.status);
    });
  });
};

function mdLinks(path) {
  return new Promise((resolve, reject)=> {
    const compruebaArchivoMd = comprueboExtencion(path);
    // console.log(compruebaArchivoMd);
    if (compruebaArchivoMd){
      const convertidaEnRutaAbsoluta = rutaAbsoluta(path);
      // console.log(convertidaEnRutaAbsoluta); 
      leerRutacompleta(convertidaEnRutaAbsoluta).then((data) => {
      console.log(data);
      }).then(data => {
        console.log('holi');
      });     
    }
  })
};



module.exports = {
  mdLinks
};


/* function leerRutacompleta(ruta2) {
  fs.readFile(ruta2, 'utf-8', (err, data)=> {
    if (err) throw err;
    // console.log(data);
    let lineaArchivo = data.split('\n');
    // console.log(lineaArchivo);
    let extraeLinea = lineaArchivo.map(elemento => {
    // console.log(elemento);
    const numeroLinea = (lineaArchivo.indexOf(elemento) + 1);
    // console.log(elemento);
    return markdownLinkExtractor(elemento, numeroLinea);
    })
    // console.log(extraeLinea);
     extraeLinea = extraeLinea.filter(e => e.lenght !== 0);
     extraeLinea = extraeLinea.reduce((elemento, elementos) => elemento.concat(elementos));
    //  console.log(extraeLinea);
  });
} */


// function extraerLinea(ruta4){
//   fs.readFile(ruta4, 'utf-8', (err, data)=> {
//     if (err) throw err;
//     // console.log(data);
//     let lineaArchivo = data.split('\n');
//     // console.log(lineaArchivo);
//     let extraeLinea = lineaArchivo.map(elemento => {
//     // console.log(elemento);
//     const numeroLinea = (lineaArchivo.indexOf(elemento) + 1);
//     // console.log(elemento);
//     // return markdownLinkExtractor(elemento, numeroLinea);
//     });
//     // console.log(extraeLinea);
//      extraeLinea = extraeLinea.filter(e => e.lenght !== 0);
//      extraeLinea = extraeLinea.reduce((elemento, elementos) => elemento.concat(elementos));
//     //  console.log(extraeLinea);
//   });
// };