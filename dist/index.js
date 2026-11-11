// src/components/inputs/FormBuilder.js
import { useState } from "react";
import { InformationCircleIcon as InformationCircleIcon3 } from "@heroicons/react/24/outline";

// src/utils/buildRules.js
var buildRules = (field, options = {}) => {
  const rules = {};
  const { directFieldRules = true, numericMinimum = true } = options;
  if (field.requerido) {
    rules.required = "Este campo es requerido";
  }
  if (directFieldRules && field.minLength) {
    rules.minLength = {
      value: Number(field.minLength),
      message: `M\xEDnimo ${field.minLength} caracteres`
    };
  }
  if (directFieldRules && field.maxLength) {
    rules.maxLength = {
      value: Number(field.maxLength),
      message: `M\xE1ximo ${field.maxLength} caracteres`
    };
  }
  if (directFieldRules && field.pattern) {
    rules.pattern = {
      value: new RegExp(field.pattern),
      message: "Formato inv\xE1lido"
    };
  }
  field.reglas?.forEach((regla) => {
    if (regla.tipo === "minLength" || regla.tipo === "maxLength") {
      const minimum = regla.tipo === "minLength";
      const key = minimum ? "minLength" : "maxLength";
      const label = minimum ? "M\xEDnimo" : "M\xE1ximo";
      rules[key] = {
        value: regla.valor,
        message: `${label} ${regla.valor} caracteres`
      };
      return;
    }
    if (regla.tipo === "min" && numericMinimum) {
      rules.min = {
        value: Number(regla.valor),
        message: regla.mensaje || `El valor m\xEDnimo es ${regla.valor}`
      };
      return;
    }
    if (regla.tipo === "pattern") {
      rules.pattern = {
        value: new RegExp(regla.valor),
        message: regla.mensaje || "Formato inv\xE1lido"
      };
    }
  });
  return rules;
};

// src/components/inputs/CheckboxInput.js
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { jsx, jsxs } from "react/jsx-runtime";
var CheckboxInput = ({ config, register, errors, disabled }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-700", children: config.customLabel || config.label }),
    /* @__PURE__ */ jsx("div", { className: "flex h-[38px] items-center", children: /* @__PURE__ */ jsxs("label", { className: `relative inline-flex h-11 w-11 shrink-0 items-center justify-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          type: "checkbox",
          disabled,
          ...register(config.nombre, buildRules(config)),
          className: "sr-only peer letraTipoLight"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `relative h-6 w-11 rounded-full transition-colors duration-200 ${disabled ? "bg-gray-200" : "bg-gray-300"} peer-checked:bg-[#10B981] peer-focus-visible:ring-2 peer-focus-visible:ring-[#30A5E9] peer-focus-visible:ring-offset-2`
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": "true",
          className: "absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"
        }
      )
    ] }) }),
    hasError && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(ExclamationCircleIcon, { "aria-hidden": "true", className: "h-5 w-5 shrink-0 text-[#EF4444]" }),
      /* @__PURE__ */ jsx("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500", children: errors[config.nombre].message })
    ] })
  ] });
};
var CheckboxInput_default = CheckboxInput;

// src/components/inputs/ColorInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon2 } from "@heroicons/react/24/outline";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ColorInput = ({ config, register, errors, disabled }) => /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1", children: [
  /* @__PURE__ */ jsx2("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-600", children: config.customLabel || config.label }),
  /* @__PURE__ */ jsxs2("div", { className: "relative flex items-center gap-3", children: [
    /* @__PURE__ */ jsx2(
      "input",
      {
        id: config.nombre,
        "aria-invalid": !!errors?.[config.nombre],
        "aria-describedby": errors?.[config.nombre] ? `${config.nombre}-error` : void 0,
        type: "color",
        disabled,
        ...register(config.nombre, buildRules(config)),
        className: "w-14 h-10 rounded-lg border border-gray-300 cursor-pointer disabled:opacity-50 letraTipoLight"
      }
    ),
    /* @__PURE__ */ jsx2("span", { className: "text-sm text-gray-500 letraTipoLight", children: "Selecciona un color identificador" }),
    errors?.[config.nombre] && /* @__PURE__ */ jsx2(ExclamationCircleIcon2, { "aria-hidden": "true", className: "absolute right-2 h-5 w-5 text-[#EF4444]" })
  ] }),
  errors[config.nombre] && /* @__PURE__ */ jsx2("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
] });
var ColorInput_default = ColorInput;

// src/components/inputs/DynamicListInput.js
import { useFieldArray } from "react-hook-form";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DynamicListInput = ({ config, register, control, errors, disabled }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: config.nombre
  });
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx3("label", { className: "text-sm font-medium text-gray-700", children: config.customLabel || config.label }),
    /* @__PURE__ */ jsx3("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs3("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx3("thead", { className: "bg-gray-100 text-gray-600", children: /* @__PURE__ */ jsxs3("tr", { children: [
        /* @__PURE__ */ jsx3("th", { className: "px-4 py-2 text-left w-12", children: "#" }),
        /* @__PURE__ */ jsx3("th", { className: "px-4 py-2 text-left", children: config.subLabel || "Valor" }),
        /* @__PURE__ */ jsx3("th", { className: "px-4 py-2 text-right w-20", children: "Acci\xF3n" })
      ] }) }),
      /* @__PURE__ */ jsx3("tbody", { children: fields.length === 0 ? /* @__PURE__ */ jsx3("tr", { children: /* @__PURE__ */ jsx3("td", { colSpan: "3", className: "text-center py-6 text-gray-400", children: "No hay registros" }) }) : fields.map((item, index) => /* @__PURE__ */ jsxs3("tr", { className: "border-t hover:bg-gray-50 transition", children: [
        /* @__PURE__ */ jsx3("td", { className: "px-4 py-2 text-gray-500", children: index + 1 }),
        /* @__PURE__ */ jsxs3("td", { className: "px-4 py-2", children: [
          /* @__PURE__ */ jsx3(
            "input",
            {
              type: "text",
              disabled,
              ...register(`${config.nombre}.${index}.value`, {
                required: config.requerido
              }),
              className: `
                        w-full px-2 py-1 border rounded-md text-sm
                        ${errors?.[config.nombre]?.[index]?.value ? "border-red-500" : "border-gray-300"}
                        ${disabled ? "bg-gray-100" : "bg-white"}
                      `
            }
          ),
          errors?.[config.nombre]?.[index]?.value && /* @__PURE__ */ jsx3("span", { className: "text-xs text-red-500", children: "Campo requerido" })
        ] }),
        /* @__PURE__ */ jsx3("td", { className: "px-4 py-2 text-right", children: !disabled && /* @__PURE__ */ jsx3("button", { type: "button", onClick: () => remove(index), className: "text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx3(TrashIcon, { className: "w-5 h-5 inline" }) }) })
      ] }, item.id)) })
    ] }) }),
    !disabled && /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        onClick: () => append({ value: "" }),
        className: "flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm w-fit hover:bg-gray-800 transition",
        children: [
          /* @__PURE__ */ jsx3(PlusIcon, { className: "w-4 h-4" }),
          "Agregar ",
          config.subLabel || "registro"
        ]
      }
    )
  ] });
};
var DynamicListInput_default = DynamicListInput;

