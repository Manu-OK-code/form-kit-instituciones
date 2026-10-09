# AGENTS.md — form-kit

## Objetivo

Mantener una única biblioteca reutilizable de formularios para los proyectos
institucionales. Los componentes deben conservar los contratos de campos y la
apariencia empresarial existentes.

## Estructura

- `src/components/inputs/`: componentes React y `FormBuilder`.
- `src/constants/`: límites y valores estáticos del formulario.
- `src/utils/`: validación y evaluación de condiciones puras.
- `src/index.js`: API pública del paquete.
- `src/styles.css`: estilos base y tipografía del paquete.
- `playground/`: aplicación local para visualizar todos los tipos de campo.

## Código

- JavaScript y JSX con ES Modules. No agregar TypeScript sin necesidad justificada.
- Componentes en PascalCase; variables y funciones en camelCase; constantes en
  UPPER_SNAKE_CASE.
- Usar funciones flecha, `const`, early returns y nombres descriptivos en inglés.
- Mantener funciones por debajo de 50 líneas y componentes por debajo de 200;
  extraer lógica reutilizable a `src/utils/`.
- Evitar dependencias de alias, contextos o servicios de una aplicación
  consumidora. Recibir integraciones variables como props.
- `react`, `react-dom`, `react-hook-form`, `react-datepicker`, `react-select`,
  `date-fns` y Heroicons son dependencias peer, para evitar copias incompatibles.

## Contrato de campos

- Mantener compatibilidad con los tipos compartidos por `registro-nuevo`,
  `dashboard` y `deploys/tools/configuracion-tramites`.
- `textoInterno` y `rangoFechas` son avanzados; solo deben mostrarse con
  `advanced` activo.
- Cada aplicación controla la prop `advanced` con
  `NEXT_PUBLIC_FORM_KIT_ADVANCED === 'true'` en su entorno cliente.
- Las notificaciones deben recibirse mediante `notify`; no importar contextos
  de los consumidores.

## Interfaz

- Mantener paleta institucional: `#30A5E9`, `#0A3A5F`, `#F9FAFB`, `#333333`,
  `#EF4444` y `#10B981`.
- Usar `Br Regular` como primera opción tipográfica, con fallback a Inter y
  sans-serif. Las fuentes se cargan desde cada aplicación consumidora.
- Conservar labels asociados, mensajes de error accesibles y estados disabled.
- Mantener diseño formal, responsive y coherente entre aplicaciones.

## Publicación e instalación

- Usar pnpm y Node `>=22.23.1`.
- Construir `dist` con `pnpm build` antes de publicar/instalar desde Git.
- Actualizar la versión del paquete cuando cambie su API y registrar esa versión
  explícitamente en cada consumidor al integrarlo.
- Mantener el README actualizado con cambios de API o configuración.
- Mantener el playground actualizado con al menos un ejemplo por tipo público;
  debe importar `src/` para reflejar los cambios durante el desarrollo.
