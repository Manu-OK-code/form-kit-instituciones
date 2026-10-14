'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormBuilder } from '../../src/index';

const FORM_FIELDS = [
  { nombre: 'informacionGeneral', label: 'Información general del trámite', tipo: 'informativo', columna: 12, orden: 0 },
  { nombre: 'seccionInstitucion', label: 'Datos de la institución', tipo: 'tituloInformativo', columna: 12, orden: 0.5 },
  { nombre: 'nombre', label: 'Nombre de la institución', tipo: 'texto', requerido: true, holder: 'Ej. Instituto Central', columna: 6, orden: 1 },
  { nombre: 'correo', label: 'Correo de contacto', tipo: 'correo', holder: 'contacto@institucion.gob.gt', columna: 6, orden: 2 },
  { nombre: 'descripcion', label: 'Descripción', tipo: 'textarea', holder: 'Escribe una descripción breve', columna: 12, orden: 3 },
  { nombre: 'tipoEntidad', label: 'Tipo de institución', tipo: 'opciones', requerido: true, opciones: [{ value: 'publica', label: 'Pública' }, { value: 'privada', label: 'Privada' }, { value: 'otro', label: 'Otro' }], columna: 6, orden: 4 },
  { nombre: 'institucionRelacionada', label: 'Institución relacionada', tipo: 'selectSearch', holder: 'Busca una institución', opciones: [{ value: 'minfin', label: 'Ministerio de Finanzas Públicas' }, { value: 'mineduc', label: 'Ministerio de Educación' }, { value: 'mspas', label: 'Ministerio de Salud Pública' }], columna: 6, orden: 5 },
  { nombre: 'areas', label: 'Áreas de atención', tipo: 'selectSearchMultiple', holder: 'Selecciona una o varias áreas', opciones: [{ value: 'legal', label: 'Legal' }, { value: 'tecnica', label: 'Técnica' }, { value: 'financiera', label: 'Financiera' }], columna: 6, orden: 6 },
  { nombre: 'cantidad', label: 'Cantidad de sedes', tipo: 'numero', min: 1, requerido: true, columna: 3, orden: 7 },
  { nombre: 'color', label: 'Color identificador', tipo: 'color', columna: 3, orden: 8 },
  { nombre: 'recibeNotificaciones', label: 'Recibir notificaciones', tipo: 'checkbox', columna: 6, orden: 9 },
  { nombre: 'urlPublica', label: 'Enlace público', tipo: 'hipervinculo', secciones: ['Inicio', 'Requisitos', 'Contacto'], columna: 6, orden: 10 },
  { nombre: 'sistemas', label: 'Sistemas utilizados', tipo: 'listaDinamica', subLabel: 'Sistema', columna: 6, orden: 11 },
  { nombre: 'responsables', label: 'Responsables', tipo: 'listaObjetos', campos: [{ nombre: 'nombre', label: 'Nombre', tipo: 'texto' }, { nombre: 'cargo', label: 'Cargo', tipo: 'texto' }, { nombre: 'area', label: 'Área', tipo: 'select', opciones: [{ value: 'legal', label: 'Legal' }, { value: 'tecnica', label: 'Técnica' }] }], columna: 12, orden: 12 },
  { nombre: 'fechaInicio', label: 'Fecha de inicio', tipo: 'fecha', columna: 6, orden: 13 },
  { nombre: 'fechaReunion', label: 'Fecha y hora de reunión', tipo: 'fechaHora', columna: 6, orden: 14 },
  { nombre: 'documentoPrincipal', label: 'Documento principal', tipo: 'archivo', permitidos: [{ value: 'pdf' }], columna: 6, orden: 15 },
  { nombre: 'anexos', label: 'Documentos anexos', tipo: 'zonaArchivos', permitidos: [{ value: 'pdf' }, { value: 'png' }, { value: 'jpg' }], columna: 6, orden: 16 },
  { nombre: 'condiciones', label: 'Condiciones del campo', tipo: 'reglas', columna: 12, orden: 17 },
  { nombre: 'nombreOtro', label: 'Nombre de otro tipo', tipo: 'texto', holder: 'Especifica el tipo', columna: 6, orden: 18, condiciones: { and: [{ campo: 'tipoEntidad', operador: 'equals', valor: 'otro' }] } },
  { nombre: 'estado', label: 'Estado actual', tipo: 'estado', valor: 'Activo', columna: 6, orden: 19 },
  { nombre: 'soloDashboard', label: 'Campo solo visible en dashboard', tipo: 'texto', holder: 'Solo en modo detalle', soloDashboard: true, columna: 6, orden: 20 },
  { nombre: 'nombreInterno', label: 'Identificador interno (slug)', tipo: 'textoInterno', holder: 'identificador_interno', columna: 6, orden: 21 },
  { nombre: 'rangoFecha', label: 'Filtro por rango de fechas', tipo: 'rangoFechas', columna: 12, orden: 22 },
];

