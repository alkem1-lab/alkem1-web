"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GlobalHeader } from "../ui/GlobalHeader";
import { isUnlocked } from "./GateLanding";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const unlocked = isUnlocked();
    if (pathname === "/" && unlocked) {
      router.replace("/home");
      return;
    }
    if (pathname !== "/" && !unlocked) {
      router.replace("/");
      return;
    }
  }, [mounted, pathname, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="w-8 h-8 rounded-full border-2 border-phosphor/50 border-t-phosphor animate-spin" />
      </div>
    );
  }

  const unlocked = isUnlocked();
  const isGatePage = pathname === "/";

  return (
    <>
      {!isGatePage && <GlobalHeader />}
      <div className={isGatePage ? "" : "pt-14"}>
        {children}
      </div>
    </>
  );
}