// src/components/inputs/EmailInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon3 } from "@heroicons/react/24/outline";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var EmailInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx4("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs4("div", { className: "relative", children: [
      /* @__PURE__ */ jsx4(
        "input",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          type: "email",
          placeholder: config.holder,
          disabled,
          ...register(config.nombre, buildRules(config)),
          style: {
            color: inputTextColor,
            backgroundColor: disabled ? "#F3F4F6" : inputBgColor
          },
          className: `
            w-full px-3 py-2 rounded-lg border text-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
            ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
            letraTipoLight
          `
        }
      ),
      hasError && /* @__PURE__ */ jsx4(ExclamationCircleIcon3, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500" })
    ] }),
    hasError && /* @__PURE__ */ jsx4("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var EmailInput_default = EmailInput;

// src/components/inputs/EstadoBadgeInput.js
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var EstadoBadgeInput = ({ config, value }) => /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-1", children: [
  /* @__PURE__ */ jsx5("label", { className: "text-sm font-medium text-gray-600 letraTipoLight", children: config.customLabel || config.label }),
  /* @__PURE__ */ jsx5(
    "span",
    {
      className: `
          inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium
          ${value ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"} letraTipoLight
        `,
      children: value ? "Activo" : "No configurado"
    }
  )
] });
var EstadoBadgeInput_default = EstadoBadgeInput;

// src/components/inputs/InformationalInput.js
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var InformationalInput = ({ config }) => {
  const subtitle = typeof config.subtitulo === "string" ? config.subtitulo.trim() : "";
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      role: "note",
      "aria-label": config.label || "Informaci\xF3n",
      className: `flex w-full items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-3 text-[#0A3A5F] ${subtitle ? "min-h-[38px] py-2" : "h-[38px]"}`,
      children: [
        /* @__PURE__ */ jsx6(InformationCircleIcon, { "aria-hidden": "true", className: `h-5 w-5 shrink-0 text-[#0A3A5F] ${subtitle ? "mt-0.5 self-start" : ""}` }),
        /* @__PURE__ */ jsxs6("div", { className: "min-w-0 [overflow-wrap:anywhere]", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm font-medium leading-5 letraTipoRegular", children: config.label || "Informaci\xF3n" }),
          subtitle && /* @__PURE__ */ jsx6("p", { className: "mt-1 text-sm font-normal leading-5 letraTipoRegular", children: subtitle })
        ] })
      ]
    }
  );
};
var InformationalInput_default = InformationalInput;

// src/components/inputs/InformationalTitleInput.js
import { InformationCircleIcon as InformationCircleIcon2 } from "@heroicons/react/24/outline";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var InformationalTitleInput = ({ config }) => {
  const subtitle = typeof config.subtitulo === "string" ? config.subtitulo.trim() : "";
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      role: "note",
      "aria-label": config.label || "T\xEDtulo informativo",
      className: `flex w-full items-center gap-2 text-[#0A3A5F] ${subtitle ? "min-h-[38px] py-2" : "h-[38px]"}`,
      children: [
        /* @__PURE__ */ jsx7(InformationCircleIcon2, { "aria-hidden": "true", className: `h-5 w-5 shrink-0 ${subtitle ? "mt-0.5 self-start" : ""}` }),
        /* @__PURE__ */ jsxs7("div", { className: "min-w-0 [overflow-wrap:anywhere]", children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-base font-semibold leading-6 letraTipoRegular", children: config.label || "T\xEDtulo informativo" }),
          subtitle && /* @__PURE__ */ jsx7("p", { className: "mt-1 text-sm font-normal leading-5 letraTipoRegular", children: subtitle })
        ] })
      ]
    }
  );
};
var InformationalTitleInput_default = InformationalTitleInput;

// src/components/inputs/SelectInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon4 } from "@heroicons/react/24/outline";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var SelectInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs8("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx8("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs8("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs8(
        "select",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          disabled,
          ...register(config.nombre, buildRules(config)),
          style: {
            color: inputTextColor,
            backgroundColor: disabled ? "#F3F4F6" : inputBgColor
          },
          className: `
            w-full px-3 py-2 rounded-lg border text-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
            ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
            letraTipoLight
          `,
          children: [
            /* @__PURE__ */ jsx8("option", { value: "", children: "Seleccione..." }),
            config.opciones?.map((op) => /* @__PURE__ */ jsx8("option", { value: op.value, children: op.label }, op.value))
          ]
        }
      ),
      hasError && /* @__PURE__ */ jsx8(ExclamationCircleIcon4, { "aria-hidden": "true", className: "absolute right-8 top-2 h-6 w-6 text-red-500 pointer-events-none" })
    ] }),
    hasError && /* @__PURE__ */ jsx8("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var SelectInput_default = SelectInput;

// src/components/inputs/TextAreaInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon5 } from "@heroicons/react/24/outline";
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
var TextAreaInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs9("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx9("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs9("div", { className: "relative", children: [
      /* @__PURE__ */ jsx9(
        "textarea",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          placeholder: config.holder,
          disabled,
          rows: config.rows || 4,
          ...register(config.nombre, buildRules(config)),
          style: {
            color: inputTextColor,
            backgroundColor: disabled ? "#F3F4F6" : inputBgColor
          },
          className: `
            w-full px-3 py-3 rounded-lg border text-sm transition resize-none
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
            ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
            letraTipoLight
          `
        }
      ),
      hasError && /* @__PURE__ */ jsx9(ExclamationCircleIcon5, { "aria-hidden": "true", className: "absolute right-2 top-3 h-6 w-6 text-red-500" })
    ] }),
    hasError && /* @__PURE__ */ jsx9("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var TextAreaInput_default = TextAreaInput;

// src/components/inputs/TextInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon6 } from "@heroicons/react/24/outline";
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
var TextInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx10("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
      /* @__PURE__ */ jsx10(
        "input",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          type: "text",
          placeholder: config.holder,
          disabled,
          ...register(config.nombre, buildRules(config)),
          style: {
            color: inputTextColor,
            backgroundColor: disabled ? "#F3F4F6" : inputBgColor
          },
          className: `
            w-full px-3 py-2 rounded-lg border text-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
            ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
            letraTipoLight
          `
        }
      ),
      hasError && /* @__PURE__ */ jsx10(ExclamationCircleIcon6, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500" })
    ] }),
    hasError && /* @__PURE__ */ jsx10("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 mt-1 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var TextInput_default = TextInput;

// src/components/inputs/HyperlinkInput.js
import { useWatch } from "react-hook-form";
import { ExclamationCircleIcon as ExclamationCircleIcon7 } from "@heroicons/react/24/outline";
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
var HyperlinkInput = ({ config, register, control, errors, disabled }) => {
  const linkValue = useWatch({
    control,
    name: `${config.nombre}.url`
  });
  const secciones = config.secciones || [];
  return /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsx11("label", { htmlFor: `${config.nombre}.label`, className: "text-sm font-medium text-gray-600", children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs11("div", { className: "relative", children: [
      /* @__PURE__ */ jsx11(
        "input",
        {
          id: `${config.nombre}.label`,
          "aria-invalid": !!errors?.[config.nombre]?.label,
          "aria-describedby": errors?.[config.nombre]?.label ? `${config.nombre}-label-error` : void 0,
          type: "text",
          placeholder: config.holder || "Nombre del enlace",
          disabled,
          ...register(`${config.nombre}.label`, buildRules(config)),
          className: `
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${errors?.[config.nombre]?.label ? "border-red-500" : "border-gray-300"}
        `
        }
      ),
      errors?.[config.nombre]?.label && /* @__PURE__ */ jsx11(ExclamationCircleIcon7, { "aria-hidden": "true", className: "absolute right-2 top-2 h-5 w-5 text-[#EF4444]" })
    ] }),
    /* @__PURE__ */ jsxs11("div", { className: "relative", children: [
      /* @__PURE__ */ jsx11(
        "input",
        {
          id: `${config.nombre}.url`,
          "aria-invalid": !!errors?.[config.nombre]?.url,
          "aria-describedby": errors?.[config.nombre]?.url ? `${config.nombre}-url-error` : void 0,
          type: "text",
          placeholder: config.urlHolder || "https://ejemplo.com o #",
          disabled,
          ...register(`${config.nombre}.url`, buildRules(config)),
          className: `
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${errors?.[config.nombre]?.url ? "border-red-500" : "border-gray-300"}
        `
        }
      ),
      errors?.[config.nombre]?.url && /* @__PURE__ */ jsx11(ExclamationCircleIcon7, { "aria-hidden": "true", className: "absolute right-2 top-2 h-5 w-5 text-[#EF4444]" })
    ] }),
    linkValue === "#" && /* @__PURE__ */ jsxs11(
      "select",
      {
        id: `${config.nombre}.section`,
        disabled,
        ...register(`${config.nombre}.section`),
        className: "px-3 py-2 rounded-lg border text-sm bg-white border-gray-300",
        children: [
          /* @__PURE__ */ jsx11("option", { value: "", children: "Seleccionar secci\xF3n" }),
          secciones.map((sec) => /* @__PURE__ */ jsx11("option", { value: sec, children: sec }, sec))
        ]
      }
    ),
    errors?.[config.nombre]?.label && /* @__PURE__ */ jsx11("span", { id: `${config.nombre}-label-error`, role: "alert", className: "text-xs text-red-500", children: errors[config.nombre].label.message }),
    errors?.[config.nombre]?.url && /* @__PURE__ */ jsx11("span", { id: `${config.nombre}-url-error`, role: "alert", className: "text-xs text-red-500", children: errors[config.nombre].url.message })
  ] });
};
var HyperlinkInput_default = HyperlinkInput;

