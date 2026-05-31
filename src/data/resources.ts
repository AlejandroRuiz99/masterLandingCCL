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
