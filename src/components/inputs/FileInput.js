import { Controller } from 'react-hook-form';
import { buildRules } from '../../utils/buildRules';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB } from '../../constants/formLimits';

const FileInput = ({ config, control, errors, disabled, notify = () => {} }) => {

  const hasError = !!errors?.[config.nombre];

  const validateFile = (file) => {
    if (!file) {
      return null;
    }

    const allowedExtensions = config.permitidos?.map((p) => p.value.toLowerCase()) || ALLOWED_EXTENSIONS;

    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      notify({
        type: 'error',
        message: `El archivo "${file.name}" no es un tipo permitido.`,
      });

      return null;
    }

    if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      notify({
        type: 'error',
        message: `El archivo "${file.name}" supera los ${MAX_FILE_SIZE_MB} MB permitidos.`,
      });

      return null;
    }

    return file;
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-600">{config.customLabel || config.label}</label>

      <div className="relative">
        <Controller
          name={config.nombre}
          control={control}
          rules={buildRules(config)}
          render={({ field: { onChange, ref } }) => (
            <input
              id={config.nombre}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${config.nombre}-error` : undefined}
              ref={ref}
              type="file"
              accept={config.permitidos?.map((p) => `.${p.value}`).join(',')}
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;

                const validated = validateFile(file);

                if (!validated) {
                  e.target.value = '';
                }

                onChange(validated);
              }}
              className={`
                w-full px-3 py-2 rounded-lg border text-sm transition
                file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0
                file:text-sm file:bg-blue-50 file:text-blue-600
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                ${hasError ? 'border-red-500 pr-10' : 'border-gray-300'}
                letraTipoLight
              `}
            />
          )}
        />

        {hasError && (
          <ExclamationCircleIcon aria-hidden="true" className="absolute right-2 top-2 h-6 w-6 text-red-500 pointer-events-none" />
        )}
      </div>

      <div className="text-xs text-gray-500">Máximo {MAX_FILE_SIZE_MB} MB por archivo</div>

      {config.permitidos?.length > 0 && (
        <div className="text-xs text-gray-500">
          Archivos permitidos: {config.permitidos.map((p) => p.value.toUpperCase()).join(', ')}
        </div>
      )}

      {hasError && <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500 letraTipoRegular">{errors[config.nombre].message}</span>}
    </div>
  );
};

export default FileInput;