// src/components/inputs/NumberInput.js
import { ExclamationCircleIcon as ExclamationCircleIcon8 } from "@heroicons/react/24/outline";
import { jsx as jsx12, jsxs as jsxs12 } from "react/jsx-runtime";
var NumberInput = ({ config, register, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx12("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs12("div", { className: "relative", children: [
      /* @__PURE__ */ jsx12(
        "input",
        {
          id: config.nombre,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
          type: "number",
          placeholder: config.holder,
          disabled,
          min: config.min ?? 0,
          step: config.step ?? 1,
          ...register(config.nombre, {
            valueAsNumber: true,
            ...buildRules(config)
          }),
          style: {
            color: inputTextColor,
            backgroundColor: disabled ? "#F3F4F6" : inputBgColor
          },
          className: `
            w-full px-3 py-2 rounded-lg border text-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
            ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
            letraTipoLight
          `
        }
      ),
      hasError && /* @__PURE__ */ jsx12(ExclamationCircleIcon8, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500" })
    ] }),
    hasError && /* @__PURE__ */ jsx12("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var NumberInput_default = NumberInput;

// src/components/inputs/SelectSearchInput.js
import { Controller } from "react-hook-form";
import Select from "react-select";
import { ExclamationCircleIcon as ExclamationCircleIcon9 } from "@heroicons/react/24/outline";
import { jsx as jsx13, jsxs as jsxs13 } from "react/jsx-runtime";
var SelectSearchInput = ({ config, control, errors, disabled }) => /* @__PURE__ */ jsxs13("div", { className: "flex flex-col gap-1 letraTipoLight", children: [
  /* @__PURE__ */ jsx13("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-600", children: config.customLabel || config.label }),
  /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
    /* @__PURE__ */ jsx13(
      Controller,
      {
        name: config.nombre,
        control,
        rules: {
          required: config.requerido ? "Este campo es obligatorio" : false
        },
        render: ({ field }) => /* @__PURE__ */ jsx13(
          Select,
          {
            inputId: config.nombre,
            "aria-errormessage": errors?.[config.nombre] ? `${config.nombre}-error` : void 0,
            ...field,
            options: config.opciones || [],
            isDisabled: disabled,
            isSearchable: true,
            placeholder: config.holder,
            className: "text-sm letraTipoLight",
            onChange: (option) => field.onChange(option?.value),
            value: config.opciones?.find((opt) => opt.value === field.value) || null
          }
        )
      }
    ),
    errors?.[config.nombre] && /* @__PURE__ */ jsx13(ExclamationCircleIcon9, { "aria-hidden": "true", className: "absolute right-10 top-2 h-5 w-5 text-[#EF4444]" })
  ] }),
  errors[config.nombre] && /* @__PURE__ */ jsx13("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
] });
var SelectSearchInput_default = SelectSearchInput;

// src/components/inputs/SelectMultiSearchInput.js
import { Controller as Controller2 } from "react-hook-form";
import Select2 from "react-select";
import { ExclamationCircleIcon as ExclamationCircleIcon10 } from "@heroicons/react/24/outline";
import { jsx as jsx14, jsxs as jsxs14 } from "react/jsx-runtime";
var SelectMultiSearchInput = ({ config, control, errors, disabled }) => /* @__PURE__ */ jsxs14("div", { className: "flex flex-col gap-1", children: [
  /* @__PURE__ */ jsxs14("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-600 letraTipoLight", children: [
    config.customLabel || config.label,
    " "
  ] }),
  /* @__PURE__ */ jsxs14("div", { className: "relative", children: [
    /* @__PURE__ */ jsx14(
      Controller2,
      {
        name: config.nombre,
        control,
        rules: {
          required: config.requerido ? "Este campo es obligatorio" : false
        },
        render: ({ field }) => /* @__PURE__ */ jsx14(
          Select2,
          {
            inputId: config.nombre,
            "aria-errormessage": errors?.[config.nombre] ? `${config.nombre}-error` : void 0,
            options: config.opciones || [],
            isMulti: true,
            isSearchable: true,
            isDisabled: disabled,
            placeholder: config.holder,
            className: "text-sm letraTipoLight",
            onChange: (selected) => field.onChange(selected?.map((s) => s.value)),
            value: config.opciones?.filter((opt) => field.value?.includes(opt.value)) || []
          }
        )
      }
    ),
    errors?.[config.nombre] && /* @__PURE__ */ jsx14(ExclamationCircleIcon10, { "aria-hidden": "true", className: "absolute right-10 top-2 h-5 w-5 text-[#EF4444]" })
  ] }),
  errors[config.nombre] && /* @__PURE__ */ jsx14("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500", children: errors[config.nombre].message })
] });
var SelectMultiSearchInput_default = SelectMultiSearchInput;

// src/components/inputs/FileInput.js
import { Controller as Controller3 } from "react-hook-form";
import { ExclamationCircleIcon as ExclamationCircleIcon11 } from "@heroicons/react/24/outline";

// src/constants/formLimits.js
var MAX_FILE_SIZE_MB = 5;
var MAX_FILES_IN_ZONE = 3;
var ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg"];

