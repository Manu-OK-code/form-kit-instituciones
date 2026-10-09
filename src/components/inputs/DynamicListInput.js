import { useFieldArray } from 'react-hook-form';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const DynamicListInput = ({ config, register, control, errors, disabled }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: config.nombre,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">{config.customLabel || config.label}</label>

      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left w-12">#</th>
              <th className="px-4 py-2 text-left">{config.subLabel || 'Valor'}</th>
              <th className="px-4 py-2 text-right w-20">Acción</th>
            </tr>
          </thead>

          <tbody>
            {fields.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No hay registros
                </td>
              </tr>
            ) : (
              fields.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-gray-500">{index + 1}</td>

                  <td className="px-4 py-2">
                    <input
                      type="text"
                      disabled={disabled}
                      {...register(`${config.nombre}.${index}.value`, {
                        required: config.requerido,
                      })}
                      className={`
                        w-full px-2 py-1 border rounded-md text-sm
                        ${errors?.[config.nombre]?.[index]?.value ? 'border-red-500' : 'border-gray-300'}
                        ${disabled ? 'bg-gray-100' : 'bg-white'}
                      `}
                    />

                    {errors?.[config.nombre]?.[index]?.value && (
                      <span className="text-xs text-red-500">Campo requerido</span>
                    )}
                  </td>

                  <td className="px-4 py-2 text-right">
                    {!disabled && (
                      <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
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

      {/* Botón agregar */}
      {!disabled && (
        <button
          type="button"
          onClick={() => append({ value: '' })}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm w-fit hover:bg-gray-800 transition"
        >
          <PlusIcon className="w-4 h-4" />
          Agregar {config.subLabel || 'registro'}
        </button>
      )}
    </div>
  );
};

export default DynamicListInput;
