"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Technology" },
  { href: "/playground", label: "Playground" },
];

const solutionsLinks: Array<{ href: string; label: string; sub?: boolean }> = [
  { href: "/solutions/legal", label: "Legal Hydra" },
  { href: "/solutions/legal/vault", label: "Legal Vault", sub: true },
  { href: "/solutions/medical", label: "Medical" },
  { href: "/solutions/medical/vault", label: "Clinical Vault", sub: true },
  { href: "/solutions/private", label: "Private AI" },
];

const moreLinks = [
  { href: "/proof", label: "Proof" },
  { href: "/architecture", label: "Architecture" },
  { href: "/innovation", label: "Innovation" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors", highlight: true },
];

function NavLink({ href, label, highlight }: { href: string; label: string; highlight?: boolean }) {
  const pathname = usePathname();
  const active = pathname === href;

  if (highlight) {
    return (
      <Link
        href={href}
        className={`
          relative text-sm font-mono transition-all duration-300 px-4 py-1.5 rounded-full
          ${active 
            ? "bg-ember text-void" 
            : "bg-ember/20 text-ember hover:bg-ember/30 border border-ember/50"
          }
        `}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`
        relative text-sm font-mono transition-all duration-300
        ${active ? "text-phosphor" : "text-text-ghost hover:text-text-body"}
      `}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-phosphor"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function SolutionsDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/solutions");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`
          relative text-sm font-mono transition-all duration-300 flex items-center gap-1
          ${isActive ? "text-phosphor" : "text-text-ghost hover:text-text-body"}
        `}
      >
        Solutions
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-phosphor"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-48 py-2 bg-surface-1/95 backdrop-blur-md rounded-lg border border-border-subtle shadow-lg"
          >
            {solutionsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  block py-2 text-sm font-mono transition-colors
                  ${link.sub ? "px-6 text-xs" : "px-4"}
                  ${pathname === link.href ? "text-phosphor bg-phosphor/5" : "text-text-body hover:text-phosphor hover:bg-surface-2"}
                `}
              >
                {link.sub && "└ "}{link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GlobalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-md border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-phosphor/20 border border-phosphor/50 flex items-center justify-center group-hover:bg-phosphor/30 transition-colors">
            <span className="text-phosphor font-mono text-xs font-bold">A1</span>
          </div>
          <span className="text-sm font-mono text-text-bright tracking-wide hidden sm:block">
            ALKEM1
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <SolutionsDropdown />
          {moreLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} highlight={(link as {highlight?: boolean}).highlight} />
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-ghost hover:text-text-body transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-surface-1/95 backdrop-blur-md border-b border-border-subtle"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-text-body hover:text-phosphor transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Solutions section */}
              <div className="pt-2 border-t border-border-subtle">
                <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                  Solutions
                </span>
                <div className="mt-2 space-y-2">
                  {solutionsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block font-mono text-text-body hover:text-phosphor transition-colors ${link.sub ? "text-xs pl-4" : "text-sm"}`}
                    >
                      {link.sub && "└ "}{link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* More links */}
              <div className="pt-2 border-t border-border-subtle space-y-4">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-mono transition-colors ${
                      (link as {highlight?: boolean}).highlight 
                        ? "text-ember hover:text-ember-bright" 
                        : "text-text-body hover:text-phosphor"
                    }`}
                  >
                    {(link as {highlight?: boolean}).highlight ? "🎯 " : ""}{link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