// src/components/inputs/FileInput.js
import { jsx as jsx15, jsxs as jsxs15 } from "react/jsx-runtime";
var FileInput = ({ config, control, errors, disabled, notify = () => {
} }) => {
  const hasError = !!errors?.[config.nombre];
  const validateFile = (file) => {
    if (!file) {
      return null;
    }
    const allowedExtensions = config.permitidos?.map((p) => p.value.toLowerCase()) || ALLOWED_EXTENSIONS;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      notify({
        type: "error",
        message: `El archivo "${file.name}" no es un tipo permitido.`
      });
      return null;
    }
    if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      notify({
        type: "error",
        message: `El archivo "${file.name}" supera los ${MAX_FILE_SIZE_MB} MB permitidos.`
      });
      return null;
    }
    return file;
  };
  return /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx15("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-600", children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs15("div", { className: "relative", children: [
      /* @__PURE__ */ jsx15(
        Controller3,
        {
          name: config.nombre,
          control,
          rules: buildRules(config),
          render: ({ field: { onChange, ref } }) => /* @__PURE__ */ jsx15(
            "input",
            {
              id: config.nombre,
              "aria-invalid": hasError,
              "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
              ref,
              type: "file",
              accept: config.permitidos?.map((p) => `.${p.value}`).join(","),
              disabled,
              onChange: (e) => {
                const file = e.target.files?.[0] || null;
                const validated = validateFile(file);
                if (!validated) {
                  e.target.value = "";
                }
                onChange(validated);
              },
              className: `
                w-full px-3 py-2 rounded-lg border text-sm transition
                file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0
                file:text-sm file:bg-blue-50 file:text-blue-600
                ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
                letraTipoLight
              `
            }
          )
        }
      ),
      hasError && /* @__PURE__ */ jsx15(ExclamationCircleIcon11, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500 pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxs15("div", { className: "text-xs text-gray-500", children: [
      "M\xE1ximo ",
      MAX_FILE_SIZE_MB,
      " MB por archivo"
    ] }),
    config.permitidos?.length > 0 && /* @__PURE__ */ jsxs15("div", { className: "text-xs text-gray-500", children: [
      "Archivos permitidos: ",
      config.permitidos.map((p) => p.value.toUpperCase()).join(", ")
    ] }),
    hasError && /* @__PURE__ */ jsx15("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var FileInput_default = FileInput;

// src/components/inputs/RuleBuilder.js
import { useFieldArray as useFieldArray2, useWatch as useWatch2 } from "react-hook-form";

// src/components/inputs/RuleRow.js
import { useId } from "react";
import { useController } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";

// src/utils/ruleSources.js
var getRuleSource = (ruleSteps, stepId, currentStepId) => {
  const sourceId = stepId === void 0 ? currentStepId : stepId;
  return ruleSteps.find((step) => String(step.stepId) === String(sourceId));
};
var getRuleSourceFields = (ruleSteps, stepId, currentStepId, fields = []) => ruleSteps.length ? getRuleSource(ruleSteps, stepId, currentStepId)?.fields ?? [] : fields;

// src/components/inputs/RuleRow.js
import { Fragment, jsx as jsx16, jsxs as jsxs16 } from "react/jsx-runtime";
var OPERATORS = [
  { label: "Igual a", value: "equals" },
  { label: "Distinto de", value: "notEquals" },
  { label: "Mayor que", value: "greaterThan" },
  { label: "Menor que", value: "lessThan" },
  { label: "Mayor o igual", value: "greaterOrEqual" },
  { label: "Menor o igual", value: "lessOrEqual" }
];
var INPUT_CLASS = "min-h-11 w-full rounded-lg border px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30A5E9] disabled:opacity-60";
var RuleComparisonInputs = ({ name, control, id, disabled, ruleSteps, onRemove }) => /* @__PURE__ */ jsxs16(Fragment, { children: [
  /* @__PURE__ */ jsxs16("div", { className: ruleSteps.length ? "md:col-span-2" : "md:col-span-4", children: [
    /* @__PURE__ */ jsx16("label", { htmlFor: `${id}-operator`, className: "text-xs", children: "Operador" }),
    /* @__PURE__ */ jsx16("select", { ...control.register(`${name}.operador`), id: `${id}-operator`, disabled, className: INPUT_CLASS, children: OPERATORS.map((operator) => /* @__PURE__ */ jsx16("option", { value: operator.value, children: operator.label }, operator.value)) })
  ] }),
  /* @__PURE__ */ jsxs16("div", { className: "md:col-span-3", children: [
    /* @__PURE__ */ jsx16("label", { htmlFor: `${id}-value`, className: "text-xs", children: "Valor" }),
    /* @__PURE__ */ jsx16("input", { ...control.register(`${name}.valor`), id: `${id}-value`, disabled, className: INPUT_CLASS })
  ] }),
  /* @__PURE__ */ jsx16(
    "button",
    {
      type: "button",
      onClick: onRemove,
      disabled,
      "aria-label": "Eliminar regla",
      className: "flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-red-500 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-1",
      children: /* @__PURE__ */ jsx16(XMarkIcon, { className: "h-5 w-5", "aria-hidden": "true" })
    }
  )
] });
var RuleRow = ({ name, control, camposDisponibles, ruleSteps, currentStepId, disabled, onRemove }) => {
  const id = useId();
  const step = useController({ name: `${name}.stepId`, control, rules: {
    validate: (value) => !ruleSteps.length || Boolean(getRuleSource(ruleSteps, value, currentStepId)) || "Selecciona un step disponible."
  } });
  const sourceFields = getRuleSourceFields(ruleSteps, step.field.value, currentStepId, camposDisponibles);
  const field = useController({ name: `${name}.campo`, control, rules: {
    validate: (value) => !ruleSteps.length || sourceFields.some((item) => item.nombre === value) || "Selecciona un campo de este step."
  } });
  const sourceId = step.field.value === void 0 ? currentStepId ?? "" : step.field.value ?? "";
  const error = step.fieldState.error?.message || field.fieldState.error?.message;
  return /* @__PURE__ */ jsxs16("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxs16("div", { className: "grid grid-cols-1 items-end gap-3 sm:grid-cols-2 md:grid-cols-12", children: [
      ruleSteps.length > 0 && /* @__PURE__ */ jsxs16("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx16("label", { htmlFor: `${id}-step`, className: "text-xs", children: "Step de origen" }),
        /* @__PURE__ */ jsxs16(
          "select",
          {
            ...step.field,
            id: `${id}-step`,
            value: sourceId,
            disabled,
            className: INPUT_CLASS,
            "aria-invalid": Boolean(step.fieldState.error),
            "aria-describedby": error ? `${id}-error` : void 0,
            onChange: (event) => {
              step.field.onChange(ruleSteps.find((item) => String(item.stepId) === event.target.value)?.stepId ?? "");
              field.field.onChange("");
            },
            children: [
              /* @__PURE__ */ jsx16("option", { value: "", children: "Seleccionar" }),
              sourceId !== "" && !getRuleSource(ruleSteps, sourceId, currentStepId) && /* @__PURE__ */ jsx16("option", { value: sourceId, children: "Step no disponible" }),
              ruleSteps.map((item) => /* @__PURE__ */ jsx16("option", { value: item.stepId, children: item.label }, item.stepId))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs16("div", { className: ruleSteps.length ? "md:col-span-3" : "md:col-span-4", children: [
        /* @__PURE__ */ jsx16("label", { htmlFor: `${id}-field`, className: "text-xs", children: "Campo" }),
        /* @__PURE__ */ jsxs16(
          "select",
          {
            ...field.field,
            value: field.field.value ?? "",
            id: `${id}-field`,
            disabled,
            className: INPUT_CLASS,
            "aria-invalid": Boolean(field.fieldState.error),
            "aria-describedby": error ? `${id}-error` : void 0,
            children: [
              /* @__PURE__ */ jsx16("option", { value: "", children: "Seleccionar" }),
              field.field.value && !sourceFields.some((item) => item.nombre === field.field.value) && /* @__PURE__ */ jsxs16("option", { value: field.field.value, children: [
                "Campo no disponible: ",
                field.field.value
              ] }),
              sourceFields.map((item) => /* @__PURE__ */ jsx16("option", { value: item.nombre, children: item.label }, item.nombre))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx16(RuleComparisonInputs, { name, control, id, disabled, ruleSteps, onRemove })
    ] }),
    error && /* @__PURE__ */ jsx16("p", { id: `${id}-error`, role: "alert", className: "text-sm text-red-500", children: error })
  ] });
};
var RuleRow_default = RuleRow;

// src/components/inputs/RuleBuilder.js
import { jsx as jsx17, jsxs as jsxs17 } from "react/jsx-runtime";
var RuleGroup = ({ title, name, control, camposDisponibles, ruleSteps, currentStepId, disabled }) => {
  const { fields, append, remove } = useFieldArray2({ control, name });
  return /* @__PURE__ */ jsxs17("div", { className: "space-y-4 rounded-xl border p-4", children: [
    /* @__PURE__ */ jsx17("h3", { className: "font-semibold", children: title }),
    fields.map((field, index) => /* @__PURE__ */ jsx17(
      RuleRow_default,
      {
        name: `${name}.${index}`,
        control,
        camposDisponibles,
        ruleSteps,
        currentStepId,
        disabled,
        onRemove: () => remove(index)
      },
      field.id
    )),
    /* @__PURE__ */ jsx17("button", { type: "button", disabled, onClick: () => append({
      campo: "",
      operador: "equals",
      valor: "",
      ...ruleSteps.length && currentStepId !== void 0 ? { stepId: currentStepId } : {}
    }), className: "min-h-11 cursor-pointer rounded-lg bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60", children: "+ Agregar regla" })
  ] });
};
var RuleBuilder = ({ control, camposDisponibles = [], ruleSteps = [], currentStepId, disabled }) => {
  const conditions = useWatch2({ control, name: "condiciones" });
  if (conditions?.reglas && !conditions.and && !conditions.or) {
    return /* @__PURE__ */ jsx17(
      RuleGroup,
      {
        title: `Reglas ${conditions.operador === "OR" ? "OR" : "AND"}`,
        name: "condiciones.reglas",
        control,
        camposDisponibles,
        ruleSteps,
        currentStepId,
        disabled
      },
      "legacy"
    );
  }
  return /* @__PURE__ */ jsxs17("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx17(
      RuleGroup,
      {
        title: "Reglas AND (todas deben cumplirse)",
        name: "condiciones.and",
        control,
        camposDisponibles,
        ruleSteps,
        currentStepId,
        disabled
      }
    ),
    /* @__PURE__ */ jsx17(
      RuleGroup,
      {
        title: "Reglas OR (al menos una debe cumplirse)",
        name: "condiciones.or",
        control,
        camposDisponibles,
        ruleSteps,
        currentStepId,
        disabled
      }
    )
  ] });
};
var RuleBuilder_default = RuleBuilder;

// src/components/inputs/DynamicObjectListInput.js
import { useFieldArray as useFieldArray3 } from "react-hook-form";
import { TrashIcon as TrashIcon2, PlusIcon as PlusIcon2 } from "@heroicons/react/24/outline";
import { jsx as jsx18, jsxs as jsxs18 } from "react/jsx-runtime";
var DynamicObjectListInput = ({ config, register, control, disabled }) => {
  const { fields, append, remove } = useFieldArray3({
    control,
    name: config.nombre
  });
  const renderInput = (campo, index) => {
    const fieldName = `${config.nombre}.${index}.${campo.nombre}`;
    switch (campo.tipo) {
      case "texto":
        return /* @__PURE__ */ jsx18(
          "input",
          {
            type: "text",
            disabled,
            ...register(fieldName, { required: campo.requerido }),
            className: "w-full px-2 py-1 border rounded-md text-sm border-gray-300"
          }
        );
      case "numero":
        return /* @__PURE__ */ jsx18(
          "input",
          {
            type: "number",
            disabled,
            ...register(fieldName, { required: campo.requerido }),
            className: "w-full px-2 py-1 border rounded-md text-sm border-gray-300"
          }
        );
      case "select":
        return /* @__PURE__ */ jsxs18(
          "select",
          {
            disabled,
            ...register(fieldName, { required: campo.requerido }),
            className: "w-full px-2 py-1 border rounded-md text-sm border-gray-300",
            children: [
              /* @__PURE__ */ jsx18("option", { value: "", children: "Seleccione" }),
              campo.opciones?.map((op) => /* @__PURE__ */ jsx18("option", { value: op.value, children: op.label }, op.value))
            ]
          }
        );
      default:
        return null;
    }
  };
  const getDefaultObject = () => {
    const obj = {};
    config.campos.forEach((campo) => {
      obj[campo.nombre] = "";
    });
    return obj;
  };
  return /* @__PURE__ */ jsxs18("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx18("label", { className: "text-sm font-medium text-gray-700", children: config.label }),
    /* @__PURE__ */ jsx18("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs18("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx18("thead", { className: "bg-gray-100 text-gray-600", children: /* @__PURE__ */ jsxs18("tr", { children: [
        /* @__PURE__ */ jsx18("th", { className: "px-4 py-2 w-10", children: "#" }),
        config.campos.map((campo) => /* @__PURE__ */ jsx18("th", { className: "px-4 py-2 text-left", children: campo.label }, campo.nombre)),
        /* @__PURE__ */ jsx18("th", { className: "px-4 py-2 text-right w-16", children: "Acci\xF3n" })
      ] }) }),
      /* @__PURE__ */ jsx18("tbody", { children: fields.length === 0 ? /* @__PURE__ */ jsx18("tr", { children: /* @__PURE__ */ jsx18("td", { colSpan: config.campos.length + 2, className: "text-center py-6 text-gray-400", children: "No hay registros" }) }) : fields.map((item, index) => /* @__PURE__ */ jsxs18("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx18("td", { className: "px-4 py-2", children: index + 1 }),
        config.campos.map((campo) => /* @__PURE__ */ jsx18("td", { className: "px-4 py-2", children: renderInput(campo, index) }, campo.nombre)),
        /* @__PURE__ */ jsx18("td", { className: "px-4 py-2 text-right", children: !disabled && /* @__PURE__ */ jsx18("button", { type: "button", onClick: () => remove(index), className: "text-red-500", children: /* @__PURE__ */ jsx18(TrashIcon2, { className: "w-5 h-5 inline" }) }) })
      ] }, item.id)) })
    ] }) }),
    !disabled && /* @__PURE__ */ jsxs18(
      "button",
      {
        type: "button",
        onClick: () => append(getDefaultObject()),
        className: "flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm w-fit",
        children: [
          /* @__PURE__ */ jsx18(PlusIcon2, { className: "w-4 h-4" }),
          "Agregar registro"
        ]
      }
    )
  ] });
};
var DynamicObjectListInput_default = DynamicObjectListInput;

