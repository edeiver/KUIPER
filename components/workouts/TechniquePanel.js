 "use client";

import Surface from "@/components/ui/Surface";
import CoachChecklist from "@/components/workouts/CoachChecklist";
import MediaPlaceholder from "@/components/workouts/MediaPlaceholder";

const steps = [
  "Ajusta el banco entre 30 y 45 grados.",
  "Apoya hombros y espalda alta de forma estable.",
  "Baja las mancuernas en 3 segundos con control.",
  "Pausa brevemente abajo sin perder tensión.",
  "Empuja hacia arriba sin chocar las mancuernas.",
];

const mistakes = [
  "Arquear demasiado la espalda.",
  "Bajar sin control por exceso de peso.",
  "Despegar los hombros del banco.",
  "Convertir el movimiento en press vertical.",
];

export default function TechniquePanel() {
  return (
    <Surface id="tecnica" className="scroll-mt-24 grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          Técnica
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Press inclinado limpio y controlado
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MediaPlaceholder label="Imagen real" />
        <MediaPlaceholder label="GIF / animación" variant="gif" />
        <MediaPlaceholder label="Video demostrativo" variant="video" />
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_1fr_0.9fr]">
        <div>
          <h3 className="mb-3 text-base font-semibold text-white">
            Paso a paso
          </h3>
          <ol className="grid gap-3 text-sm leading-6 text-zinc-400">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="text-[#9fb7ff]">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-white">
            Errores comunes
          </h3>
          <ul className="grid gap-3 text-sm leading-6 text-zinc-400">
            {mistakes.map((mistake) => (
              <li key={mistake}>• {mistake}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-white">
            Checklist antes de iniciar
          </h3>
          <CoachChecklist />
        </div>
      </div>

      <div className="rounded-[24px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-5">
        <h3 className="text-base font-semibold text-white">
          Consejos del entrenador
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          El peso correcto permite controlar la fase negativa y terminar cada
          serie con el RIR indicado. Prioriza rango, estabilidad y tensión.
        </p>
      </div>
    </Surface>
  );
}
