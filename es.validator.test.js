const validatePlate = require('./validator');

test('ES should be valid', () => {
  expect(validatePlate("ES", "1234BBC")).toBe(true);
});

test('ES invalid (numeric segment too short)', () => {
  expect(validatePlate("ES", "123BBC")).toBe(false);
});

test('ES invalid (numeric segment too long)', () => {
  expect(validatePlate("ES", "12345BBC")).toBe(false);
});

test('ES invalid (alpha segment too short)', () => {
  expect(validatePlate("ES", "1234BB")).toBe(false);
});

test('ES invalid (alpha segment too long)', () => {
  expect(validatePlate("ES", "1234BBCD")).toBe(false);
});

test('ES invalid (alpha segment invalid)', () => {
  expect(validatePlate("ES", "1234AEI")).toBe(false);
});

test('ES invalid (additional segment before)', () => {
  expect(validatePlate("ES", "XX1234BBC")).toBe(false);
});

test('ES invalid (additional segment after)', () => {
  expect(validatePlate("ES", "1234BBCYY")).toBe(false);
});
