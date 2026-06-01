import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Loader2, Mail, ArrowUpRight, Download } from "lucide-react";
import { Button } from "./ui/Button";
import { leadSchema, type LeadInput } from "@/lib/schema";
import type { Resource } from "@/data/resources";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  resource: Resource;
  onDone?: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-bone/12 bg-ink-900 px-4 py-3 text-sm text-bone placeholder:text-bone/30 outline-none transition-colors focus:border-gold/60";

export function LeadForm({ resource, onDone }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const isTool = resource.kind === "tool";
  const isDownload = resource.kind === "download";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      tematica: resource.category,
      recurso: resource.title,
    },
  });

  async function onSubmit(data: LeadInput) {
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="px-6 pb-8 pt-12 text-center sm:px-8">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-black"
        >
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl">
          {isTool
            ? "¡Ya tienes acceso!"
            : isDownload
            ? "¡Tu modelo está listo!"
            : "¡Recurso en camino!"}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-bone/60">
          {isTool ? (
            <>
              Abre <span className="text-gold">{resource.title}</span> ahora mismo.
            </>
          ) : isDownload ? (
            <>
              Pulsa el botón y{" "}
              <span className="text-gold">{resource.title}</span> se descargará
              directamente en tu dispositivo.
            </>
          ) : (
            <>
              Hemos enviado <span className="text-gold">{resource.title}</span> a tu
              correo. Revisa también la carpeta de spam por si acaso.
            </>
          )}
        </p>
        {isTool && resource.url ? (
          <>
            <Button
              className="mt-7 w-full"
              size="lg"
              onClick={() => window.open(resource.url, "_blank")}
            >
              Abrir la herramienta
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <button
              onClick={onDone}
              className="mt-3 text-sm text-bone/50 transition-colors hover:text-bone"
            >
              Cerrar
            </button>
          </>
        ) : isDownload && resource.file ? (
          <>
            <Button
              className="mt-7 w-full"
              size="lg"
              onClick={() => {
                const a = document.createElement("a");
                a.href = resource.file!;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}
            >
              Descargar el modelo
              <Download className="h-4 w-4" />
            </Button>
            <button
              onClick={onDone}
              className="mt-3 text-sm text-bone/50 transition-colors hover:text-bone"
            >
              Cerrar
            </button>
          </>
        ) : (
          <Button className="mt-7 w-full" size="lg" onClick={onDone}>
            Perfecto, cerrar
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="px-6 pb-7 pt-9 sm:px-8">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
          {resource.category}
        </div>
        <h3 className="text-pretty font-display text-xl leading-snug">
          {isTool
            ? "Accede gratis a:"
            : isDownload
            ? "Descarga gratis:"
            : "Recibe gratis:"}{" "}
          <span className="accent">{resource.title}</span>
        </h3>
        <p className="mt-2 text-sm text-bone/50">
          {isTool
            ? "Déjanos tus datos y accede al instante a la herramienta."
            : isDownload
            ? "Déjanos tus datos y el modelo se descargará directamente en tu dispositivo."
            : "Déjanos tus datos y te lo enviamos al instante por email."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5" noValidate>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Field error={errors.nombre?.message}>
            <input
              {...register("nombre")}
              placeholder="Nombre"
              className={cn(inputCls, errors.nombre && "border-red-500/60")}
            />
          </Field>
          <Field error={errors.apellidos?.message}>
            <input
              {...register("apellidos")}
              placeholder="Apellidos"
              className={cn(inputCls, errors.apellidos && "border-red-500/60")}
            />
          </Field>
        </div>

        <Field error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            placeholder="Tu email"
            className={cn(inputCls, errors.email && "border-red-500/60")}
          />
        </Field>

        <Field error={errors.telefono?.message}>
          <input
            {...register("telefono")}
            type="tel"
            inputMode="tel"
            placeholder="Teléfono"
            className={cn(inputCls, errors.telefono && "border-red-500/60")}
          />
        </Field>

        <label className="mt-1 flex items-start gap-2.5 text-xs leading-relaxed text-bone/50">
          <input
            {...register("consent")}
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
          />
          <span>
            Acepto la{" "}
            <a
              href="https://compromisolegal.es/politica-de-privacidad"
              target="_blank"
              rel="noreferrer"
              className="text-gold underline underline-offset-2"
            >
              política de privacidad
            </a>{" "}
            y recibir comunicaciones de Compromiso Legal.
          </span>
        </label>
        {errors.consent && (
          <p className="-mt-1 text-xs text-red-400">{errors.consent.message}</p>
        )}

        {status === "error" && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            Algo ha fallado al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
            </>
          ) : isTool ? (
            <>
              <ArrowUpRight className="h-4 w-4" /> Acceder gratis
            </>
          ) : isDownload ? (
            <>
              <Download className="h-4 w-4" /> Descargar gratis
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" /> Enviármelo gratis
            </>
          )}
        </Button>
        <p className="text-center text-[11px] text-bone/30">
          100% gratis · Sin compromiso · Cancela cuando quieras
        </p>
      </form>
    </div>
  );
}

function Field({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      {error && <span className="pl-1 text-xs text-red-400">{error}</span>}
    </div>
  );
}
