'use client';

import { useFieldArray, useWatch } from 'react-hook-form';
import RuleRow from './RuleRow';

const RuleGroup = ({ title, name, control, camposDisponibles, ruleSteps, currentStepId, disabled }) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-4 rounded-xl border p-4">
      <h3 className="font-semibold">{title}</h3>
      {fields.map((field, index) => <RuleRow key={field.id} name={`${name}.${index}`} control={control}
        camposDisponibles={camposDisponibles} ruleSteps={ruleSteps} currentStepId={currentStepId}
        disabled={disabled} onRemove={() => remove(index)} />)}
      <button type="button" disabled={disabled} onClick={() => append({
        campo: '', operador: 'equals', valor: '',
        ...(ruleSteps.length && currentStepId !== undefined ? { stepId: currentStepId } : {}),
      })} className="min-h-11 cursor-pointer rounded-lg bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
        + Agregar regla
      </button>
    </div>
  );
};

const RuleBuilder = ({ control, camposDisponibles = [], ruleSteps = [], currentStepId, disabled }) => {
  const conditions = useWatch({ control, name: 'condiciones' });
  if (conditions?.reglas && !conditions.and && !conditions.or) {
    return <RuleGroup key="legacy" title={`Reglas ${conditions.operador === 'OR' ? 'OR' : 'AND'}`} name="condiciones.reglas" control={control}
      camposDisponibles={camposDisponibles} ruleSteps={ruleSteps} currentStepId={currentStepId} disabled={disabled} />;
  }
  return <div className="space-y-6">
    <RuleGroup title="Reglas AND (todas deben cumplirse)" name="condiciones.and" control={control}
      camposDisponibles={camposDisponibles} ruleSteps={ruleSteps} currentStepId={currentStepId} disabled={disabled} />
    <RuleGroup title="Reglas OR (al menos una debe cumplirse)" name="condiciones.or" control={control}
      camposDisponibles={camposDisponibles} ruleSteps={ruleSteps} currentStepId={currentStepId} disabled={disabled} />
  </div>;
};

export default RuleBuilder;
