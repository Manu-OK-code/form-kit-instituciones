'use client';

import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CheckboxInput from './CheckboxInput';
import ColorInput from './ColorInput';
import DynamicListInput from './DynamicListInput';
import EmailInput from './EmailInput';
import EstadoBadgeInput from './EstadoBadgeInput';
import InformationalInput from './InformationalInput';
import InformationalTitleInput from './InformationalTitleInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import HyperlinkInput from './HyperlinkInput';
import NumberInput from './NumberInput';
import SelectSearchInput from './SelectSearchInput';
import SelectMultiSearchInput from './SelectMultiSearchInput';
import FileInput from './FileInput';
import RuleBuilder from './RuleBuilder';
import DynamicObjectListInput from './DynamicObjectListInput';
import FechaInput from './FechaInput';
import FileZoneInput from './FileZoneInput';
import FechaHoraInput from './FechaHoraInput';
import RangeDateInput from './RangeDateInput';
import TextSlugInput from './TextSlugInput';
import { evaluateCondition } from '../../utils/evaluateCondition';

const ADVANCED_FIELD_TYPES = new Set(['textoInterno', 'rangoFechas']);
const DETAIL_HIDDEN_TYPES = new Set(['archivo', 'zonaArchivos', 'FileZone']);

const FieldLabel = ({ label, required, note, labelColor }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium letraTipoRegular" style={{ color: labelColor }}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {note && (
        <div className="relative">
          <InformationCircleIcon
            aria-label={note}
            className="h-4 w-4 cursor-help text-gray-400 hover:text-gray-600"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          />
          {open && <div role="tooltip" className="absolute left-0 top-6 z-50 w-56 rounded-md border bg-white p-3 text-xs text-gray-600 shadow-lg">{note}</div>}
        </div>
      )}
    </div>
  );
};

const buildRows = (fields) => {
  const rows = [];
  let currentRow = [];
  let currentWidth = 0;

  fields.forEach((field) => {
    const span = Math.min(field.columna || 12, 12);
    const total = span + (field.columnaOffset || 0);
    if (currentWidth + total > 12) {
      rows.push(currentRow);
      currentRow = [];
      currentWidth = 0;
    }
    currentRow.push(field);
    currentWidth += total;
  });
  if (currentRow.length) rows.push(currentRow);
  return rows;
};

const renderField = (field, sharedProps, advanced) => {
  const config = {
    ...field,
    requerido: !sharedProps.modoDetalle && field.soloDashboard ? false : field.requerido,
    customLabel: <FieldLabel label={field.label} required={field.requerido} note={field.nota} labelColor={sharedProps.labelColor} />,
  };
  const commonProps = { ...sharedProps, config };

  switch (field.tipo) {
    case 'texto': return <TextInput {...commonProps} />;
    case 'textoInterno': return advanced ? <TextSlugInput {...commonProps} /> : null;
    case 'textarea': return <TextAreaInput {...commonProps} />;
    case 'correo': return <EmailInput {...commonProps} />;
    case 'opciones':
    case 'select': return <SelectInput {...commonProps} />;
    case 'checkbox': return <CheckboxInput {...commonProps} />;
    case 'estado': return <EstadoBadgeInput config={field} value={field.valor} />;
    case 'informativo': return <InformationalInput config={field} />;
    case 'tituloInformativo': return <InformationalTitleInput config={field} />;
    case 'listaDinamica': return <DynamicListInput {...commonProps} />;
    case 'color': return <ColorInput {...commonProps} />;
    case 'hipervinculo': return <HyperlinkInput {...commonProps} />;
    case 'numero': return <NumberInput {...commonProps} />;
    case 'selectSearch': return <SelectSearchInput {...commonProps} />;
    case 'selectSearchMultiple': return <SelectMultiSearchInput {...commonProps} />;
    case 'archivo': return <FileInput {...commonProps} />;
    case 'reglas': return <RuleBuilder {...commonProps} />;
    case 'listaObjetos': return <DynamicObjectListInput {...commonProps} />;
    case 'fecha': return <FechaInput {...commonProps} />;
    case 'fechaHora': return <FechaHoraInput {...commonProps} />;
    case 'rangoFechas': return advanced ? <RangeDateInput {...commonProps} /> : null;
    case 'zonaArchivos':
    case 'FileZone': return <FileZoneInput {...commonProps} />;
    default: return null;
  }
};

const renderFieldRows = (rows, sharedProps, advanced) => rows.map((row, rowIndex) => (
  <div key={rowIndex} className="flex w-full flex-col gap-4 md:flex-row">
    {row.map((field) => {
      const span = Math.min(field.columna || 12, 12);
      const offset = field.columnaOffset || 0;
      return (
        <div key={`${field.nombre}-${field.orden}`} className="w-full md:w-auto"
          style={{ flexBasis: `${(span / 12) * 100}%`, marginLeft: offset ? `${(offset / 12) * 100}%` : 0 }}>
          {renderField(field, sharedProps, advanced)}
        </div>
      );
    })}
  </div>
));

const FormBuilder = ({
  fields = [], register, control, errors, isEditing, watch, setValue,
  camposDisponibles = [], labelColor = '#111827', inputTextColor = '#333333',
  inputBgColor = '#F9FAFB', modoDetalle = false, advanced = false, notify = () => {},
}) => {
  const visibleFields = fields.filter((field) => {
    if (!advanced && ADVANCED_FIELD_TYPES.has(field.tipo)) return false;
    if (!modoDetalle && field.soloDashboard) return false;
    if (modoDetalle && DETAIL_HIDDEN_TYPES.has(field.tipo)) return false;
    return evaluateCondition(field.condiciones, watch, {
      fields,
      ignoredFieldTypes: modoDetalle ? [...DETAIL_HIDDEN_TYPES] : [],
    });
  }).sort((first, second) => (first.orden || 0) - (second.orden || 0));
  const sharedProps = {
    register, control, errors, watch, setValue, disabled: !isEditing, camposDisponibles,
    labelColor, inputTextColor, inputBgColor, notify, modoDetalle,
  };
  const rows = buildRows(visibleFields);

  return (
    <div className="form-kit flex w-full flex-col gap-6">
      {renderFieldRows(rows, sharedProps, advanced)}
    </div>
  );
};

export default FormBuilder;