// src/components/inputs/FechaInput.js
import DatePicker from "react-datepicker";
import { Controller as Controller4 } from "react-hook-form";
import { registerLocale } from "react-datepicker";
import { ExclamationCircleIcon as ExclamationCircleIcon12 } from "@heroicons/react/24/outline";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { jsx as jsx19, jsxs as jsxs19 } from "react/jsx-runtime";
registerLocale("es", es);
var FechaInput = ({ config, control, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs19("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx19("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs19("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx19(
        Controller4,
        {
          control,
          name: config.nombre,
          rules: {
            required: config.requerido ? "Este campo es requerido" : false
          },
          render: ({ field }) => /* @__PURE__ */ jsx19(
            DatePicker,
            {
              locale: "es",
              id: config.nombre,
              "aria-invalid": hasError,
              "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
              placeholderText: config.holder || "dd/mm/aaaa",
              selected: field.value,
              onChange: (date) => field.onChange(date),
              onChangeRaw: (e) => {
                if (!e?.target?.value) return;
                const cleaned = e.target.value.replace(/[^0-9/]/g, "");
                e.target.value = cleaned;
              },
              disabled,
              dateFormat: "dd/MM/yyyy",
              showMonthDropdown: true,
              showYearDropdown: true,
              dropdownMode: "select",
              autoComplete: "off",
              style: {
                color: inputTextColor,
                backgroundColor: disabled ? "#F3F4F6" : inputBgColor
              },
              wrapperClassName: "w-full",
              className: `
          w-full px-3 py-2 rounded-lg border text-sm transition
          focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
          ${disabled ? "cursor-not-allowed" : ""}
          ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
          letraTipoLight
        `
            }
          )
        }
      ),
      hasError && /* @__PURE__ */ jsx19(ExclamationCircleIcon12, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500 pointer-events-none" })
    ] }),
    hasError && /* @__PURE__ */ jsx19("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var FechaInput_default = FechaInput;

// src/components/inputs/FileZoneInput.js
import { useRef } from "react";
import { XMarkIcon as XMarkIcon2, DocumentIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon as ExclamationCircleIcon13 } from "@heroicons/react/24/outline";
import { jsx as jsx20, jsxs as jsxs20 } from "react/jsx-runtime";
var FileZone = ({ config, register, errors, disabled, watch, setValue, notify = () => {
} }) => {
  const inputRef = useRef(null);
  const files = watch(config.nombre) || {};
  const fileList = Object.values(files || {});
  const validateFiles = (incomingFiles) => {
    const validFiles = [];
    const allowedExtensions = config.permitidos?.map((p) => p.value.toLowerCase()) || ALLOWED_EXTENSIONS;
    for (const file of incomingFiles) {
      if (!(file instanceof File)) continue;
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        notify({
          type: "error",
          message: `El archivo "${file.name}" no es un tipo permitido.`
        });
        continue;
      }
      if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
        notify({
          type: "error",
          message: `El archivo "${file.name}" supera los ${MAX_FILE_SIZE_MB} MB permitidos.`
        });
        continue;
      }
      validFiles.push(file);
    }
    if (incomingFiles.length + fileList.length > MAX_FILES_IN_ZONE) {
      notify({
        type: "warning",
        message: `Solo se permiten ${MAX_FILES_IN_ZONE} archivos.`
      });
    }
    const merged = [...fileList.filter((f) => f instanceof File), ...validFiles].slice(0, MAX_FILES_IN_ZONE);
    const filesObject = {};
    merged.forEach((file, index) => {
      filesObject[`documento${index + 1}`] = file;
    });
    return filesObject;
  };
  const handleFiles = (event) => {
    const incoming = Array.from(event.target.files || []);
    const validated = validateFiles(incoming);
    setValue(config.nombre, validated, { shouldValidate: true });
  };
  const handleDrop = (event) => {
    event.preventDefault();
    if (disabled) return;
    const incoming = Array.from(event.dataTransfer.files || []);
    const validated = validateFiles(incoming);
    setValue(config.nombre, validated, { shouldValidate: true });
  };
  const removeFile = (index) => {
    const updatedList = fileList.filter((_, i) => i !== index);
    const filesObject = {};
    updatedList.forEach((file, i) => {
      filesObject[`documento${i + 1}`] = file;
    });
    setValue(config.nombre, filesObject, { shouldValidate: true });
  };
  const openFileSelector = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };
  const getFileName = (file, index) => {
    if (file instanceof File) return file.name;
    if (typeof file === "string") return `documento${index + 1}.${file}`;
    return `documento${index + 1}`;
  };
  const getFileSize = (file) => {
    if (!(file instanceof File)) return null;
    return (file.size / (1024 * 1024)).toFixed(2);
  };
  const { ref: registerRef, ...restRegister } = register(config.nombre, {
    validate: (value) => {
      if (!config.requerido) return true;
      const files2 = Object.values(value || {});
      return files2.length > 0 || "Debe adjuntar al menos un archivo";
    }
  });
  return /* @__PURE__ */ jsxs20("div", { className: "flex flex-col gap-3 w-full", children: [
    /* @__PURE__ */ jsx20("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-700", children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs20(
      "div",
      {
        onClick: openFileSelector,
        onDrop: handleDrop,
        onDragOver: (e) => e.preventDefault(),
        className: `
          border-2 border-dashed rounded-xl p-6 transition text-center cursor-pointer
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:border-blue-400 hover:bg-blue-50"}
          ${errors?.[config.nombre] ? "border-red-500" : "border-gray-300"}
        `,
        children: [
          /* @__PURE__ */ jsx20(
            "input",
            {
              id: config.nombre,
              "aria-invalid": !!errors?.[config.nombre],
              "aria-describedby": errors?.[config.nombre] ? `${config.nombre}-error` : void 0,
              type: "file",
              multiple: true,
              disabled,
              accept: config.permitidos?.map((p) => "." + p.value).join(","),
              className: "hidden",
              ...restRegister,
              ref: (e) => {
                registerRef(e);
                inputRef.current = e;
              },
              onChange: handleFiles
            }
          ),
          /* @__PURE__ */ jsx20("p", { className: "text-sm text-blue-600 font-medium", children: "Arrastra archivos aqu\xED o haz clic para subir" }),
          /* @__PURE__ */ jsxs20("p", { className: "text-xs text-gray-500 mt-1", children: [
            "M\xE1ximo ",
            MAX_FILES_IN_ZONE,
            " archivos \u2022 ",
            MAX_FILE_SIZE_MB,
            " MB por archivo"
          ] }),
          /* @__PURE__ */ jsxs20("p", { className: "text-xs text-gray-500 mt-1", children: [
            "Archivos permitidos: ",
            config.permitidos?.map((p) => p.value.toUpperCase()).join(", ")
          ] })
        ]
      }
    ),
    fileList.length > 0 && /* @__PURE__ */ jsx20("div", { className: "flex flex-col gap-2", children: fileList.map((file, index) => {
      const size = getFileSize(file);
      return /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-2 overflow-hidden", children: [
          /* @__PURE__ */ jsx20(DocumentIcon, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ jsx20("span", { className: "text-sm truncate max-w-[220px]", children: getFileName(file, index) }),
          size && /* @__PURE__ */ jsxs20("span", { className: "text-xs text-gray-400", children: [
            "(",
            size,
            " MB)"
          ] })
        ] }),
        !disabled && /* @__PURE__ */ jsx20("button", { type: "button", onClick: () => removeFile(index), className: "text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx20(XMarkIcon2, { className: "w-4 h-4" }) })
      ] }, index);
    }) }),
    errors?.[config.nombre] && /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-1 text-[#EF4444]", children: [
      /* @__PURE__ */ jsx20(ExclamationCircleIcon13, { "aria-hidden": "true", className: "h-5 w-5" }),
      /* @__PURE__ */ jsx20("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs letraTipoRegular", children: errors[config.nombre].message })
    ] })
  ] });
};
var FileZoneInput_default = FileZone;

