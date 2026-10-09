import { useWatch } from 'react-hook-form';
import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const HyperlinkInput = ({ config, register, control, errors, disabled }) => {
  // Observamos el valor del enlace
  const linkValue = useWatch({
    control,
    name: `${config.nombre}.url`,
  });

  const secciones = config.secciones || [];

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={`${config.nombre}.label`} className="text-sm font-medium text-gray-600">{config.customLabel || config.label}</label>

      <div className="relative">
        <input
          id={`${config.nombre}.label`}
          aria-invalid={!!errors?.[config.nombre]?.label}
          aria-describedby={errors?.[config.nombre]?.label ? `${config.nombre}-label-error` : undefined}
          type="text"
          placeholder={config.holder || 'Nombre del enlace'}
          disabled={disabled}
          {...register(`${config.nombre}.label`, buildRules(config))}
          className={`
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${errors?.[config.nombre]?.label ? 'border-red-500' : 'border-gray-300'}
        `}
        />
        {errors?.[config.nombre]?.label && <ExclamationCircleIcon aria-hidden="true" className="absolute right-2 top-2 h-5 w-5 text-[#EF4444]" />}
      </div>

      {/* URL */}
      <div className="relative">
        <input
          id={`${config.nombre}.url`}
          aria-invalid={!!errors?.[config.nombre]?.url}
          aria-describedby={errors?.[config.nombre]?.url ? `${config.nombre}-url-error` : undefined}
          type="text"
          placeholder={config.urlHolder || 'https://ejemplo.com o #'}
          disabled={disabled}
          {...register(`${config.nombre}.url`, buildRules(config))}
          className={`
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${errors?.[config.nombre]?.url ? 'border-red-500' : 'border-gray-300'}
        `}
        />
        {errors?.[config.nombre]?.url && <ExclamationCircleIcon aria-hidden="true" className="absolute right-2 top-2 h-5 w-5 text-[#EF4444]" />}
      </div>

      {linkValue === '#' && (
        <select
          id={`${config.nombre}.section`}
          disabled={disabled}
          {...register(`${config.nombre}.section`)}
          className="px-3 py-2 rounded-lg border text-sm bg-white border-gray-300"
        >
          <option value="">Seleccionar sección</option>
          {secciones.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      )}

      {errors?.[config.nombre]?.label && (
        <span id={`${config.nombre}-label-error`} role="alert" className="text-xs text-red-500">{errors[config.nombre].label.message}</span>
      )}

      {errors?.[config.nombre]?.url && (
        <span id={`${config.nombre}-url-error`} role="alert" className="text-xs text-red-500">{errors[config.nombre].url.message}</span>
      )}
    </div>
  );
};

export default HyperlinkInput;
