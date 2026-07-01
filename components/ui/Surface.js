 "use client";

export default function Surface({ children, className = "" }) {
  return (
    <section
      className={`rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}
