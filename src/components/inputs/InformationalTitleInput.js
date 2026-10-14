import { InformationCircleIcon } from '@heroicons/react/24/outline';

const InformationalTitleInput = ({ config }) => (
  <div
    role="note"
    aria-label={config.label || 'Título informativo'}
    className="flex items-center gap-2 text-[#0A3A5F]"
  >
    <InformationCircleIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
    <h3 className="text-base font-semibold leading-6 letraTipoRegular">
      {config.label || 'Título informativo'}
    </h3>
  </div>
);

export default InformationalTitleInput;
