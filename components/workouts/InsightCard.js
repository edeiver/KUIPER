 "use client";

export default function InsightCard({ title, children }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
        {title}
      </p>
      <p className="mt-4 text-base leading-7 text-zinc-100">{children}</p>
    </article>
  );
}
