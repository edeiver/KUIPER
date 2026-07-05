"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import Surface from "@/components/ui/Surface";
import AnatomyPanel from "@/components/workouts/AnatomyPanel";
import ExerciseProgress from "@/components/workouts/ExerciseProgress";
import ExerciseSwitcherSheet from "@/components/workouts/ExerciseSwitcherSheet";
import ExerciseTabs from "@/components/workouts/ExerciseTabs";
import InsightCard from "@/components/workouts/InsightCard";
import MediaPlaceholder from "@/components/workouts/MediaPlaceholder";
import MyTrainingPanel from "@/components/workouts/MyTrainingPanel";
import ReadinessStrip from "@/components/workouts/ReadinessStrip";
import SessionCommand from "@/components/workouts/SessionCommand";
import SessionDock from "@/components/workouts/SessionDock";
import TechniquePanel from "@/components/workouts/TechniquePanel";
import { appendWorkoutSession, appendWorkoutSet } from "@/utils/workoutStorage";
import { getExerciseHistory } from "@/utils/exerciseHistory";
import { getWeightSuggestion } from "@/utils/weightSuggestion";
import { formatRelativeDate } from "@/utils/formatWorkoutSession";
import { pechoTricepsPlan, resolveExercise } from "@/data/workout-plans";
import { getSwitchableAlternatives } from "@/data/exercises/repository";

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

function WorkoutPreview({ onStartTraining, plan }) {
  const exercise = plan.exercises[0];
  const totalExercises = plan.exercises.length;

  return (
    <div className="grid gap-6 pb-32 pt-8">
      <SectionTitle
        eyebrow={`Ejercicio 1 de ${totalExercises}`}
        title={exercise.name}
        subtitle="Una sesión guiada para ejecutar mejor, controlar la intensidad y progresar sin perder técnica."
      />

      <ExerciseProgress exerciseIndex={0} totalExercises={totalExercises} />
      <SessionCommand exercise={exercise} onStartTraining={onStartTraining} />
      <ReadinessStrip exercise={exercise} />

      <section className="grid gap-4 sm:grid-cols-2">
        <InsightCard title="Objetivo de hoy">
          Hoy queremos progresar en peso manteniendo la técnica. Si completas
          todas las series con el RIR indicado, aumenta el peso la próxima semana.
        </InsightCard>
        <InsightCard title="Coach">{exercise.coach}</InsightCard>
      </section>

      <ExerciseTabs />

      <TechniquePanel exercise={exercise} />
      <MyTrainingPanel exercise={exercise} />
      <AnatomyPanel exercise={exercise} />
      <SessionDock exercise={exercise} />
    </div>
  );
}

