"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import AnatomyPanel from "@/components/workouts/AnatomyPanel";
import ExerciseProgress from "@/components/workouts/ExerciseProgress";
import ExerciseTabs from "@/components/workouts/ExerciseTabs";
import InsightCard from "@/components/workouts/InsightCard";
import MyTrainingPanel from "@/components/workouts/MyTrainingPanel";
import ReadinessStrip from "@/components/workouts/ReadinessStrip";
import SessionCommand from "@/components/workouts/SessionCommand";
import SessionDock from "@/components/workouts/SessionDock";
import TechniquePanel from "@/components/workouts/TechniquePanel";
import { appendWorkoutSession, appendWorkoutSet } from "@/utils/workoutStorage";

const workoutPlan = {
  title: "Pecho + Tríceps",
  exercises: [
    {
      name: "Press inclinado con mancuernas",
      objective: "Más carga.",
      weight: 24,
      reps: "8 - 10",
      repsCompleted: 10,
      rir: "2",
      tempo: "3-1-1",
      restSeconds: 120,
      coach: "Baja lento durante 3 segundos y evita despegar los hombros del banco.",
      muscles: "Pecho superior, tríceps, deltoide anterior",
    },
    {
      name: "Press plano en máquina",
      objective: "Más estabilidad.",
      weight: 30,
      reps: "8 - 10",
      repsCompleted: 10,
      rir: "2",
      tempo: "2-1-1",
      restSeconds: 120,
      coach: "Asegura una línea de empuje consistente en cada repetición.",
      muscles: "Pecho medio, tríceps, deltoide anterior",
    },
    {
      name: "Aperturas en polea",
      objective: "Más tensión.",
      weight: 14,
      reps: "12 - 15",
      repsCompleted: 12,
      rir: "2",
      tempo: "3-1-2",
      restSeconds: 90,
      coach: "Conserva el arco suave y siente el pecho trabajando todo el recorrido.",
      muscles: "Pecho, deltoide anterior",
    },
    {
      name: "Fondos asistidos",
      objective: "Más control.",
      weight: 18,
      reps: "8 - 12",
      repsCompleted: 10,
      rir: "1 - 2",
      tempo: "2-1-1",
      restSeconds: 120,
      coach: "No colapses en el fondo y mantén el torso estable.",
      muscles: "Pecho inferior, tríceps, hombro anterior",
    },
    {
      name: "Extensión de tríceps en cuerda",
      objective: "Más contracción.",
      weight: 18,
      reps: "10 - 12",
      repsCompleted: 12,
      rir: "2",
      tempo: "2-1-1",
      restSeconds: 75,
      coach: "Separa la cuerda al final sin perder el control del codo.",
      muscles: "Tríceps, antebrazo",
    },
    {
      name: "Press francés",
      objective: "Cerrar con precisión.",
      weight: 16,
      reps: "10 - 12",
      repsCompleted: 10,
      rir: "1 - 2",
      tempo: "3-1-1",
      restSeconds: 90,
      coach: "Mantén los codos alineados y la bajada controlada.",
      muscles: "Tríceps, deltoide anterior",
    },
  ],
};

