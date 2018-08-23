const funciones = require('../src/md-links');

test('la suma de 1 + 2 es igual a 3', ()=> {
  expect(funciones.suma(1, 2)).toBe(3);
});

test('la resta de 2 + 1 es igual a 1', ()=> {
  expect(funciones.resta(2, 1)).toBe(1);
});