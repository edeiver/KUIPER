 "use client";

import { Link } from "@/i18n/navigation";

export default function PrimaryAction({
  href,
  children,
  className = "",
  onClick,
  type = "button",
}) {
  const classes = `flex min-h-16 w-full items-center justify-center rounded-[28px] bg-white px-6 text-base font-semibold text-[#090a0d] shadow-[0_24px_70px_rgba(255,255,255,0.18)] transition hover:bg-zinc-200 ${className}`;

  if (!href) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
