const validatePlate = require('./validator');

test('ES should be valid', () => {
  expect(validatePlate("ES", "1234ABC")).toBe(true);
});

test('ES invalid (numeric segment too short)', () => {
  expect(validatePlate("ES", "123ABC")).toBe(false);
});

test('ES invalid (numeric segment too long)', () => {
  expect(validatePlate("ES", "12345ABC")).toBe(false);
});

test('ES invalid (alpha segment too short)', () => {
  expect(validatePlate("ES", "1234AB")).toBe(false);
});

test('ES invalid (alpha segment too long)', () => {
  expect(validatePlate("ES", "1234ABCD")).toBe(false);
});

test('ES invalid (additional segment before)', () => {
  expect(validatePlate("ES", "XX1234ABC")).toBe(false);
});

test('ES invalid (additional segment after)', () => {
  expect(validatePlate("ES", "1234ABCYY")).toBe(false);
});
