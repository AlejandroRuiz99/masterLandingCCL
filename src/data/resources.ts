import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  Landmark,
  Briefcase,
  ShieldCheck,
  Calculator,
  Coins,
} from "lucide-react";

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
  /** Etiqueta de formato (ej. "Guía PDF · 12 págs." o "Calculadora online"). */
  format: string;
  /** "pdf" llega por email; "tool" da acceso a una herramienta tras el formulario. */
  kind: "pdf" | "tool";
  /** URL de la herramienta (solo para kind "tool"). */
  url?: string;
}

export const resources: Resource[] = [
  {
    id: "extranjeria-arraigo",
    category: "Extranjería y Nacionalidad",
    icon: Globe2,
    kind: "pdf",
    title: "Guía completa del Arraigo en España 2026",
    description:
      "Los 4 tipos de arraigo, requisitos reales, documentación exacta y los errores que provocan la mayoría de denegaciones.",
    highlights: [
      "Arraigo social, laboral, familiar y de formación",
      "Checklist de documentos descargable",
      "Plazos actualizados tras la reforma del reglamento",
    ],
    format: "Guía PDF · 14 págs.",
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
    id: "laboral-despido",
    category: "Derecho Laboral",
    icon: Briefcase,
    kind: "pdf",
    title: "Qué hacer en las primeras 48h tras un despido",
    description:
      "El plazo para reclamar es de 20 días hábiles. Esta guía te dice exactamente qué hacer, y en qué orden, para no perder tus derechos.",
    highlights: [
      "Despido procedente, improcedente y nulo",
      "Cómo calcular tu indemnización",
      "Modelo de burofax de reclamación incluido",
    ],
    format: "Guía PDF · 9 págs.",
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
  {
    id: "jubilacion-calculo",
    category: "Jubilaciones y Pensiones",
    icon: Landmark,
    kind: "pdf",
    title: "Cómo calcular tu pensión de jubilación (sin sorpresas)",
    description:
      "Aprende a estimar tu pensión, cuándo te conviene jubilarte y cómo evitar los recortes por adelantar la edad.",
    highlights: [
      "Fórmula del cálculo explicada paso a paso",
      "Jubilación anticipada o demorada: qué te compensa",
      "Tabla de coeficientes reductores 2026",
    ],
    format: "Guía PDF · 11 págs.",
  },
  {
    id: "ss-incapacidad",
    category: "Seguridad Social",
    icon: ShieldCheck,
    kind: "pdf",
    title: "Incapacidad permanente: guía para solicitarla bien",
    description:
      "Los grados de incapacidad, qué pruebas médicas pesan de verdad ante el tribunal y cómo preparar tu solicitud para que prospere.",
    highlights: [
      "Grados: parcial, total, absoluta y gran invalidez",
      "Documentación médica que marca la diferencia",
      "Qué hacer si te la deniegan (reclamación previa)",
    ],
    format: "Guía PDF · 13 págs.",
  },
];

export const categories: ResourceCategory[] = [
  "Extranjería y Nacionalidad",
  "Jubilaciones y Pensiones",
  "Derecho Laboral",
  "Seguridad Social",
];
