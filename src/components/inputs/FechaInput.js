import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { registerLocale } from 'react-datepicker';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const FechaInput = ({ config, control, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium" style={{ color: labelColor }}>
        {config.customLabel || config.label}
      </label>

      <div className="relative w-full">
        <Controller
          control={control}
          name={config.nombre}
          rules={{
            required: config.requerido ? 'Este campo es requerido' : false,
          }}
          render={({ field }) => (
            <DatePicker
              locale="es"
              id={config.nombre}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${config.nombre}-error` : undefined}
              placeholderText={config.holder || 'dd/mm/aaaa'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              onChangeRaw={(e) => {
                if (!e?.target?.value) return;

                const cleaned = e.target.value.replace(/[^0-9/]/g, '');
                e.target.value = cleaned;
              }}
              disabled={disabled}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              autoComplete="off"
              style={{
                color: inputTextColor,
                backgroundColor: disabled ? '#F3F4F6' : inputBgColor,
              }}
              wrapperClassName="w-full"
              className={`
          w-full px-3 py-2 rounded-lg border text-sm transition
          focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
          ${disabled ? 'cursor-not-allowed' : ''}
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

      {hasError && <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500 letraTipoRegular">{errors[config.nombre].message}</span>}
    </div>
  );
};

export default FechaInput;
