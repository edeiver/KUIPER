 "use client";

export default function MediaPlaceholder({ label, variant = "image" }) {
  return (
    <div className="relative min-h-56 overflow-hidden rounded-[28px] border border-white/10 bg-[#15171d]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
      {variant === "anatomy" ? (
        <>
          <div className="absolute left-1/2 top-10 h-14 w-14 -translate-x-1/2 rounded-full bg-[#dce4f4]" />
          <div className="absolute left-1/2 top-24 h-36 w-24 -translate-x-1/2 rounded-[44px] bg-[#b7c2d7]" />
          <div className="absolute left-[30%] top-32 h-24 w-4 rotate-[18deg] rounded-full bg-[#9fb7ff]" />
          <div className="absolute right-[30%] top-32 h-24 w-4 rotate-[-18deg] rounded-full bg-[#9fb7ff]" />
        </>
      ) : (
        <>
          <div className="absolute inset-x-10 bottom-0 h-40 rounded-t-full bg-[#252936]" />
          <div className="absolute left-1/2 top-12 h-16 w-16 -translate-x-1/2 rounded-full bg-[#d8deec]" />
          <div className="absolute left-1/2 top-28 h-24 w-24 -translate-x-1/2 rounded-[38px] bg-[#b9c5da]" />
          <div className="absolute left-[22%] top-36 h-5 w-32 rotate-[-22deg] rounded-full bg-[#d8deec]" />
          <div className="absolute right-[22%] top-36 h-5 w-32 rotate-[22deg] rounded-full bg-[#d8deec]" />
        </>
      )}
      {variant === "video" || variant === "gif" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-[#08090b]">
            {variant === "gif" ? "↻" : "▶"}
          </span>
        </div>
      ) : null}
      <p className="absolute left-5 top-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
        {label}
      </p>
    </div>
  );
}
