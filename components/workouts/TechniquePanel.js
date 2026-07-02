 "use client";

import Surface from "@/components/ui/Surface";
import CoachChecklist from "@/components/workouts/CoachChecklist";
import MediaPlaceholder from "@/components/workouts/MediaPlaceholder";

export default function TechniquePanel({ exercise }) {
  const { technique } = exercise;

  return (
    <Surface id="tecnica" className="scroll-mt-24 grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          Técnica
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {technique.title}
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
            {technique.steps.map((step, index) => (
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
            {technique.mistakes.map((mistake) => (
              <li key={mistake}>• {mistake}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-white">
            Checklist antes de iniciar
          </h3>
          <CoachChecklist cues={technique.cues} />
        </div>
      </div>

      <div className="rounded-[24px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-5">
        <h3 className="text-base font-semibold text-white">
          Consejos del entrenador
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {exercise.coach}
        </p>
      </div>
    </Surface>
  );
}
