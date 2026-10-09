'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller } from 'react-hook-form';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const INTERVALS = [
  'Hace 1 hora', 'Hace 3 horas', 'Hace 6 horas', 'Hoy', 'Ayer', 'Hace 3 Dias',
  'Hace 7 Dias', 'Esta Semana', 'Semana Pasada', 'Este Mes', 'Mes Pasado', 'Rango Personalizado',
];

const RangeDateInput = ({ config, control, errors, disabled = false, labelColor, inputTextColor, inputBgColor,
  intervals = INTERVALS }) => {
  const hasError = !!errors?.[config.nombre];

  return (
    <div className="-mt-2 flex flex-col gap-3 w-full">
      {/* LABEL */}
      <label className="text-sm font-medium" style={{ color: labelColor }}>
        {config.customLabel || config.label}
      </label>

      <Controller
        name={config.nombre}
        control={control}
        rules={{
          required: config.requerido ? 'Este campo es requerido' : false,
        }}
        render={({ field }) => {
          const value = field.value || {
            tipo: '',
            fechaInicio: null,
            fechaFin: null,
          };

          const isCustom = value.tipo === 'Rango Personalizado';

          return (
            <div className="flex flex-col gap-4 w-full">
              {/* SELECT */}
              <select
                disabled={disabled}
                value={value.tipo}
                onChange={(e) =>
                  field.onChange({
                    ...value,
                    tipo: e.target.value,
                  })
                }
                className={`
                  w-full h-10 px-3 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                  ${hasError ? 'border-red-500' : 'border-gray-300'}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                `}
              >
                <option value="">Selecciona un filtro</option>

                {intervals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* RANGO PERSONALIZADO */}
              {isCustom && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {/* FECHA INICIO */}
                  <DatePicker
                    locale="es"
                    selected={value.fechaInicio}
                    selectsStart
                    startDate={value.fechaInicio}
                    endDate={value.fechaFin}
                    disabled={disabled}
                    placeholderText="Fecha inicial"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) =>
                      field.onChange({
                        ...value,
                        fechaInicio: date,
                      })
                    }
                    className={`
                      w-full px-3 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                      ${hasError ? 'border-red-500' : 'border-gray-300'}
                      ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                    style={{
                      color: inputTextColor,
                      backgroundColor: disabled ? '#F3F4F6' : inputBgColor,
                    }}
                  />

                  {/* FECHA FIN */}
                  <DatePicker
                    locale="es"
                    selected={value.fechaFin}
                    selectsEnd
                    startDate={value.fechaInicio}
                    endDate={value.fechaFin}
                    minDate={value.fechaInicio}
                    disabled={disabled}
                    placeholderText="Fecha final"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) =>
                      field.onChange({
                        ...value,
                        fechaFin: date,
                      })
                    }
                    className={`
                      w-full px-3 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                      ${hasError ? 'border-red-500' : 'border-gray-300'}
                      ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                    style={{
                      color: inputTextColor,
                      backgroundColor: disabled ? '#F3F4F6' : inputBgColor,
                    }}
                  />
                </div>
              )}
            </div>
          );
        }}
      />

      {/* ERROR */}
      {hasError && <span className="text-xs text-red-500">{errors[config.nombre]?.message}</span>}
    </div>
  );
};

export default RangeDateInput;
