const EstadoBadgeInput = ({ config, value }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600 letraTipoLight">{config.customLabel || config.label}</label>

      <span
        className={`
          inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium
          ${value ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'} letraTipoLight
        `}
      >
        {value ? 'Activo' : 'No configurado'}
      </span>
    </div>
  );

export default EstadoBadgeInput;
