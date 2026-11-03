'use client';

import { useId } from 'react';
import { useController } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getRuleSource, getRuleSourceFields } from '../../utils/ruleSources';

const OPERATORS = [
  { label: 'Igual a', value: 'equals' },
  { label: 'Distinto de', value: 'notEquals' },
  { label: 'Mayor que', value: 'greaterThan' },
  { label: 'Menor que', value: 'lessThan' },
  { label: 'Mayor o igual', value: 'greaterOrEqual' },
  { label: 'Menor o igual', value: 'lessOrEqual' },
];
const INPUT_CLASS = 'min-h-11 w-full rounded-lg border px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30A5E9] disabled:opacity-60';

const RuleComparisonInputs = ({ name, control, id, disabled, ruleSteps, onRemove }) => (
  <>
        <div className={ruleSteps.length ? 'md:col-span-2' : 'md:col-span-4'}>
          <label htmlFor={`${id}-operator`} className="text-xs">Operador</label>
          <select {...control.register(`${name}.operador`)} id={`${id}-operator`} disabled={disabled} className={INPUT_CLASS}>
            {OPERATORS.map((operator) => <option key={operator.value} value={operator.value}>{operator.label}</option>)}
          </select>
        </div>
        <div className="md:col-span-3">
          <label htmlFor={`${id}-value`} className="text-xs">Valor</label>
          <input {...control.register(`${name}.valor`)} id={`${id}-value`} disabled={disabled} className={INPUT_CLASS} />
        </div>
        <button type="button" onClick={onRemove} disabled={disabled} aria-label="Eliminar regla"
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-red-500 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-1">
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
  </>
);

const RuleRow = ({ name, control, camposDisponibles, ruleSteps, currentStepId, disabled, onRemove }) => {
  const id = useId();
  const step = useController({ name: `${name}.stepId`, control, rules: {
    validate: (value) => !ruleSteps.length || Boolean(getRuleSource(ruleSteps, value, currentStepId)) || 'Selecciona un step disponible.',
  } });
  const sourceFields = getRuleSourceFields(ruleSteps, step.field.value, currentStepId, camposDisponibles);
  const field = useController({ name: `${name}.campo`, control, rules: {
    validate: (value) => !ruleSteps.length || sourceFields.some((item) => item.nombre === value) || 'Selecciona un campo de este step.',
  } });
  const sourceId = step.field.value === undefined ? currentStepId ?? '' : step.field.value ?? '';
  const error = step.fieldState.error?.message || field.fieldState.error?.message;

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 md:grid-cols-12">
        {ruleSteps.length > 0 && <div className="md:col-span-3">
          <label htmlFor={`${id}-step`} className="text-xs">Step de origen</label>
          <select {...step.field} id={`${id}-step`} value={sourceId} disabled={disabled} className={INPUT_CLASS}
            aria-invalid={Boolean(step.fieldState.error)} aria-describedby={error ? `${id}-error` : undefined}
            onChange={(event) => {
              step.field.onChange(ruleSteps.find((item) => String(item.stepId) === event.target.value)?.stepId ?? '');
              field.field.onChange('');
            }}>
            <option value="">Seleccionar</option>
            {sourceId !== '' && !getRuleSource(ruleSteps, sourceId, currentStepId) && <option value={sourceId}>Step no disponible</option>}
            {ruleSteps.map((item) => <option key={item.stepId} value={item.stepId}>{item.label}</option>)}
          </select>
        </div>}
        <div className={ruleSteps.length ? 'md:col-span-3' : 'md:col-span-4'}>
          <label htmlFor={`${id}-field`} className="text-xs">Campo</label>
          <select {...field.field} value={field.field.value ?? ''} id={`${id}-field`} disabled={disabled} className={INPUT_CLASS}
            aria-invalid={Boolean(field.fieldState.error)} aria-describedby={error ? `${id}-error` : undefined}>
            <option value="">Seleccionar</option>
            {field.field.value && !sourceFields.some((item) => item.nombre === field.field.value) && <option value={field.field.value}>Campo no disponible: {field.field.value}</option>}
            {sourceFields.map((item) => <option key={item.nombre} value={item.nombre}>{item.label}</option>)}
          </select>
        </div>
        <RuleComparisonInputs name={name} control={control} id={id} disabled={disabled} ruleSteps={ruleSteps} onRemove={onRemove} />
      </div>
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RuleRow;