const INITIAL_VALUES = {
  tipoEntidad: 'publica',
  sistemas: [{ value: 'Sistema de gestión' }],
  responsables: [{ nombre: 'Ana Pérez', cargo: 'Coordinadora', area: 'legal' }],
};

const PlaygroundHeader = ({ advanced, readOnly, onAdvancedChange, onReadOnlyChange }) => (
  <header className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">Biblioteca de componentes</p>
      <h1 className="text-3xl font-semibold text-navy">form-kit playground</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        Prueba tipos de campo, validaciones, condiciones y estados de solo lectura en un formulario interactivo.
      </p>
    </div>
    <div className="flex flex-wrap gap-5 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input className="playground-toggle" type="checkbox" checked={advanced} onChange={onAdvancedChange} />
        Tipos avanzados
      </label>
      <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input className="playground-toggle" type="checkbox" checked={readOnly} onChange={onReadOnlyChange} />
        Solo lectura
      </label>
    </div>
  </header>
);

const FormSection = ({ formProps, advanced, readOnly, notify }) => (
  <section className="playground-fieldset">
    <div className="mb-6 border-b border-slate-100 pb-4">
      <h2 className="text-lg font-semibold text-slate-900">Campos del formulario</h2>
      <p className="mt-1 text-sm text-slate-500">Incluye campos editables, informativos y tipos avanzados cuando están activos.</p>
    </div>
    <FormBuilder
      {...formProps}
      fields={FORM_FIELDS}
      camposDisponibles={FORM_FIELDS.map(({ nombre, label }) => ({ nombre, label }))}
      isEditing={!readOnly}
      modoDetalle={readOnly}
      advanced={advanced}
      notify={notify}
    />
  </section>
);

const PlaygroundActions = ({ readOnly, notice, onReset }) => (
  <div className="flex flex-wrap items-center gap-3">
    {!readOnly && (
      <button className="playground-button rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
        Validar formulario
      </button>
    )}
    <button className="playground-button rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={onReset}>
      Reiniciar
    </button>
    {notice && <p role="status" className="text-sm text-slate-600">{notice}</p>}
  </div>
);

const PlaygroundFooter = ({ advanced, readOnly }) => (
  <footer className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs text-slate-500">
    <span>Versión local: form-kit 0.3.0</span>
    <span>Avanzados: {advanced ? 'activos' : 'inactivos'}</span>
    <span>Modo: {readOnly ? 'solo lectura' : 'edición'}</span>
  </footer>
);

const PlaygroundPage = () => {
  const configuredAdvanced = process.env.NEXT_PUBLIC_FORM_KIT_ADVANCED;
  const initialAdvanced = configuredAdvanced === undefined || configuredAdvanced === 'true';
  const [advanced, setAdvanced] = useState(initialAdvanced);
  const [readOnly, setReadOnly] = useState(false);
  const [notice, setNotice] = useState('');
  const { register, control, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    mode: 'onBlur',
  });

  const submitForm = (values) => {
    setNotice(`Formulario válido. ${Object.keys(values).length} campos con valor.`);
  };

  const notify = ({ type, message }) => {
    setNotice(`${type === 'error' ? 'Error' : 'Aviso'}: ${message}`);
  };
  const resetForm = () => {
    reset(INITIAL_VALUES);
    setNotice('Formulario reiniciado.');
  };
  const formProps = { register, control, errors, watch, setValue };

  return (
    <main className="playground-shell">
      <PlaygroundHeader
        advanced={advanced}
        readOnly={readOnly}
        onAdvancedChange={(event) => setAdvanced(event.target.checked)}
        onReadOnlyChange={(event) => setReadOnly(event.target.checked)}
      />

      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <FormSection formProps={formProps} advanced={advanced} readOnly={readOnly} notify={notify} />
        <PlaygroundActions readOnly={readOnly} notice={notice} onReset={resetForm} />
      </form>

      <PlaygroundFooter advanced={advanced} readOnly={readOnly} />
    </main>
  );
};

export default PlaygroundPage;
