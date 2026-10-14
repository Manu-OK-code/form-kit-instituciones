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

## Modo avanzado

Configura `NEXT_PUBLIC_FORM_KIT_ADVANCED=true` en el proyecto que necesita los
campos extra y reinicia/reconstruye la aplicación. Pasa esa variable a la prop
`advanced`, como en el ejemplo. En los otros proyectos déjala en `false` o sin
definir.

Antes de instalar el paquete desde el repositorio Git, genera `dist` con
`pnpm build`. La versión instalada en cada consumidor se controla desde su
dependencia `form-kit`.
