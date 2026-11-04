import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateCondition } from '../src/utils/evaluateCondition.js';
import { getRuleSource, getRuleSourceFields } from '../src/utils/ruleSources.js';

const steps = [
  { stepId: 7, label: 'Origen', fields: [{ nombre: 'nombre', label: 'Nombre anterior' }] },
  { stepId: 42, label: 'Actual', fields: [{ nombre: 'nombre', label: 'Nombre actual' }] },
];

test('el selector usa IDs estables y muestra el step actual de una regla antigua', () => {
  assert.equal(getRuleSource(steps, undefined, 42), steps[1]);
  assert.equal(getRuleSource(steps, '7', 42), steps[0]);
  assert.deepEqual(getRuleSourceFields(steps, 7, 42), steps[0].fields);
  assert.deepEqual(getRuleSourceFields(steps, 'borrado', 42), []);
  assert.deepEqual(getRuleSourceFields(steps, null, 42), []);
  assert.deepEqual(getRuleSourceFields([], undefined, undefined, steps[1].fields), steps[1].fields);
});

test('AND/OR y nombres repetidos resuelven el step de cada regla', () => {
  const conditions = { and: [{ stepId: 7, campo: 'nombre', operador: 'equals', valor: 'anterior' }],
    or: [{ stepId: 42, campo: 'nombre', operador: 'equals', valor: 'actual' }] };
  const resolver = (_name, stepId) => stepId === 7 ? 'anterior' : 'actual';
  assert.equal(evaluateCondition(conditions, resolver), true);
  assert.equal(evaluateCondition(conditions, () => 'actual'), false);
});

test('reglas sin step conservan watch, igualdad flexible y formato anterior', () => {
  const calls = [];
  const resolver = (...args) => { calls.push(args); return 2; };
  assert.equal(evaluateCondition({ operador: 'AND', reglas: [{ campo: 'cantidad', operador: 'equals', valor: '2' }] }, resolver), true);
  assert.deepEqual(calls, [['cantidad']]);
  assert.equal(evaluateCondition({ and: [{ campo: 'cantidad', operador: 'equals', valor: '2' }] }, resolver, { strictEquality: true }), false);
});

test('los tipos ignorados del detalle pertenecen únicamente al step actual', () => {
  const options = { currentStepId: 42, fields: [{ nombre: 'nombre', tipo: 'archivo' }], ignoredFieldTypes: ['archivo'] };
  const condition = (stepId) => ({ and: [{ campo: 'nombre', stepId, operador: 'equals', valor: 'x' }] });
  assert.equal(evaluateCondition(condition(42), () => undefined, options), true);
  assert.equal(evaluateCondition(condition(7), () => undefined, options), false);
});

test('se conservan todos los operadores y los grupos vacíos', () => {
  for (const [operador, valor] of [['equals', 3], ['notEquals', 4], ['greaterThan', 2], ['lessThan', 4], ['greaterOrEqual', 3], ['lessOrEqual', 3]]) {
    assert.equal(evaluateCondition({ and: [{ campo: 'numero', stepId: 7, operador, valor }] }, () => 3), true);
  }
  assert.equal(evaluateCondition({ and: [], or: [] }, () => undefined), true);
});
