const evaluateRule = (rule, getValue, options) => {
  const { fields, ignoredFieldTypes, strictEquality } = options;
  const sourceField = fields.find((field) => field.nombre === rule.campo);
  if (ignoredFieldTypes.includes(sourceField?.tipo)) return true;

  const currentValue = getValue(rule.campo);

  switch (rule.operador) {
    case 'equals':
      // eslint-disable-next-line eqeqeq
      return strictEquality ? currentValue === rule.valor : currentValue == rule.valor;
    case 'notEquals':
      // eslint-disable-next-line eqeqeq
      return strictEquality ? currentValue !== rule.valor : currentValue != rule.valor;
    case 'greaterThan':
      return Number(currentValue) > Number(rule.valor);
    case 'lessThan':
      return Number(currentValue) < Number(rule.valor);
    case 'greaterOrEqual':
      return Number(currentValue) >= Number(rule.valor);
    case 'lessOrEqual':
      return Number(currentValue) <= Number(rule.valor);
    default:
      return false;
  }
};

export const evaluateCondition = (conditions, getValue, {
  fields = [], ignoredFieldTypes = [], strictEquality = false, unknownGroupOperatorPasses = false,
} = {}) => {
  if (!conditions) return true;

  const evaluate = (rule) => evaluateRule(rule, getValue, { fields, ignoredFieldTypes, strictEquality });
  if (conditions.and || conditions.or) {
    const andRules = conditions.and || [];
    const orRules = conditions.or || [];
    return (!andRules.length || andRules.every(evaluate)) && (!orRules.length || orRules.some(evaluate));
  }

  const { operador = 'AND', reglas = [] } = conditions;
  if (!reglas.length) return true;
  if (operador === 'OR') return reglas.some(evaluate);
  if (operador === 'AND') return reglas.every(evaluate);
  return unknownGroupOperatorPasses;
};