function SetStatusBadge({ status }) {
  const styles = {
    completed: "border-[#9fb7ff]/30 bg-[#9fb7ff]/10 text-[#c8d5ff]",
    active: "border-white/20 bg-white text-[#090a0d]",
    pending: "border-white/10 bg-white/[0.04] text-zinc-500",
  };
  const labels = {
    completed: "✔ Hecha",
    active: "En curso",
    pending: "Pendiente",
  };

  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function SetRow({ index, weight, reps, status }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3.5 transition ${
        status === "active"
          ? "border-[#9fb7ff]/30 bg-[#9fb7ff]/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm font-semibold text-white">
        {index + 1}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Peso</p>
          <p className="text-sm font-semibold text-white">{weight} kg</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Reps</p>
          <p className="text-sm font-semibold text-white">{reps}</p>
        </div>
      </div>
      <SetStatusBadge status={status} />
    </div>
  );
}

function TrainingScreen({
  exercise,
  setIndex,
  totalSets,
  phase,
  exerciseIndex,
  totalExercises,
  onCompleteSet,
  onBack,
  exerciseHistory,
  weightSuggestion,
  onOpenSwitcher,
}) {
  const percent = Math.round(((exerciseIndex + 1) / totalExercises) * 100);
  const completedThroughIndex = phase === "training" ? setIndex : setIndex + 1;

  return (
    <div className="pb-36">
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between gap-3 border-b border-white/10 bg-[#07080a]/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white transition hover:bg-white/[0.09]"
        >
          ←
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-base font-semibold text-white">{exercise.name}</p>
          <p className="text-xs text-zinc-500">
            {`Ejercicio ${exerciseIndex + 1} de ${totalExercises} · ${percent}%`}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenSwitcher}
          aria-label="Cambiar ejercicio"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white transition hover:bg-white/[0.09]"
        >
          ⇄
        </button>
      </header>

      <div className="grid gap-5 pt-6">
        <Surface className="grid gap-5 p-5">
          <MediaPlaceholder
            label="Vista del ejercicio"
            variant="video"
            className="min-h-72"
          />

          <div className="grid grid-cols-3 gap-3">
            <ExerciseSummaryRow label="Peso" value={`${exercise.weight} kg`} emphasis />
            <ExerciseSummaryRow label="Reps obj." value={exercise.reps} />
            <ExerciseSummaryRow label="RIR" value={exercise.rir} />
          </div>

          <div className="rounded-[24px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8d5ff]">
              Indicación del coach
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-200">{exercise.coach}</p>
          </div>
        </Surface>

        <Surface className="grid gap-3 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Historial
          </p>
          {exerciseHistory.lastSession ? (
            <>
              <div>
                <p className="text-xs text-zinc-500">Última vez</p>
                <p className="text-base font-semibold text-white">
                  {`${formatRelativeDate(exerciseHistory.lastSession.date)} · ${exerciseHistory.lastSession.weight} kg × ${exerciseHistory.lastSession.reps} reps`}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Mejor marca</p>
                <p className="text-base font-semibold text-[#c8d5ff]">
                  {`${exerciseHistory.personalRecord.weight} kg × ${exerciseHistory.personalRecord.reps} reps`}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-500">Aún no has hecho este ejercicio antes.</p>
          )}
        </Surface>

        <Surface className="grid gap-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Sugerencia para hoy
          </p>
          <p className="text-base font-semibold text-white">{weightSuggestion.message}</p>
          {weightSuggestion.suggestedWeight != null ? (
            <p className="text-sm text-[#c8d5ff]">
              {`Peso sugerido: ${weightSuggestion.suggestedWeight} kg`}
            </p>
          ) : null}
        </Surface>

        <Surface className="grid gap-3 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Series
            </p>
            <p className="text-xs font-semibold text-zinc-500">
              {`Serie ${setIndex + 1} de ${totalSets}`}
            </p>
          </div>

          <div className="grid gap-2.5">
            {Array.from({ length: totalSets }).map((_, index) => {
              const status =
                index < completedThroughIndex
                  ? "completed"
                  : index === setIndex && phase === "training"
                    ? "active"
                    : "pending";

              return (
                <SetRow
                  key={index}
                  index={index}
                  weight={exercise.weight}
                  reps={exercise.reps}
                  status={status}
                />
              );
            })}
          </div>
        </Surface>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07080a]/95 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:px-8">
        <div className="mx-auto w-full max-w-[430px] sm:max-w-5xl">
          <PrimaryAction onClick={onCompleteSet}>Completar serie</PrimaryAction>
        </div>
      </div>
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      <section className="workout-pop grid w-full max-w-lg gap-5 rounded-[32px] border border-white/10 bg-[#101218] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
              Descanso
            </p>
            <h2 className="mt-2 text-5xl font-semibold text-white">
              {displaySeconds}
            </h2>
          </div>
          <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Próxima serie
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {upcomingLabel}
            </p>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8d5ff]">
            Consejo del coach
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-200">
            {exercise.coach}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onAddThirtySeconds}
            className="min-h-12 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.1]"
          >
            +30 segundos
          </button>
          <button
            type="button"
            onClick={onSkipRest}
            className="min-h-12 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.1]"
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

