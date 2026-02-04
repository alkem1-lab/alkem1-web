"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "site_unlocked";

export function GateLanding() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSubmitting(true);
      const expected = process.env.NEXT_PUBLIC_SITE_PASSWORD || "alkem1";
      if (password === expected) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(STORAGE_KEY, "1");
        }
        router.push("/home");
        return;
      }
      setError("Invalid password.");
      setSubmitting(false);
    },
    [password, router]
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        {/* Impulse - pulsating circle (higher up) */}
        <div className="flex justify-center mb-16">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border-[2px]"
              style={{
                width: 120,
                height: 120,
                borderColor: "rgba(110, 231, 183, 0.2)",
              }}
              animate={{
                scale: [1, 1.5, 1.8, 1],
                opacity: [0.6, 0.3, 0.1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute rounded-full border-[2px]"
              style={{
                width: 120,
                height: 120,
                borderColor: "rgba(110, 231, 183, 0.4)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.div
              className="rounded-full border-2 border-phosphor/60 bg-phosphor/5"
              style={{ width: 120, height: 120 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(110, 231, 183, 0.2)",
                  "0 0 40px rgba(110, 231, 183, 0.3)",
                  "0 0 20px rgba(110, 231, 183, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Password form - lower, discrete, input + Enter inline */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 w-full max-w-[280px]">
            <input
              id="gate-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="
                flex-1 min-w-0 px-3 py-2 rounded-lg text-sm font-mono
                bg-surface-2 border border-border-subtle
                text-text-bright placeholder:text-text-ghost/50
                focus:outline-none focus:border-phosphor/50 focus:ring-1 focus:ring-phosphor/30
                transition-colors
              "
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !password.trim()}
              className="
                shrink-0 px-4 py-2 rounded-lg text-xs font-mono
                bg-phosphor text-void hover:bg-phosphor/90
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {submitting ? "…" : "Enter"}
            </button>
          </div>
          {error && (
            <p className="text-xs font-mono text-crimson">{error}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export { STORAGE_KEY };