// src/components/inputs/FechaHoraInput.js
import DatePicker2 from "react-datepicker";
import { Controller as Controller5 } from "react-hook-form";
import { registerLocale as registerLocale2 } from "react-datepicker";
import { ExclamationCircleIcon as ExclamationCircleIcon14 } from "@heroicons/react/24/outline";
import es2 from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { jsx as jsx21, jsxs as jsxs21 } from "react/jsx-runtime";
registerLocale2("es", es2);
var FechaHoraInput = ({ config, control, errors, disabled, labelColor, inputTextColor, inputBgColor }) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs21("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx21("label", { htmlFor: config.nombre, className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsxs21("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx21(
        Controller5,
        {
          control,
          name: config.nombre,
          rules: {
            required: config.requerido ? "Este campo es requerido" : false
          },
          render: ({ field }) => /* @__PURE__ */ jsx21(
            DatePicker2,
            {
              locale: "es",
              id: config.nombre,
              "aria-invalid": hasError,
              "aria-describedby": hasError ? `${config.nombre}-error` : void 0,
              placeholderText: config.holder || "dd/mm/aaaa hh:mm",
              selected: field.value,
              onChange: (date) => field.onChange(date),
              disabled,
              dateFormat: "dd/MM/yyyy HH:mm",
              showTimeSelect: true,
              timeFormat: "HH:mm",
              timeIntervals: 5,
              timeCaption: "Hora",
              showMonthDropdown: true,
              showYearDropdown: true,
              dropdownMode: "select",
              autoComplete: "off",
              wrapperClassName: "w-full",
              style: {
                color: inputTextColor,
                backgroundColor: disabled ? "#F3F4F6" : inputBgColor
              },
              className: `
                w-full px-3 py-2 rounded-lg border text-sm transition
                focus:outline-none focus:ring-2 focus:ring-[#30A5E9] transition-all duration-200
                ${disabled ? "cursor-not-allowed" : ""}
                ${hasError ? "border-red-500 pr-10" : "border-gray-300"}
                letraTipoLight
              `
            }
          )
        }
      ),
      hasError && /* @__PURE__ */ jsx21(ExclamationCircleIcon14, { "aria-hidden": "true", className: "absolute right-2 top-2 h-6 w-6 text-red-500 pointer-events-none" })
    ] }),
    hasError && /* @__PURE__ */ jsx21("span", { id: `${config.nombre}-error`, role: "alert", className: "text-xs text-red-500 letraTipoRegular", children: errors[config.nombre].message })
  ] });
};
var FechaHoraInput_default = FechaHoraInput;

