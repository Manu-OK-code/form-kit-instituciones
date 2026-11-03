'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormBuilder } from '../../src/index';

const RULE_STEPS = [
  { stepId: 'datos', label: 'Datos de la institución', fields: [{ nombre: 'tipo', label: 'Tipo de institución' }] },
  { stepId: 'solicitud', label: 'Solicitud', fields: [{ nombre: 'tipo', label: 'Tipo de solicitud' }] },
];

const StepRulesExample = ({ readOnly }) => {
  const [previousType, setPreviousType] = useState('publica');
  const form = useForm({ defaultValues: {
    tipo: 'privada',
    condiciones: { and: [{ stepId: 'datos', campo: 'tipo', operador: 'equals', valor: 'publica' }], or: [] },
  } });
  const conditions = form.watch('condiciones');
  return (
    <section className="playground-fieldset mt-6" aria-labelledby="step-rules-title">
      <h2 id="step-rules-title" className="mb-2 text-lg font-semibold text-slate-900">Reglas entre steps</h2>
      <label htmlFor="previous-type" className="block text-sm">Respuesta del step anterior</label>
      <select id="previous-type" disabled={readOnly} className="mb-5 min-h-11 rounded-lg border px-3" value={previousType} onChange={(event) => setPreviousType(event.target.value)}>
        <option value="publica">Pública</option><option value="privada">Privada</option>
      </select>
      <FormBuilder {...form} errors={form.formState.errors} isEditing={!readOnly} currentStepId="solicitud" ruleSteps={RULE_STEPS}
        resolveConditionValue={(name, stepId) => stepId === 'datos' ? previousType : form.watch(name)}
        fields={[
          { nombre: 'tipo', label: 'Tipo de solicitud (step actual)', tipo: 'texto', columna: 12 },
          { nombre: 'condiciones', tipo: 'reglas', columna: 12 },
          { nombre: 'detalle', label: 'Detalle condicionado', tipo: 'texto', condiciones: conditions, columna: 12 },
        ]} />
    </section>
  );
};

export default StepRulesExample;
