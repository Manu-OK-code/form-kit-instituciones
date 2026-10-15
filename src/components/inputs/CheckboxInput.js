import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const CheckboxInput = ({ config, register, errors, disabled }) => {
  const hasError = !!errors?.[config.nombre];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-700">
        {config.customLabel || config.label}
      </label>

      <div className="flex h-[38px] items-center">
        <label className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <input
            id={config.nombre}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${config.nombre}-error` : undefined}
            type="checkbox"
            disabled={disabled}
            {...register(config.nombre, buildRules(config))}
            className="sr-only peer letraTipoLight"
          />

          <span
            aria-hidden="true"
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${disabled ? 'bg-gray-200' : 'bg-gray-300'} peer-checked:bg-[#10B981] peer-focus-visible:ring-2 peer-focus-visible:ring-[#30A5E9] peer-focus-visible:ring-offset-2`}
          />
          <span
            aria-hidden="true"
            className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"
          />
        </label>
      </div>

      {hasError && (
        <div className="flex items-center gap-1">
          <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#EF4444]" />
          <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500">
            {errors[config.nombre].message}
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckboxInput;
