const getRuleSource = (ruleSteps, stepId, currentStepId) => {
  const sourceId = stepId === undefined ? currentStepId : stepId;
  return ruleSteps.find((step) => String(step.stepId) === String(sourceId));
};

const getRuleSourceFields = (ruleSteps, stepId, currentStepId, fields = []) =>
  ruleSteps.length ? getRuleSource(ruleSteps, stepId, currentStepId)?.fields ?? [] : fields;

export { getRuleSource, getRuleSourceFields };
