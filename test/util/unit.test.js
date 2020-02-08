const JSBI = require('jsbi');
const { util: { unit } } = require('../../src');

test('unit', () => {
  expect(unit('cfx', 'cfx')(1)).toEqual(JSBI.BigInt(1));
  expect(unit('cfx', 'gdrip')(1)).toEqual(JSBI.BigInt(1e9));
  expect(unit('cfx', 'drip')(1)).toEqual(JSBI.BigInt(1e18));

  expect(unit('gdrip', 'cfx')(1e9)).toEqual(JSBI.BigInt(1));
  expect(unit('gdrip', 'gdrip')(1)).toEqual(JSBI.BigInt(1));
  expect(unit('gdrip', 'drip')(1)).toEqual(JSBI.BigInt(1e9));

  expect(unit('drip', 'cfx')(1e18)).toEqual(JSBI.BigInt(1));
  expect(unit('drip', 'gdrip')(1e9)).toEqual(JSBI.BigInt(1));
  expect(unit('drip', 'drip')(1)).toEqual(JSBI.BigInt(1));

  expect(() => unit('CFX', 'drip')).toThrow('"from" must in ["cfx","gdrip","drip"], got "CFX"');
  expect(() => unit('cfx', 'Drip')).toThrow('"to" must in ["cfx","gdrip","drip"], got "Drip"');
});

test('fromCFXToGDrip', () => {
  expect(unit.fromCFXToGDrip(123)).toEqual(JSBI.BigInt(123000000000));
});

test('fromGDripToCFX', () => {
  expect(unit.fromGDripToCFX(123456789012)).toEqual(JSBI.BigInt(123));
  expect(unit.fromGDripToCFX(123999999999)).toEqual(JSBI.BigInt(123));
});

test('fromCFXToDrip', () => {
  expect(unit.fromCFXToDrip(123)).toEqual(JSBI.BigInt(123000000000000000000));
});

test('fromDripToCFX', () => {
  expect(unit.fromDripToCFX(123456789012345678901)).toEqual(JSBI.BigInt(123));
});

test('fromGDripToDrip', () => {
  expect(unit.fromGDripToDrip(123)).toEqual(JSBI.BigInt(123000000000));
});

test('fromDripToGDrip', () => {
  expect(unit.fromDripToGDrip(123456789012)).toEqual(JSBI.BigInt(123));
});
