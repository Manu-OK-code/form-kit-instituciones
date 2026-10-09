import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ColorInput = ({ config, register, errors, disabled }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-600">{config.customLabel || config.label}</label>

      <div className="relative flex items-center gap-3">
        <input
          id={config.nombre}
          aria-invalid={!!errors?.[config.nombre]}
          aria-describedby={errors?.[config.nombre] ? `${config.nombre}-error` : undefined}
          type="color"
          disabled={disabled}
          {...register(config.nombre, buildRules(config))}
          className="w-14 h-10 rounded-lg border border-gray-300 cursor-pointer disabled:opacity-50 letraTipoLight"
        />

        <span className="text-sm text-gray-500 letraTipoLight">Selecciona un color identificador</span>
        {errors?.[config.nombre] && <ExclamationCircleIcon aria-hidden="true" className="absolute right-2 h-5 w-5 text-[#EF4444]" />}
      </div>

      {errors[config.nombre] && (
        <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500 letraTipoRegular">{errors[config.nombre].message}</span>
      )}
    </div>
  );

export default ColorInput;
