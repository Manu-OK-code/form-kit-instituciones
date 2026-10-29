import { InformationCircleIcon } from '@heroicons/react/24/outline';

const InformationalInput = ({ config }) => {
  const subtitle = typeof config.subtitulo === 'string' ? config.subtitulo.trim() : '';

  return (
    <div
      role="note"
      aria-label={config.label || 'Información'}
      className={`flex w-full items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-3 text-[#0A3A5F] ${subtitle ? 'min-h-[38px] py-2' : 'h-[38px]'}`}
    >
      <InformationCircleIcon aria-hidden="true" className={`h-5 w-5 shrink-0 text-[#0A3A5F] ${subtitle ? 'mt-0.5 self-start' : ''}`} />
      <div className="min-w-0 [overflow-wrap:anywhere]">
        <span className="text-sm font-medium leading-5 letraTipoRegular">
          {config.label || 'Información'}
        </span>
        {subtitle && <p className="mt-1 text-sm font-normal leading-5 letraTipoRegular">{subtitle}</p>}
      </div>
    </div>
  );
};

export default InformationalInput;
