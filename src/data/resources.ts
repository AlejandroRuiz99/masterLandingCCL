import type { LucideIcon } from "lucide-react";
import { Calculator, Coins, FileText } from "lucide-react";

export type ResourceCategory =
  | "Extranjería y Nacionalidad"
  | "Jubilaciones y Pensiones"
  | "Derecho Laboral"
  | "Seguridad Social";

export interface Resource {
  id: string;
  category: ResourceCategory;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Lo que el usuario obtiene, en bullets cortos. */
  highlights: string[];
  /** Etiqueta de formato (ej. "Modelo Word" o "Calculadora online"). */
  format: string;
  /** "download" sirve un fichero directo; "tool" da acceso a una herramienta tras el formulario. */
  kind: "download" | "tool";
  /** URL de la herramienta (solo para kind "tool"). */
  url?: string;
  /** Ruta al fichero a descargar (solo para kind "download"). */
  file?: string;
}

export const resources: Resource[] = [
  {
    id: "modelo-vacaciones-ip",
    category: "Derecho Laboral",
    icon: FileText,
    kind: "download",
    file: "/recursos/modelo-reclamacion-vacaciones-incapacidad-permanente.docx",
    title: "Modelo de reclamación de vacaciones por incapacidad permanente",
    description:
      "Plantilla lista para reclamar a tu empresa los días de vacaciones que no pudiste disfrutar antes de la incapacidad permanente. Solo tienes que rellenar tus datos.",
    highlights: [
      "Documento Word editable, listo para firmar",
      "Redactado por abogados laboralistas",
      "Incluye fundamentos jurídicos y plazos clave",
    ],
    format: "Modelo Word editable",
  },
  {
    id: "formulario-jubilacion-parcial-administracion",
    category: "Jubilaciones y Pensiones",
    icon: FileText,
    kind: "download",
    file: "/recursos/formulario-jubilacion-parcial-personal-administracion.pdf",
    title: "Formulario oficial de jubilación parcial (personal de administración)",
    description:
      "Modelo oficial publicado en el BOE para solicitar la jubilación parcial del personal de administración. Solo tienes que cumplimentarlo con tus datos y presentarlo.",
    highlights: [
      "Modelo oficial vigente publicado en el BOE",
      "Incluye datos personales, puesto y solicitud",
      "Listo para imprimir, firmar y presentar",
    ],
    format: "Formulario oficial PDF",
  },
  {
    id: "comunicacion-salida-extranjero",
    category: "Seguridad Social",
    icon: FileText,
    kind: "download",
    file: "/recursos/comunicacion-salida-extranjero.pdf",
    title: "Comunicación de salida al extranjero (Seguridad Social)",
    description:
      "Modelo oficial para comunicar a la Seguridad Social tu salida al extranjero y conservar tu prestación o pensión sin sustos. Solo tienes que rellenar tus datos y presentarlo.",
    highlights: [
      "Modelo oficial vigente de la Seguridad Social",
      "Evita la suspensión de la prestación durante el viaje",
      "Listo para imprimir, firmar y presentar",
    ],
    format: "Formulario oficial PDF",
  },
  {
    id: "complemento-pension",
    category: "Jubilaciones y Pensiones",
    icon: Calculator,
    kind: "tool",
    url: "https://www.calcularcomplemento.com/",
    title: "Calculadora del complemento de pensión",
    description:
      "Descubre en un minuto si te corresponde el complemento para reducir la brecha de género y cuánto sumaría a tu pensión.",
    highlights: [
      "Cálculo según tus hijos y tu situación",
      "Importe estimado al instante",
      "Sabrás si te conviene reclamarlo",
    ],
    format: "Calculadora online",
  },
  {
    id: "pension-no-contributiva",
    category: "Seguridad Social",
    icon: Coins,
    kind: "tool",
    url: "https://simuladorpensionnocontributiva.com/",
    title: "Simulador de pensión no contributiva",
    description:
      "Comprueba si cumples los requisitos para la pensión no contributiva y qué importe podrías cobrar, sin moverte de casa.",
    highlights: [
      "Requisitos de ingresos y residencia",
      "Cuantía estimada según tu unidad familiar",
      "Pasos para solicitarla si encajas",
    ],
    format: "Simulador online",
  },
];

export const categories: ResourceCategory[] = [
  "Extranjería y Nacionalidad",
  "Jubilaciones y Pensiones",
  "Derecho Laboral",
  "Seguridad Social",
];
