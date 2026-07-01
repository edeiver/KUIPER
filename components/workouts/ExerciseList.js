 "use client";

export default function ExerciseList({ exercises }) {
  return (
    <div className="grid gap-3">
      {exercises.map((exercise, index) => (
        <div
          key={exercise}
          className="flex items-center gap-4 rounded-2xl bg-white/[0.05] p-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#08090b]">
            {index + 1}
          </span>
          <p className="text-base font-medium text-zinc-100">{exercise}</p>
        </div>
      ))}
    </div>
  );
}