// src/components/inputs/RangeDateInput.js
import DatePicker3, { registerLocale as registerLocale3 } from "react-datepicker";
import { Controller as Controller6 } from "react-hook-form";
import es3 from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { jsx as jsx22, jsxs as jsxs22 } from "react/jsx-runtime";
registerLocale3("es", es3);
var INTERVALS = [
  "Hace 1 hora",
  "Hace 3 horas",
  "Hace 6 horas",
  "Hoy",
  "Ayer",
  "Hace 3 Dias",
  "Hace 7 Dias",
  "Esta Semana",
  "Semana Pasada",
  "Este Mes",
  "Mes Pasado",
  "Rango Personalizado"
];
var RangeDateInput = ({
  config,
  control,
  errors,
  disabled = false,
  labelColor,
  inputTextColor,
  inputBgColor,
  intervals = INTERVALS
}) => {
  const hasError = !!errors?.[config.nombre];
  return /* @__PURE__ */ jsxs22("div", { className: "-mt-2 flex flex-col gap-3 w-full", children: [
    /* @__PURE__ */ jsx22("label", { className: "text-sm font-medium", style: { color: labelColor }, children: config.customLabel || config.label }),
    /* @__PURE__ */ jsx22(
      Controller6,
      {
        name: config.nombre,
        control,
        rules: {
          required: config.requerido ? "Este campo es requerido" : false
        },
        render: ({ field }) => {
          const value = field.value || {
            tipo: "",
            fechaInicio: null,
            fechaFin: null
          };
          const isCustom = value.tipo === "Rango Personalizado";
          return /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-4 w-full", children: [
            /* @__PURE__ */ jsxs22(
              "select",
              {
                disabled,
                value: value.tipo,
                onChange: (e) => field.onChange({
                  ...value,
                  tipo: e.target.value
                }),
                className: `
                  w-full h-10 px-3 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                  ${hasError ? "border-red-500" : "border-gray-300"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                `,
                children: [
                  /* @__PURE__ */ jsx22("option", { value: "", children: "Selecciona un filtro" }),
                  intervals.map((item) => /* @__PURE__ */ jsx22("option", { value: item, children: item }, item))
                ]
              }
            ),
            isCustom && /* @__PURE__ */ jsxs22("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full", children: [
              /* @__PURE__ */ jsx22(
                DatePicker3,
                {
                  locale: "es",
                  selected: value.fechaInicio,
                  selectsStart: true,
                  startDate: value.fechaInicio,
                  endDate: value.fechaFin,
                  disabled,
                  placeholderText: "Fecha inicial",
                  dateFormat: "dd/MM/yyyy",
                  onChange: (date) => field.onChange({
                    ...value,
                    fechaInicio: date
                  }),
                  className: `
                      w-full px-3 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                      ${hasError ? "border-red-500" : "border-gray-300"}
                      ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                    `,
                  style: {
                    color: inputTextColor,
                    backgroundColor: disabled ? "#F3F4F6" : inputBgColor
                  }
                }
              ),
              /* @__PURE__ */ jsx22(
                DatePicker3,
                {
                  locale: "es",
                  selected: value.fechaFin,
                  selectsEnd: true,
                  startDate: value.fechaInicio,
                  endDate: value.fechaFin,
                  minDate: value.fechaInicio,
                  disabled,
                  placeholderText: "Fecha final",
                  dateFormat: "dd/MM/yyyy",
                  onChange: (date) => field.onChange({
                    ...value,
                    fechaFin: date
                  }),
                  className: `
                      w-full px-3 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#30A5E9]
                      ${hasError ? "border-red-500" : "border-gray-300"}
                      ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                    `,
                  style: {
                    color: inputTextColor,
                    backgroundColor: disabled ? "#F3F4F6" : inputBgColor
                  }
                }
              )
            ] })
          ] });
        }
      }
    ),
    hasError && /* @__PURE__ */ jsx22("span", { className: "text-xs text-red-500", children: errors[config.nombre]?.message })
  ] });
};
var RangeDateInput_default = RangeDateInput;

// src/components/inputs/TextSlugInput.js
import { jsx as jsx23, jsxs as jsxs23 } from "react/jsx-runtime";
var TextInputSlug = ({ config, register, errors, disabled }) => {
  const registerField = register(config.nombre, buildRules(config));
  return /* @__PURE__ */ jsxs23("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsx23("label", { htmlFor: config.nombre, className: "text-sm font-medium text-gray-600", children: config.label }),
    /* @__PURE__ */ jsx23(
      "input",
      {
        id: config.nombre,
        type: "text",
        placeholder: config.holder,
        disabled,
        ...registerField,
        onChange: (e) => {
          const value = e.target.value.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
          e.target.value = value;
          registerField.onChange(e);
        },
        className: `
          px-3 py-2 rounded-lg border text-sm transition
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${errors[config.nombre] ? "border-red-500" : "border-gray-300"}
        `
      }
    ),
    errors[config.nombre] && /* @__PURE__ */ jsx23("span", { className: "text-xs text-red-500", children: errors[config.nombre].message })
  ] });
};
var TextSlugInput_default = TextInputSlug;

// src/utils/evaluateCondition.js
var evaluateRule = (rule, getValue, options) => {
  const { fields, ignoredFieldTypes, strictEquality, currentStepId } = options;
  const sameStep = rule.stepId === void 0 || currentStepId !== void 0 && String(rule.stepId) === String(currentStepId);
  const sourceField = sameStep && fields.find((field) => field.nombre === rule.campo);
  if (ignoredFieldTypes.includes(sourceField?.tipo)) return true;
  const currentValue = rule.stepId === void 0 ? getValue(rule.campo) : getValue(rule.campo, rule.stepId);
  switch (rule.operador) {
    case "equals":
      return strictEquality ? currentValue === rule.valor : currentValue == rule.valor;
    case "notEquals":
      return strictEquality ? currentValue !== rule.valor : currentValue != rule.valor;
    case "greaterThan":
      return Number(currentValue) > Number(rule.valor);
    case "lessThan":
      return Number(currentValue) < Number(rule.valor);
    case "greaterOrEqual":
      return Number(currentValue) >= Number(rule.valor);
    case "lessOrEqual":
      return Number(currentValue) <= Number(rule.valor);
    default:
      return false;
  }
};
var evaluateCondition = (conditions, getValue, {
  fields = [],
  ignoredFieldTypes = [],
  strictEquality = false,
  unknownGroupOperatorPasses = false,
  currentStepId
} = {}) => {
  if (!conditions) return true;
  const evaluate = (rule) => evaluateRule(rule, getValue, { fields, ignoredFieldTypes, strictEquality, currentStepId });
  if (conditions.and || conditions.or) {
    const andRules = conditions.and || [];
    const orRules = conditions.or || [];
    return (!andRules.length || andRules.every(evaluate)) && (!orRules.length || orRules.some(evaluate));
  }
  const { operador = "AND", reglas = [] } = conditions;
  if (!reglas.length) return true;
  if (operador === "OR") return reglas.some(evaluate);
  if (operador === "AND") return reglas.every(evaluate);
  return unknownGroupOperatorPasses;
};

