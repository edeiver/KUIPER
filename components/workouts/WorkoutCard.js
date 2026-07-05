 "use client";

import Link from "next/link";

export default function WorkoutCard({ title, focus, duration, week, href, disabled = false }) {
  const body = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          {week}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{focus}</p>
      </div>
      {disabled ? (
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Próximamente
        </span>
      ) : (
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#08090b]">
          {duration}
        </span>
      )}
    </div>
  );

  if (disabled) {
    return (
      <div className="block rounded-[28px] border border-white/10 bg-white/[0.04] p-5 opacity-60">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="block rounded-[28px] border border-white/10 bg-white/[0.06] p-5 transition hover:border-white/20 hover:bg-white/[0.09]"
    >
      {body}
    </Link>
  );
}
