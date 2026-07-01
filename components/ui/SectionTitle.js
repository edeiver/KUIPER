 "use client";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <header>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
