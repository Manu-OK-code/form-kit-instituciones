import { InformationCircleIcon } from '@heroicons/react/24/outline';

const InformationalTitleInput = ({ config }) => {
  const subtitle = typeof config.subtitulo === 'string' ? config.subtitulo.trim() : '';

  return (
    <div
      role="note"
      aria-label={config.label || 'Título informativo'}
      className={`flex w-full items-center gap-2 text-[#0A3A5F] ${subtitle ? 'min-h-[38px] py-2' : 'h-[38px]'}`}
    >
      <InformationCircleIcon aria-hidden="true" className={`h-5 w-5 shrink-0 ${subtitle ? 'mt-0.5 self-start' : ''}`} />
      <div className="min-w-0 [overflow-wrap:anywhere]">
        <h3 className="text-base font-semibold leading-6 letraTipoRegular">
          {config.label || 'Título informativo'}
        </h3>
        {subtitle && <p className="mt-1 text-sm font-normal leading-5 letraTipoRegular">{subtitle}</p>}
      </div>
    </div>
  );
};

export default InformationalTitleInput;
