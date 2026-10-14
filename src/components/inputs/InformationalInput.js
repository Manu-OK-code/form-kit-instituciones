import { InformationCircleIcon } from '@heroicons/react/24/outline';

const InformationalInput = ({ config }) => (
  <div
    role="note"
    aria-label={config.label || 'Información'}
    className="flex h-[38px] w-full items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-3 text-[#0A3A5F]"
  >
    <InformationCircleIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0A3A5F]" />
    <span className="text-sm font-medium leading-5 letraTipoRegular">
      {config.label || 'Información'}
    </span>
  </div>
);

export default InformationalInput;
