import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const CheckboxInput = ({ config, register, errors, disabled }) => (
    <div className="flex items-center justify-between">
      {/* Label */}
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-700">{config.customLabel || config.label}</label>

      {/* Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          id={config.nombre}
          aria-invalid={!!errors?.[config.nombre]}
          aria-describedby={errors?.[config.nombre] ? `${config.nombre}-error` : undefined}
          type="checkbox"
          disabled={disabled}
          {...register(config.nombre, buildRules(config))}
          className="sr-only peer letraTipoLight"
        />

        {/* Fondo */}
        <div
          className={`
            w-11 h-6 rounded-full transition-colors duration-300
            ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300'}
            peer-checked:bg-green-500
          `}
        ></div>

        {/* Bolita */}
        <div
          className="
            absolute left-1 top-1
            w-4 h-4 bg-white rounded-full
            transition-transform duration-300
            peer-checked:translate-x-5
          "
        ></div>
      </label>
      {errors?.[config.nombre] && <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-[#EF4444]" />}
      {errors?.[config.nombre] && <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500">{errors[config.nombre].message}</span>}
    </div>
  );

export default CheckboxInput;
