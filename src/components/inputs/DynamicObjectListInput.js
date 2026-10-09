'use client';

import { useFieldArray } from 'react-hook-form';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const DynamicObjectListInput = ({ config, register, control, disabled }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: config.nombre,
  });

  const renderInput = (campo, index) => {
    const fieldName = `${config.nombre}.${index}.${campo.nombre}`;

    switch (campo.tipo) {
      case 'texto':
        return (
          <input
            type="text"
            disabled={disabled}
            {...register(fieldName, { required: campo.requerido })}
            className="w-full px-2 py-1 border rounded-md text-sm border-gray-300"
          />
        );

      case 'numero':
        return (
          <input
            type="number"
            disabled={disabled}
            {...register(fieldName, { required: campo.requerido })}
            className="w-full px-2 py-1 border rounded-md text-sm border-gray-300"
          />
        );

      case 'select':
        return (
          <select
            disabled={disabled}
            {...register(fieldName, { required: campo.requerido })}
            className="w-full px-2 py-1 border rounded-md text-sm border-gray-300"
          >
            <option value="">Seleccione</option>
            {campo.opciones?.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  const getDefaultObject = () => {
    const obj = {};
    config.campos.forEach((campo) => {
      obj[campo.nombre] = '';
    });
    return obj;
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-gray-700">{config.label}</label>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 w-10">#</th>

              {config.campos.map((campo) => (
                <th key={campo.nombre} className="px-4 py-2 text-left">
                  {campo.label}
                </th>
              ))}

              <th className="px-4 py-2 text-right w-16">Acción</th>
            </tr>
          </thead>

          <tbody>
            {fields.length === 0 ? (
              <tr>
                <td colSpan={config.campos.length + 2} className="text-center py-6 text-gray-400">
                  No hay registros
                </td>
              </tr>
            ) : (
              fields.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>

                  {config.campos.map((campo) => (
                    <td key={campo.nombre} className="px-4 py-2">
                      {renderInput(campo, index)}
                    </td>
                  ))}

                  <td className="px-4 py-2 text-right">
                    {!disabled && (
                      <button type="button" onClick={() => remove(index)} className="text-red-500">
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!disabled && (
        <button
          type="button"
          onClick={() => append(getDefaultObject())}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm w-fit"
        >
          <PlusIcon className="w-4 h-4" />
          Agregar registro
        </button>
      )}
    </div>
  );
};

export default DynamicObjectListInput;
