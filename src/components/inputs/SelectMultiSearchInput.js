import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const SelectMultiSearchInput = ({ config, control, errors, disabled }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-600 letraTipoLight">{config.customLabel || config.label} </label>

      <div className="relative">
        <Controller
          name={config.nombre}
          control={control}
          rules={{
            required: config.requerido ? 'Este campo es obligatorio' : false,
          }}
          render={({ field }) => (
            <Select
              inputId={config.nombre}
              aria-errormessage={errors?.[config.nombre] ? `${config.nombre}-error` : undefined}
              options={config.opciones || []}
              isMulti
              isSearchable
              isDisabled={disabled}
              placeholder={config.holder}
              className="text-sm letraTipoLight"
              onChange={(selected) => field.onChange(selected?.map((s) => s.value))}
              value={config.opciones?.filter((opt) => field.value?.includes(opt.value)) || []}
            />
          )}
        />
        {errors?.[config.nombre] && <ExclamationCircleIcon aria-hidden="true" className="absolute right-10 top-2 h-5 w-5 text-[#EF4444]" />}
      </div>

      {errors[config.nombre] && <span id={`${config.nombre}-error`} role="alert" className="text-xs text-red-500">{errors[config.nombre].message}</span>}
    </div>
  );

export default SelectMultiSearchInput;
