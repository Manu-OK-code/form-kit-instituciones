import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const EmailInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium" style={{ color: labelColor }}>
        {config.customLabel || config.label}
      </label>

      <div className="relative">
        <input
          id={config.nombre}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${config.nombre}-error` : undefined}
          type="email"
          placeholder={config.holder}
          disabled={disabled}
          {...register(config.nombre, buildRules(config))}
          style={{
            color: inputTextColor,
            backgroundColor: disabled ? '#F3F4F6' : inputBgColor,
          }}
          className={`
            w-full px-3 py-2 rounded-lg border text-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? 'cursor-not-allowed' : ''}
            ${hasError ? 'border-red-500 pr-10' : 'border-gray-300'}
            letraTipoLight
          `}
        />

        {hasError && <ExclamationCircleIcon aria-hidden="true" className="absolute right-2 top-2 h-6 w-6 text-red-500" />}
      </div>

      {hasError && <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500 letraTipoRegular">{errors[config.nombre].message}</span>}
    </div>
  );
};

export default EmailInput;
