
const path = require('path');
const fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');


function rutaAbsoluta(ruta) {
  const rutaCompleta = path.resolve(ruta);
  // console.log(rutaCompleta);
  return rutaCompleta;
};

function extraerLinea(ruta4) {
  return new Promise((resolve, reject)=> {
    leerRutacompleta(ruta4).then((data)=> {
    // console.log(data);
    let lineaArchivo = data.split('\n');
    // console.log(lineaArchivo);
    let extraeLinea = lineaArchivo.map(elemento => {
    // console.log(elemento);
    const numeroLinea = (lineaArchivo.indexOf(elemento) + 1);
    // console.log(elemento);
    return markdownLinkExtractor(ruta4, elemento, numeroLinea);
  });
    extraeLinea = extraeLinea.filter(e => e.lenght !== 0);
    // console.log(extraeLinea);
    extraeLinea = extraeLinea.reduce((elemento, elementos) => elemento.concat(elementos));
    // console.log(extraeLinea);
    resolve(extraeLinea);
  });
});
};


function leerRutacompleta(ruta2){
  return new Promise((resolve, reject)=> {
    fs.readFile(ruta2, 'utf-8', (err, data)=> {
      if(err) reject(err);
      // console.log(data);
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

function markdownLinkExtractor(ruta4, markdown, numeroLinea) {
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
      linea: numeroLinea,
      ruta: ruta4
    });
  };

  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
      linea: numeroLinea,
      ruta: ruta4
    });
  };

  Marked(markdown, {renderer: renderer});
  // console.log(links);
  // validarLink(links);
  return links;
};


function validarLinks(links) {
  new Promise((resolve, reject) => {
    let status = [];
    links.forEach(elemento => {
      const url = elemento.href;
      fetch(url).then(response => response
      ).then(data => {
        status.push = {
          status: {
            'url': data.url,
            'status': data.status,
            'statusText': data.statusText
          }       
        }
        console.log(status);
        resolve(status);
      })
    })
  })
}

function mdLinks(path, options) {
  return new Promise((resolve, reject)=> {
    const compruebaArchivoMd = comprueboExtencion(path);
    // console.log(compruebaArchivoMd);
    if (compruebaArchivoMd){
      const convertidaEnRutaAbsoluta = rutaAbsoluta(path);
      // console.log(convertidaEnRutaAbsoluta); 
      extraerLinea(convertidaEnRutaAbsoluta).then((data) => {
      // console.log(data);
      validarLinks(data);
      // console.log('holi');
      // console.log(options);
      });   
    }
  })
};



module.exports = {
  mdLinks
};