export default function WorkoutSessionFlow({ plan = pechoTricepsPlan } = {}) {
  const router = useRouter();
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
  const [exerciseHistory, setExerciseHistory] = useState({ lastSession: null, personalRecord: null });
  const [exerciseOverrides, setExerciseOverrides] = useState({});
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // Applies any chosen alternatives on top of the original plan — the plan
  // itself (`plan.exercises`) is never mutated. Reuses the same
  // `resolveExercise` merge the plan was built with, so a substituted
  // exercise keeps today's prescription (sets/reps/rir/weight) and only
  // swaps the movement's identity (name, technique, coach, ...).
  const resolvedExercises = plan.exercises.map((exercise, index) => {
    const overrideId = exerciseOverrides[index];

    if (!overrideId) {
      return exercise;
    }

    return resolveExercise({
      exerciseId: overrideId,
      sets: exercise.sets,
      reps: exercise.reps,
      rir: exercise.rir,
      weight: exercise.weight,
      repsCompleted: exercise.repsCompleted,
    });
  });

  const currentExercise = resolvedExercises[exerciseIndex];
  const nextExercise = resolvedExercises[exerciseIndex + 1];
  const basePlanExercise = plan.exercises[exerciseIndex];
  const availableAlternatives = getSwitchableAlternatives(basePlanExercise.exerciseId);

  useEffect(() => {
    setExerciseHistory(getExerciseHistory(currentExercise.exerciseId));
  }, [currentExercise.exerciseId]);

  const weightSuggestion = getWeightSuggestion({
    exercise: currentExercise,
    history: exerciseHistory,
    currentPlan: plan,
  });

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
        } else if (exerciseIndex < plan.exercises.length - 1) {
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
  }, [currentExercise.sets, exerciseIndex, phase, restEndsAt, setIndex, plan]);

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
        ? resolvedExercises.reduce((sum, exercise) => sum + exercise.sets, 0)
        : resolvedExercises.reduce((sum, exercise, index) => {
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
        ? resolvedExercises.reduce(
            (sum, exercise) => sum + exercise.sets * exercise.weight * exercise.repsCompleted,
            0,
          )
        : resolvedExercises.reduce((sum, exercise, index) => {
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
      completedExercises: phase === "completed" ? resolvedExercises.length : exerciseIndex + 1,
      totalTime: sessionStartedAt ? formatSeconds(Math.max(Math.floor((now - sessionStartedAt) / 1000), 0)) : "0:00",
    };
  }, [exerciseIndex, now, phase, sessionStartedAt, setIndex, resolvedExercises]);

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

  const openSwitcher = () => {
    setIsSwitcherOpen(true);
  };

  const closeSwitcher = () => {
    setIsSwitcherOpen(false);
  };

  const selectAlternative = (alternativeExerciseId) => {
    setExerciseOverrides((current) => ({ ...current, [exerciseIndex]: alternativeExerciseId }));
    setIsSwitcherOpen(false);
  };

  const keepOriginalExercise = () => {
    setExerciseOverrides((current) => {
      const next = { ...current };
      delete next[exerciseIndex];
      return next;
    });
    setIsSwitcherOpen(false);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/workouts");
    }
  };

  const saveWorkout = () => {
    appendWorkoutSession({
      date: new Date().toISOString(),
      durationSeconds: sessionStartedAt ? Math.max(Math.ceil((Date.now() - sessionStartedAt) / 1000), 1) : 0,
      workout: plan.title,
      totalSets: sessionSummary.totalSets,
      totalVolume: sessionSummary.totalVolume,
      exercises: resolvedExercises.map((exercise) => exercise.name),
      comments,
      energy,
      calories: null,
    });
    setSaved(true);
  };

  if (mode === "preview") {
    return (
      <AppShell>
        <WorkoutPreview onStartTraining={startTraining} plan={plan} />
      </AppShell>
    );
  }

  if (phase === "training" || phase === "rest") {
    return (
      <AppShell>
        <TrainingScreen
          exercise={currentExercise}
          setIndex={setIndex}
          totalSets={currentExercise.sets}
          phase={phase}
          exerciseIndex={exerciseIndex}
          totalExercises={plan.exercises.length}
          onCompleteSet={completeSet}
          onBack={handleBack}
          exerciseHistory={exerciseHistory}
          weightSuggestion={weightSuggestion}
          onOpenSwitcher={openSwitcher}
        />
        {phase === "rest" ? (
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
        ) : null}
        {isSwitcherOpen ? (
          <ExerciseSwitcherSheet
            alternatives={availableAlternatives}
            isSubstituted={Boolean(exerciseOverrides[exerciseIndex])}
            onSelectAlternative={selectAlternative}
            onKeepOriginal={keepOriginalExercise}
            onClose={closeSwitcher}
          />
        ) : null}
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
