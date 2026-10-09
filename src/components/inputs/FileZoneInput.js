import { useRef } from 'react';
import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ALLOWED_EXTENSIONS, MAX_FILES_IN_ZONE, MAX_FILE_SIZE_MB } from '../../constants/formLimits';

const FileZone = ({ config, register, errors, disabled, watch, setValue, notify = () => {} }) => {
  const inputRef = useRef(null);

  const files = watch(config.nombre) || {};
  const fileList = Object.values(files || {});

  const validateFiles = (incomingFiles) => {
    const validFiles = [];

    const allowedExtensions = config.permitidos?.map((p) => p.value.toLowerCase()) || ALLOWED_EXTENSIONS;

    for (const file of incomingFiles) {
      if (!(file instanceof File)) continue;

      const extension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        notify({
          type: 'error',
          message: `El archivo "${file.name}" no es un tipo permitido.`,
        });
        continue;
      }

      if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
        notify({
          type: 'error',
          message: `El archivo "${file.name}" supera los ${MAX_FILE_SIZE_MB} MB permitidos.`,
        });
        continue;
      }

      validFiles.push(file);
    }

    if (incomingFiles.length + fileList.length > MAX_FILES_IN_ZONE) {
      notify({
        type: 'warning',
        message: `Solo se permiten ${MAX_FILES_IN_ZONE} archivos.`,
      });
    }

    const merged = [...fileList.filter((f) => f instanceof File), ...validFiles].slice(0, MAX_FILES_IN_ZONE);

    const filesObject = {};

    merged.forEach((file, index) => {
      filesObject[`documento${index + 1}`] = file;
    });

    return filesObject;
  };
  const handleFiles = (event) => {
    const incoming = Array.from(event.target.files || []);
    const validated = validateFiles(incoming);

    setValue(config.nombre, validated, { shouldValidate: true });
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (disabled) return;

    const incoming = Array.from(event.dataTransfer.files || []);
    const validated = validateFiles(incoming);

    setValue(config.nombre, validated, { shouldValidate: true });
  };

  const removeFile = (index) => {
    const updatedList = fileList.filter((_, i) => i !== index);

    const filesObject = {};

    updatedList.forEach((file, i) => {
      filesObject[`documento${i + 1}`] = file;
    });

    setValue(config.nombre, filesObject, { shouldValidate: true });
  };

  const openFileSelector = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFileName = (file, index) => {
    if (file instanceof File) return file.name;

    if (typeof file === 'string') return `documento${index + 1}.${file}`;

    return `documento${index + 1}`;
  };

  const getFileSize = (file) => {
    if (!(file instanceof File)) return null;

    return (file.size / (1024 * 1024)).toFixed(2);
  };

  const { ref: registerRef, ...restRegister } = register(config.nombre, {
    validate: (value) => {
      const files = Object.values(value || {});
      return files.length > 0 || 'Debe adjuntar al menos un archivo';
    },
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-700">{config.customLabel || config.label}</label>

      <div
        onClick={openFileSelector}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`
          border-2 border-dashed rounded-xl p-6 transition text-center cursor-pointer
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-blue-400 hover:bg-blue-50'}
          ${errors?.[config.nombre] ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <input
          id={config.nombre}
          aria-invalid={!!errors?.[config.nombre]}
          aria-describedby={errors?.[config.nombre] ? `${config.nombre}-error` : undefined}
          type="file"
          multiple
          disabled={disabled}
          accept={config.permitidos?.map((p) => '.' + p.value).join(',')}
          className="hidden"
          {...restRegister}
          ref={(e) => {
            registerRef(e);
            inputRef.current = e;
          }}
          onChange={handleFiles}
        />

        <p className="text-sm text-blue-600 font-medium">Arrastra archivos aquí o haz clic para subir</p>

        <p className="text-xs text-gray-500 mt-1">
          Máximo {MAX_FILES_IN_ZONE} archivos • {MAX_FILE_SIZE_MB} MB por archivo
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Archivos permitidos: {config.permitidos?.map((p) => p.value.toUpperCase()).join(', ')}
        </p>
      </div>

      {fileList.length > 0 && (
        <div className="flex flex-col gap-2">
          {fileList.map((file, index) => {
            const size = getFileSize(file);

            return (
              <div key={index} className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <DocumentIcon className="w-5 h-5 text-gray-500" />

                  <span className="text-sm truncate max-w-[220px]">{getFileName(file, index)}</span>

                  {size && <span className="text-xs text-gray-400">({size} MB)</span>}
                </div>

                {!disabled && (
                  <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {errors?.[config.nombre] && (
        <div className="flex items-center gap-1 text-[#EF4444]">
          <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5" />
          <span id={`${config.nombre}-error`} role="alert" className="text-xs letraTipoRegular">{errors[config.nombre].message}</span>
        </div>
      )}
    </div>
  );
};

export default FileZone;