function formatSeconds(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function ExerciseSummaryRow({ label, value, emphasis = false }) {
  return (
    <div
      className={`rounded-[24px] border p-4 ${
        emphasis ? "border-[#9fb7ff]/30 bg-[#9fb7ff]/10" : "border-white/10 bg-white/[0.05]"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function WorkoutPreview({ onStartTraining }) {
  return (
    <div className="grid gap-6 pb-32 pt-8">
      <SectionTitle
        eyebrow="Ejercicio 1 de 6"
        title={workoutPlan.exercises[0].name}
        subtitle="Una sesión guiada para ejecutar mejor, controlar la intensidad y progresar sin perder técnica."
      />

      <ExerciseProgress />
      <SessionCommand onStartTraining={onStartTraining} />
      <ReadinessStrip />

      <section className="grid gap-4 sm:grid-cols-2">
        <InsightCard title="Objetivo de hoy">
          Hoy queremos progresar en peso manteniendo la técnica. Si completas
          las cuatro series con RIR correcto, aumenta el peso la próxima semana.
        </InsightCard>
        <InsightCard title="Coach">
          Recuerda bajar el peso lentamente durante 3 segundos y evitar
          despegar los hombros del banco.
        </InsightCard>
      </section>

      <ExerciseTabs />

      <TechniquePanel />
      <MyTrainingPanel />
      <AnatomyPanel />
      <SessionDock />
    </div>
  );
}

function TrainingScreen({
  exercise,
  setNumber,
  totalSets,
  onCompleteSet,
}) {
  return (
    <div className="flex min-h-[calc(100vh-48px)] items-center justify-center py-8">
      <section className="w-full max-w-xl rounded-[36px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
              Modo entrenamiento
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              {exercise.name}
            </h1>
          </div>
          <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-white">
            Serie {setNumber} de {totalSets}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ExerciseSummaryRow label="Peso recomendado" value={`${exercise.weight} kg`} emphasis />
          <ExerciseSummaryRow label="Repeticiones objetivo" value={exercise.reps} />
          <ExerciseSummaryRow label="RIR" value={exercise.rir} />
          <ExerciseSummaryRow label="Tempo" value={exercise.tempo} />
        </div>

        <button
          type="button"
          onClick={onCompleteSet}
          className="mt-6 flex min-h-16 w-full items-center justify-center rounded-[28px] bg-white px-6 text-base font-semibold text-[#090a0d] shadow-[0_24px_70px_rgba(255,255,255,0.18)] transition hover:bg-zinc-200"
        >
          Completar serie
        </button>
      </section>
    </div>
  );
}

function SetCompleteOverlay({ reps }) {
  return (
    <div className="flex min-h-[calc(100vh-48px)] items-center justify-center py-8">
      <div className="workout-pop w-full max-w-lg rounded-[36px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl text-[#08090b]">
          ✔
        </div>
        <p className="mt-6 text-3xl font-semibold text-white">Serie completada</p>
        <p className="mt-3 text-5xl font-semibold text-white">{reps} repeticiones</p>
        <p className="mt-4 text-lg text-zinc-300">Excelente.</p>
      </div>
    </div>
  );
}

function RestScreen({
  exercise,
  remainingSeconds,
  onAddThirtySeconds,
  onSkipRest,
  upcomingLabel,
}) {
  const displaySeconds = remainingSeconds > 5 ? formatSeconds(remainingSeconds) : String(Math.max(remainingSeconds, 0));

  return (
    <div className="flex min-h-[calc(100vh-48px)] items-center justify-center py-8">
      <section className="grid w-full max-w-2xl gap-6 rounded-[36px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
              Descanso
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              {displaySeconds}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Tiempo restante para la siguiente serie.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Próxima serie
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {upcomingLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ExerciseSummaryRow label="Peso" value={`${exercise.weight} kg`} emphasis />
          <ExerciseSummaryRow label="RIR" value={exercise.rir} />
          <ExerciseSummaryRow label="Tempo" value={exercise.tempo} />
        </div>

        <div className="rounded-[28px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8d5ff]">
            Consejo del coach
          </p>
          <p className="mt-3 text-base leading-7 text-zinc-200">
            {exercise.coach}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onAddThirtySeconds}
            className="min-h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.08]"
          >
            +30 segundos
          </button>
          <button
            type="button"
            onClick={onSkipRest}
            className="min-h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.08]"
          >
            Omitir descanso
          </button>
        </div>
      </section>
    </div>
  );
}

function TransitionScreen({ nextExercise }) {
  return (
    <div className="flex min-h-[calc(100vh-48px)] items-center justify-center py-8">
      <section className="w-full max-w-lg rounded-[36px] border border-white/10 bg-white/[0.06] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
          Siguiente ejercicio
        </p>
        <h2 className="mt-4 text-4xl font-semibold text-white">
          {nextExercise.name}
        </h2>
        <p className="mt-4 text-lg text-zinc-300">Objetivo: {nextExercise.objective}</p>
      </section>
    </div>
  );
}

function WorkoutSummary({ summary, comments, energy, onCommentsChange, onEnergyChange, onSave, saved }) {
  return (
    <div className="grid gap-6 py-8">
      <SectionTitle
        eyebrow="Entrenamiento completado"
        title="Excelente trabajo."
        subtitle="La sesión quedó guardada localmente en el dispositivo."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <ExerciseSummaryRow label="Tiempo total" value={summary.totalTime} emphasis />
        <ExerciseSummaryRow label="Series realizadas" value={String(summary.totalSets)} />
        <ExerciseSummaryRow label="Volumen total" value={`${summary.totalVolume} kg`} />
        <ExerciseSummaryRow label="Ejercicios completados" value={String(summary.completedExercises)} />
        <ExerciseSummaryRow label="Calorías" value="-- kcal" />
        <ExerciseSummaryRow label="Estado de energía" value={energy} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {["Alta", "Media", "Baja"].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onEnergyChange(level)}
            className={`rounded-[24px] border p-4 text-left text-sm font-semibold transition ${
              energy === level
                ? "border-[#9fb7ff]/40 bg-[#9fb7ff]/10 text-white"
                : "border-white/10 bg-white/[0.05] text-zinc-400 hover:bg-white/[0.08]"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          Comentarios
        </p>
        <textarea
          value={comments}
          onChange={(event) => onCommentsChange(event.target.value)}
          rows={5}
          className="mt-4 w-full resize-none rounded-[24px] border border-white/10 bg-black/20 p-4 text-base text-white outline-none placeholder:text-zinc-600"
          placeholder="Añade sensaciones, notas o ajustes para la próxima sesión."
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        className="flex min-h-16 w-full items-center justify-center rounded-[28px] bg-white px-6 text-base font-semibold text-[#090a0d] shadow-[0_24px_70px_rgba(255,255,255,0.18)] transition hover:bg-zinc-200"
      >
        {saved ? "Entrenamiento guardado" : "Guardar entrenamiento"}
      </button>
    </div>
  );
}

export default function WorkoutSessionFlow() {
  const [mode, setMode] = useState("preview");
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [phase, setPhase] = useState("preview");
  const [restEndsAt, setRestEndsAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [setStartedAt, setSetStartedAt] = useState(null);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState("");
  const [energy, setEnergy] = useState("Alta");
  const [pendingTransitionIndex, setPendingTransitionIndex] = useState(null);

  const currentExercise = workoutPlan.exercises[exerciseIndex];
  const nextExercise = workoutPlan.exercises[exerciseIndex + 1];

  useEffect(() => {
    if (mode === "preview") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    if (phase !== "rest" || !restEndsAt) {
      return undefined;
    }

    const tick = () => {
      const remaining = Math.max(Math.ceil((restEndsAt - Date.now()) / 1000), 0);

      if (remaining <= 0) {
        if (setIndex < currentExercise.sets - 1) {
          setSetIndex((value) => value + 1);
          setSetStartedAt(Date.now());
          setPhase("training");
          setRestEndsAt(null);
        } else if (exerciseIndex < workoutPlan.exercises.length - 1) {
          setPendingTransitionIndex(exerciseIndex + 1);
          setPhase("transition");
          setRestEndsAt(null);
        } else {
          setPhase("completed");
          setRestEndsAt(null);
        }
      }
    };

    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [currentExercise.sets, exerciseIndex, phase, restEndsAt, setIndex]);

  useEffect(() => {
    if (phase !== "transition" || pendingTransitionIndex === null) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setExerciseIndex(pendingTransitionIndex);
      setSetIndex(0);
      setSetStartedAt(Date.now());
      setPendingTransitionIndex(null);
      setPhase("training");
      setSaved(false);
      setComments("");
      setEnergy("Alta");
      setNow(Date.now());
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [phase, pendingTransitionIndex]);

  const sessionSummary = useMemo(() => {
    const totalSetsCompleted =
      phase === "completed"
        ? workoutPlan.exercises.reduce((sum, exercise) => sum + exercise.sets, 0)
        : workoutPlan.exercises.reduce((sum, exercise, index) => {
            if (index < exerciseIndex) {
              return sum + exercise.sets;
            }

            if (index > exerciseIndex) {
              return sum;
            }

            return sum + setIndex + (phase === "training" ? 0 : 1);
          }, 0);

    const totalVolumeCompleted =
      phase === "completed"
        ? workoutPlan.exercises.reduce(
            (sum, exercise) => sum + exercise.sets * exercise.weight * exercise.repsCompleted,
            0,
          )
        : workoutPlan.exercises.reduce((sum, exercise, index) => {
            if (index < exerciseIndex) {
              return sum + exercise.sets * exercise.weight * exercise.repsCompleted;
            }

            if (index > exerciseIndex) {
              return sum;
            }

            return sum + (setIndex + (phase === "training" ? 0 : 1)) * exercise.weight * exercise.repsCompleted;
          }, 0);

    return {
      totalVolume: totalVolumeCompleted,
      totalSets: totalSetsCompleted,
      completedExercises: phase === "completed" ? workoutPlan.exercises.length : exerciseIndex + 1,
      totalTime: sessionStartedAt ? formatSeconds(Math.max(Math.floor((now - sessionStartedAt) / 1000), 0)) : "0:00",
    };
  }, [exerciseIndex, now, phase, sessionStartedAt, setIndex]);

  useEffect(() => {
    if (phase === "training" && sessionStartedAt === null) {
      setSessionStartedAt(Date.now());
      setSetStartedAt(Date.now());
    }
  }, [phase, sessionStartedAt]);

  const startTraining = () => {
    setMode("training");
    setPhase("training");
    setSessionStartedAt(Date.now());
    setSetStartedAt(Date.now());
    setSaved(false);
  };

  const completeSet = () => {
    if (!setStartedAt) {
      return;
    }

    const durationSeconds = Math.max(Math.ceil((Date.now() - setStartedAt) / 1000), 1);

    appendWorkoutSet({
      date: new Date().toISOString(),
      durationSeconds,
      exercise: currentExercise.name,
      weight: currentExercise.weight,
      reps: currentExercise.repsCompleted,
    });

    setPhase("set-complete");

    window.setTimeout(() => {
      setPhase("rest");
      setRestEndsAt(Date.now() + currentExercise.restSeconds * 1000);
      setNow(Date.now());
    }, 1200);
  };

  const extendRest = () => {
    setRestEndsAt((current) => (current ? current + 30000 : Date.now() + 30000));
  };

  const skipRest = () => {
    setRestEndsAt(Date.now());
  };

  const saveWorkout = () => {
    appendWorkoutSession({
      date: new Date().toISOString(),
      durationSeconds: sessionStartedAt ? Math.max(Math.ceil((Date.now() - sessionStartedAt) / 1000), 1) : 0,
      workout: workoutPlan.title,
      totalSets: sessionSummary.totalSets,
      totalVolume: sessionSummary.totalVolume,
      exercises: workoutPlan.exercises.map((exercise) => exercise.name),
      comments,
      energy,
      calories: null,
    });
    setSaved(true);
  };

  if (mode === "preview") {
    return (
      <AppShell>
        <WorkoutPreview onStartTraining={startTraining} />
      </AppShell>
    );
  }

  if (phase === "training") {
    return (
      <AppShell>
        <TrainingScreen
          exercise={currentExercise}
          setNumber={setIndex + 1}
          totalSets={currentExercise.sets}
          onCompleteSet={completeSet}
        />
      </AppShell>
    );
  }

  if (phase === "set-complete") {
    return (
      <AppShell>
        <SetCompleteOverlay reps={currentExercise.repsCompleted} />
      </AppShell>
    );
  }

  if (phase === "rest") {
    return (
      <AppShell>
        <RestScreen
          exercise={currentExercise}
          remainingSeconds={restEndsAt ? Math.max(Math.ceil((restEndsAt - now) / 1000), 0) : 0}
          onAddThirtySeconds={extendRest}
          onSkipRest={skipRest}
          upcomingLabel={
            setIndex < currentExercise.sets - 1
              ? `Serie ${setIndex + 2}`
              : nextExercise
                ? nextExercise.name
                : "Resumen final"
          }
        />
      </AppShell>
    );
  }

  if (phase === "transition" && nextExercise) {
    return (
      <AppShell>
        <TransitionScreen nextExercise={nextExercise} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <WorkoutSummary
        summary={sessionSummary}
        comments={comments}
        energy={energy}
        onCommentsChange={setComments}
        onEnergyChange={setEnergy}
        onSave={saveWorkout}
        saved={saved}
      />
    </AppShell>
  );
}
