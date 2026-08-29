"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function QuickAccessGrid() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const items = [
    { label: t("workouts"), href: "/workouts" },
    { label: t("progress"), href: "/progress" },
    { label: t("nutrition"), href: null },
    { label: t("settings"), href: "/settings" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) =>
        item.href ? (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 text-center transition hover:border-white/20 hover:bg-white/[0.09]"
          >
            <p className="text-sm font-semibold text-white">{item.label}</p>
          </Link>
        ) : (
          <div
            key={item.label}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-center opacity-60"
          >
            <p className="text-sm font-semibold text-zinc-400">{item.label}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
              {tCommon("comingSoon")}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
