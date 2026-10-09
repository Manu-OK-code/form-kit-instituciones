import { buildRules } from "../../utils/buildRules";

const TextInputSlug = ({ config, register, errors, disabled }) => {
  const registerField = register(config.nombre, buildRules(config));

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={config.nombre} className="text-sm font-medium text-gray-600">
        {config.label}
      </label>

      <input
        id={config.nombre}
        type="text"
        placeholder={config.holder}
        disabled={disabled}
        {...registerField}
        onChange={(e) => {
          const value = e.target.value
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9_]/g, "")
            .toLowerCase();

          e.target.value = value;
          registerField.onChange(e);
        }}
        className={`
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${errors[config.nombre] ? "border-red-500" : "border-gray-300"}
        `}
      />

      {errors[config.nombre] && (
        <span className="text-xs text-red-500">
          {errors[config.nombre].message}
        </span>
      )}
    </div>
  );
};

export default TextInputSlug;
