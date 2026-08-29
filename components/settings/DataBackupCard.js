"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Surface from "@/components/ui/Surface";
import { exportWorkoutData, importWorkoutData } from "@/utils/workoutStorage";

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export default function DataBackupCard() {
  const t = useTranslations("settings.backup");
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleExport = () => {
    const data = exportWorkoutData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `kuiper-backup-${todayStamp()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    setStatus({
      type: "success",
      message: t("exportSuccess", { sessions: data.sessions.length, sets: data.sets.length }),
    });
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        importWorkoutData(data);
        setStatus({
          type: "success",
          message: t("importSuccess", { sessions: data.sessions.length, sets: data.sets.length }),
        });
        window.setTimeout(() => window.location.reload(), 1000);
      } catch {
        setStatus({ type: "error", message: t("importError") });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {t("title")}
      </p>
      <p className="text-sm text-zinc-400">
        {t("description")}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.09]"
        >
          {t("export")}
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.09]"
        >
          {t("import")}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {status ? (
        <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-[#9fb7ff]"}`}>
          {status.message}
        </p>
      ) : null}
    </Surface>
  );
}
