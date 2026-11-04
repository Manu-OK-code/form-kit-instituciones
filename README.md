# form-kit

Biblioteca compartida de formularios para `registro-nuevo`, `dashboard` y
`deploys/tools/configuracion-tramites`. Requiere React Hook Form en la
aplicación consumidora y conserva los nombres de tipos de campo usados por los
tres proyectos.

## Ejecutar el playground

El playground muestra los tipos comunes y avanzados con controles para cambiar
entre modo edición y solo lectura. Desde la carpeta `form-kit` ejecuta:

```bash
pnpm --dir playground install
pnpm dev
```

Abre `http://localhost:3005`. Los tipos avanzados aparecen activos de inicio en
el playground; usa el interruptor para ocultarlos y comparar los modos. El
playground carga directamente `src/`, así que los cambios en los componentes se
reflejan con recarga rápida sin reconstruir el paquete.

## Tipos compatibles

Tipos comunes: `texto`, `textarea`, `correo`, `opciones`/`select`, `checkbox`,
`informativo`, `tituloInformativo`, `estado`, `listaDinamica`, `color`,
`hipervinculo`, `numero`, `selectSearch`,
`selectSearchMultiple`, `archivo`, `reglas`, `listaObjetos`, `fecha`,
`fechaHora` y `zonaArchivos`/`FileZone`.

Con el modo avanzado se habilitan `textoInterno` (campo slug) y `rangoFechas`.
El campo `soloDashboard` y el modo de solo lectura `modoDetalle` conservan el
comportamiento usado por el dashboard.

El tipo `informativo` muestra únicamente su `label` como una nota visual. No
registra un control en React Hook Form ni agrega un valor al enviar el formulario.
Por ejemplo: `{ nombre: 'informacionGeneral', label: 'Información general', tipo: 'informativo' }`.
El tipo `tituloInformativo` muestra el título y un ícono, sin fondo ni controles
de formulario: `{ nombre: 'seccionInstitucion', label: 'Datos de la institución', tipo: 'tituloInformativo' }`.

Desde la versión `0.4.0`, ambos tipos admiten `subtitulo` como texto opcional
debajo de `label`:

```js
{ nombre: 'seccionInstitucion', label: 'Datos de la institución', subtitulo: 'Completa los datos de contacto para recibir seguimiento.', tipo: 'tituloInformativo' }
{ nombre: 'requisitos', label: 'Antes de comenzar', subtitulo: 'Ten a mano los documentos de identificación.', tipo: 'informativo' }
```

Si `subtitulo` no existe, está vacío o contiene solo espacios, se muestra únicamente
el título. El contenido se presenta como texto, sin interpretar HTML. Los títulos
y subtítulos son informativos y no agregan respuestas al envío del formulario.
El playground incluye una sección inicial para comparar ambos tipos con y sin
subtítulo.

## Uso

```jsx
import { FormBuilder } from 'form-kit';
import 'form-kit/styles.css';

<FormBuilder
  fields={fields}
  register={register}
  control={control}
  errors={errors}
  watch={watch}
  setValue={setValue}
  advanced={process.env.NEXT_PUBLIC_FORM_KIT_ADVANCED === 'true'}
  isEditing
  notify={notify}
/>
```

En Next.js, Tailwind debe escanear las clases publicadas por la librería:

```js
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/form-kit/dist/**/*.js',
]
```

La aplicación debe cargar las fuentes institucionales `Br` que ya utiliza. El
paquete usa `Br Regular` y cae a Inter/sans-serif mientras una fuente no esté
disponible.

## Reglas entre steps (0.5.0)

`FormBuilder` admite `ruleSteps`, `currentStepId` y `resolveConditionValue`.
El editor de reglas recibe `ruleSteps` como un arreglo de
`{ stepId, label, fields: [{ nombre, label }] }`. El consumidor entrega solo
el step actual y los anteriores, en el orden del trámite. Cada fila AND/OR
guarda `{ stepId, campo, operador, valor }`; cambiar de step limpia el campo.
Las referencias no disponibles se muestran y deben corregirse antes de guardar.

Las reglas antiguas sin `stepId` muestran `currentStepId` sin agregar una
referencia al abrirlas. `camposDisponibles` sigue soportando el editor de un
solo step cuando no se proporcionan `ruleSteps`.
El formato heredado `operador`/`reglas` conserva su grupo y sus reglas al editarlo.

Para evaluar, pasa `resolveConditionValue(fieldName, stepId)` con los valores
del trámite agrupados por step. Una regla sin `stepId` invoca el resolvedor con
solo el nombre del campo, en el contexto del step actual. El consumidor resuelve
los IDs a sus grupos y devuelve `undefined` para una referencia no disponible.
Los valores actuales deben leerse con `watch(fieldName)` para que los cambios
del formulario actualicen la visibilidad. Sin resolvedor se conserva el uso de
`watch` de un solo step. `currentStepId` también delimita las excepciones de
campos de archivo en modo detalle, evitando confundir campos homónimos de otro step.
El playground incluye un editor y un campo condicionado por el step anterior.

## Modo avanzado

Configura `NEXT_PUBLIC_FORM_KIT_ADVANCED=true` en el proyecto que necesita los
campos extra y reinicia/reconstruye la aplicación. Pasa esa variable a la prop
`advanced`, como en el ejemplo. En los otros proyectos déjala en `false` o sin
definir.

Antes de instalar el paquete desde el repositorio Git, genera `dist` con
`pnpm build`. La versión instalada en cada consumidor se controla desde su
dependencia `form-kit`.
