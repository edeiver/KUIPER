 "use client";

const tabs = [
  ["Técnica", "#tecnica"],
  ["Mi entrenamiento", "#mi-entrenamiento"],
  ["Anatomía", "#anatomia"],
];

export default function ExerciseTabs() {
  return (
    <nav className="sticky top-4 z-10 grid grid-cols-3 gap-2 rounded-full border border-white/10 bg-[#101116]/90 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      {tabs.map(([tab, href], index) => (
        <a
          key={tab}
          href={href}
          className={`flex min-h-11 items-center justify-center rounded-full px-3 text-center text-xs font-semibold transition sm:text-sm ${
            index === 0
              ? "bg-white text-[#08090b]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {tab}
        </a>
      ))}
    </nav>
  );
}
