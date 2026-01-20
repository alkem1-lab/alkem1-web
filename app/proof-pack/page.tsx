"use client";

import { useEffect } from "react";

export default function ProofPackPage() {
  useEffect(() => {
    // Auto-trigger print dialog for PDF save
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-4">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
        }
        @page {
          size: A4;
          margin: 1.5cm;
        }
      `}</style>

      {/* Header */}
      <header className="border-b-2 border-black pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">ALKEM1</h1>
            <p className="text-lg text-gray-600 mt-1">Glass Box AI — Proof Pack</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Generated: {currentDate}</p>
            <p>Document Version: 1.0</p>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Executive Summary
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-lg font-medium mb-4">
            "Trust is Dead. Verification is Alive."
          </p>
          <p className="text-gray-700 leading-relaxed">
            ALKEM1 is a provable control stack for enterprise AI: kill switch,
            mathematical proof of integrity, and real-time evidence chain. Unlike
            traditional "black box" AI systems, ALKEM1 provides verifiable control
            at every layer—with measured metrics you can audit.
          </p>
        </div>
      </section>

      {/* Three Differentiators */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Three Core Differentiators
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl mb-2">🔮</div>
            <h3 className="font-bold text-lg">VALKYRIE</h3>
            <p className="text-sm text-gray-500 mb-2">The Soul</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Cryptographic determinism</li>
              <li>• Model signing & verification</li>
              <li>• Reproducible behavior</li>
            </ul>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="font-bold text-lg">SPICE</h3>
            <p className="text-sm text-gray-500 mb-2">The Mind</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Self-improving reasoning</li>
              <li>• Adversarial challenger loop</li>
              <li>• Continuous learning pipeline</li>
            </ul>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-bold text-lg">XCK</h3>
            <p className="text-sm text-gray-500 mb-2">The Immune System</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 47ms kill switch response</li>
              <li>• Circuit breaker protection</li>
              <li>• Immutable evidence ledger</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Q.E.D. Certificate Example */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Q.E.D. Certificate Example
        </h2>
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
          <pre>{`╔══════════════════════════════════════════════════════════════╗
║                    Q.E.D. CERTIFICATE                        ║
║                  Mathematical Proof of Integrity              ║
╠══════════════════════════════════════════════════════════════╣
║  TIMESTAMP     │ 2026-01-16T14:32:00.000Z                    ║
║  ITERATION     │ #4,067                                      ║
║  STATUS        │ ✓ VERIFIED                                  ║
╠══════════════════════════════════════════════════════════════╣
║  INPUT HASH    │ sha256:9f86d0...3e25e                       ║
║  OUTPUT HASH   │ sha256:a7ffc6...8f64d                       ║
║  CHAIN HASH    │ sha256:b94d27...e3f99                       ║
╠══════════════════════════════════════════════════════════════╣
║  VERIFICATION  │ hash(prev + input + output) = chain ✓       ║
║  DETERMINISM   │ Same input → Same output (verified)         ║
║  SIGNATURE     │ Ed25519: valid                              ║
╚══════════════════════════════════════════════════════════════╝`}</pre>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Every AI operation produces a verifiable certificate. Tamper attempts are
          mathematically detectable.
        </p>
      </section>

      {/* Architecture Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          5-Layer Architecture
        </h2>
        <div className="space-y-2">
          {[
            { layer: "L5", name: "PRESENTATION", desc: "Dashboard, API Gateway, SSO" },
            { layer: "L4", name: "ORCHESTRATION", desc: "VALKYRIE Protocol, SPICE Brain" },
            { layer: "L3", name: "INTELLIGENCE", desc: "Arena Evaluation, Forge Training" },
            { layer: "L2", name: "SECURITY", desc: "XCK Kill Switch, Circuit Breaker" },
            { layer: "L1", name: "PERSISTENCE", desc: "Evidence Ledger, Memory Service" },
          ].map((l) => (
            <div key={l.layer} className="flex items-center border border-gray-200 rounded p-3">
              <span className="font-mono font-bold w-12 text-gray-500">{l.layer}</span>
              <span className="font-bold w-40">{l.name}</span>
              <span className="text-gray-600 text-sm">{l.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key Metrics */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Verified Metrics
        </h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-600">47ms</div>
            <div className="text-sm text-gray-500">Kill Switch Response</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">99.97%</div>
            <div className="text-sm text-gray-500">System Uptime</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">4,067+</div>
            <div className="text-sm text-gray-500">Verified Iterations</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-500">Undetected Breaches</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t-2 border-black pt-6">
        <h2 className="text-xl font-bold mb-4">Next Steps</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold">Request Live Audit</h3>
            <p className="text-sm text-gray-600 mb-2">
              See the system in action with your own test scenarios.
            </p>
            <p className="font-mono text-sm">audit@alkem1.com</p>
          </div>
          <div>
            <h3 className="font-bold">Book Executive Briefing</h3>
            <p className="text-sm text-gray-600 mb-2">
              20-minute call with our technical team.
            </p>
            <p className="font-mono text-sm">alkem1.com/book</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2026 ALKEM1. All rights reserved.</p>
        <p className="mt-1">www.alkem1.com | "We don't just build AI. We deliver control over AI."</p>
      </footer>

      {/* No-print button to go back */}
      <div className="no-print fixed bottom-8 right-8">
        <button
          onClick={() => window.history.back()}
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          ← Back to Site
        </button>
      </div>
    </div>
  );
}