// src/components/inputs/FormBuilder.js
import { jsx as jsx24, jsxs as jsxs24 } from "react/jsx-runtime";
var ADVANCED_FIELD_TYPES = /* @__PURE__ */ new Set(["textoInterno", "rangoFechas"]);
var DETAIL_HIDDEN_TYPES = /* @__PURE__ */ new Set(["archivo", "zonaArchivos", "FileZone"]);
var FieldLabel = ({ label, required, note, labelColor }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxs24("span", { className: "text-sm font-medium letraTipoRegular", style: { color: labelColor }, children: [
      label,
      required && /* @__PURE__ */ jsx24("span", { className: "ml-1 text-red-500", children: "*" })
    ] }),
    note && /* @__PURE__ */ jsxs24("div", { className: "relative", children: [
      /* @__PURE__ */ jsx24(
        InformationCircleIcon3,
        {
          "aria-label": note,
          className: "h-4 w-4 cursor-help text-gray-400 hover:text-gray-600",
          onFocus: () => setOpen(true),
          onBlur: () => setOpen(false),
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false)
        }
      ),
      open && /* @__PURE__ */ jsx24("div", { role: "tooltip", className: "absolute left-0 top-6 z-50 w-56 rounded-md border bg-white p-3 text-xs text-gray-600 shadow-lg", children: note })
    ] })
  ] });
};
var buildRows = (fields) => {
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
var renderField = (field, sharedProps, advanced) => {
  const config = {
    ...field,
    requerido: !sharedProps.modoDetalle && field.soloDashboard ? false : field.requerido,
    customLabel: /* @__PURE__ */ jsx24(FieldLabel, { label: field.label, required: field.requerido, note: field.nota, labelColor: sharedProps.labelColor })
  };
  const commonProps = { ...sharedProps, config };
  switch (field.tipo) {
    case "texto":
      return /* @__PURE__ */ jsx24(TextInput_default, { ...commonProps });
    case "textoInterno":
      return advanced ? /* @__PURE__ */ jsx24(TextSlugInput_default, { ...commonProps }) : null;
    case "textarea":
      return /* @__PURE__ */ jsx24(TextAreaInput_default, { ...commonProps });
    case "correo":
      return /* @__PURE__ */ jsx24(EmailInput_default, { ...commonProps });
    case "opciones":
    case "select":
      return /* @__PURE__ */ jsx24(SelectInput_default, { ...commonProps });
    case "checkbox":
      return /* @__PURE__ */ jsx24(CheckboxInput_default, { ...commonProps });
    case "estado":
      return /* @__PURE__ */ jsx24(EstadoBadgeInput_default, { config: field, value: field.valor });
    case "informativo":
      return /* @__PURE__ */ jsx24(InformationalInput_default, { config: field });
    case "tituloInformativo":
      return /* @__PURE__ */ jsx24(InformationalTitleInput_default, { config: field });
    case "listaDinamica":
      return /* @__PURE__ */ jsx24(DynamicListInput_default, { ...commonProps });
    case "color":
      return /* @__PURE__ */ jsx24(ColorInput_default, { ...commonProps });
    case "hipervinculo":
      return /* @__PURE__ */ jsx24(HyperlinkInput_default, { ...commonProps });
    case "numero":
      return /* @__PURE__ */ jsx24(NumberInput_default, { ...commonProps });
    case "selectSearch":
      return /* @__PURE__ */ jsx24(SelectSearchInput_default, { ...commonProps });
    case "selectSearchMultiple":
      return /* @__PURE__ */ jsx24(SelectMultiSearchInput_default, { ...commonProps });
    case "archivo":
      return /* @__PURE__ */ jsx24(FileInput_default, { ...commonProps });
    case "reglas":
      return /* @__PURE__ */ jsx24(RuleBuilder_default, { ...commonProps });
    case "listaObjetos":
      return /* @__PURE__ */ jsx24(DynamicObjectListInput_default, { ...commonProps });
    case "fecha":
      return /* @__PURE__ */ jsx24(FechaInput_default, { ...commonProps });
    case "fechaHora":
      return /* @__PURE__ */ jsx24(FechaHoraInput_default, { ...commonProps });
    case "rangoFechas":
      return advanced ? /* @__PURE__ */ jsx24(RangeDateInput_default, { ...commonProps }) : null;
    case "zonaArchivos":
    case "FileZone":
      return /* @__PURE__ */ jsx24(FileZoneInput_default, { ...commonProps });
    default:
      return null;
  }
};
var renderFieldRows = (rows, sharedProps, advanced) => rows.map((row, rowIndex) => /* @__PURE__ */ jsx24("div", { className: "flex w-full flex-col gap-4 md:flex-row", children: row.map((field) => {
  const span = Math.min(field.columna || 12, 12);
  const offset = field.columnaOffset || 0;
  const isInformationalField = ["informativo", "tituloInformativo"].includes(field.tipo);
  return /* @__PURE__ */ jsx24(
    "div",
    {
      className: `w-full md:w-auto ${isInformationalField ? "md:flex md:items-end" : ""}`,
      style: { flexBasis: `${span / 12 * 100}%`, marginLeft: offset ? `${offset / 12 * 100}%` : 0 },
      children: renderField(field, sharedProps, advanced)
    },
    `${field.nombre}-${field.orden}`
  );
}) }, rowIndex));
var FormBuilder = ({
  fields = [],
  register,
  control,
  errors,
  isEditing,
  watch,
  setValue,
  camposDisponibles = [],
  labelColor = "#111827",
  inputTextColor = "#333333",
  inputBgColor = "#F9FAFB",
  modoDetalle = false,
  advanced = false,
  notify = () => {
  },
  ruleSteps = [],
  currentStepId,
  resolveConditionValue
}) => {
  const visibleFields = fields.filter((field) => {
    if (!advanced && ADVANCED_FIELD_TYPES.has(field.tipo)) return false;
    if (!modoDetalle && field.soloDashboard) return false;
    if (modoDetalle && DETAIL_HIDDEN_TYPES.has(field.tipo)) return false;
    return evaluateCondition(field.condiciones, resolveConditionValue || ((name) => watch?.(name)), {
      fields,
      currentStepId,
      ignoredFieldTypes: modoDetalle ? [...DETAIL_HIDDEN_TYPES] : []
    });
  }).sort((first, second) => (first.orden || 0) - (second.orden || 0));
  const sharedProps = {
    register,
    control,
    errors,
    watch,
    setValue,
    disabled: !isEditing,
    camposDisponibles,
    labelColor,
    inputTextColor,
    inputBgColor,
    notify,
    modoDetalle,
    ruleSteps,
    currentStepId
  };
  const rows = buildRows(visibleFields);
  return /* @__PURE__ */ jsx24("div", { className: "form-kit flex w-full flex-col gap-6", children: renderFieldRows(rows, sharedProps, advanced) });
};
var FormBuilder_default = FormBuilder;
export {
  ALLOWED_EXTENSIONS,
  FormBuilder_default as FormBuilder,
  MAX_FILES_IN_ZONE,
  MAX_FILE_SIZE_MB,
  buildRules,
  evaluateCondition
};
