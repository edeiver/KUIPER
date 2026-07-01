 "use client";

import Surface from "@/components/ui/Surface";
import MediaPlaceholder from "@/components/workouts/MediaPlaceholder";

export default function AnatomyPanel() {
  return (
    <Surface id="anatomia" className="scroll-mt-24 grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          Anatomía
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Por qué está en el programa
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
        <MediaPlaceholder label="Imagen anatómica" variant="anatomy" />
        <div className="grid content-start gap-4">
          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Músculo principal
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              Pectoral superior
            </p>
          </div>
          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Músculos secundarios
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              Tríceps y deltoide anterior
            </p>
          </div>
          <p className="text-base leading-7 text-zinc-300">
            Este ejercicio abre la sesión porque permite cargar con estabilidad
            y priorizar el pecho superior cuando el sistema nervioso está fresco.
            También prepara tríceps y hombros para el resto del entrenamiento.
          </p>
        </div>
      </div>
    </Surface>
  );
}
