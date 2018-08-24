const rutaAbsoluta = require('../src/md-links');


test('tiene que haber una ruta despues del comando', ()=> {
  expect(rutaAbsoluta()).toBe();
});