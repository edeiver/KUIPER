"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1">
      {routing.locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => router.replace(pathname, { locale: option })}
          aria-current={option === locale}
          className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
            option === locale
              ? "bg-white text-[#08090b]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
