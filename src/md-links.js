
const path = require('path');
const fs = require('fs');
const Marked = require('marked');


function rutaAbsoluta(ruta) {
  const rutaCompleta = path.resolve(ruta);
  /* console.log(rutaCompleta);*/
  comprueboExtencion(rutaCompleta);
  return rutaCompleta;
}

function leerRutacompleta(ruta2) {
  fs.readFile(ruta2, 'utf-8', (err, data)=> {
    if (err) throw err;
    markdownLinkExtractor(data);
    // console.log(data);
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


function markdownLinkExtractor(markdown) {
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
    });
  };

  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };

  Marked(markdown, {renderer: renderer});
  console.log(links);
  
  return links;
};


module.exports = {
  rutaAbsoluta,
};
