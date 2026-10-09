"use client";

import { useFieldArray } from "react-hook-form";

const operadoresDisponibles = [
  { label: "Igual a", value: "equals" },
  { label: "Distinto de", value: "notEquals" },
  { label: "Mayor que", value: "greaterThan" },
  { label: "Menor que", value: "lessThan" },
  { label: "Mayor o igual", value: "greaterOrEqual" },
  { label: "Menor o igual", value: "lessOrEqual" },
];

const RuleGroup = ({ title, name, control, camposDisponibles }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <h3 className="font-semibold">{title}</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-4">
            <label className="text-xs">Campo</label>
            <select
              {...control.register(`${name}.${index}.campo`)}
              className="w-full border rounded-lg px-2 py-1"
            >
              <option value="">Seleccionar</option>
              {camposDisponibles.map((campo) => (
                <option key={campo.nombre} value={campo.nombre}>
                  {campo.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4">
            <label className="text-xs">Operador</label>
            <select
              {...control.register(`${name}.${index}.operador`)}
              className="w-full border rounded-lg px-2 py-1"
            >
              {operadoresDisponibles.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3">
            <label className="text-xs">Valor</label>
            <input
              {...control.register(`${name}.${index}.valor`)}
              className="w-full border rounded-lg px-2 py-1"
            />
          </div>

          <div className="col-span-1">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ campo: "", operador: "equals", valor: "" })}
        className="text-sm bg-gray-900 text-white px-3 py-1 rounded-lg"
      >
        + Agregar regla
      </button>
    </div>
  );
};

const RuleBuilder = ({ control, camposDisponibles }) => (
    <div className="space-y-6">
      <RuleGroup
        title="Reglas AND (todas deben cumplirse)"
        name="condiciones.and"
        control={control}
        camposDisponibles={camposDisponibles}
      />

      <RuleGroup
        title="Reglas OR (al menos una debe cumplirse)"
        name="condiciones.or"
        control={control}
        camposDisponibles={camposDisponibles}
      />
    </div>
  );

export default RuleBuilder;
