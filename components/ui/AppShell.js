 "use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function AppShell({ children, className = "" }) {
  return (
    <main
      className={`min-h-screen bg-[#07080a] text-white ${className}`}
    >
      <div className="mx-auto min-h-screen w-full max-w-[430px] px-5 py-6 sm:max-w-5xl sm:px-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </main>
  );
}
