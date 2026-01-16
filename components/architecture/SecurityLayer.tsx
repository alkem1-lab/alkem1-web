"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const securityFeatures = [
  {
    name: "Kill Switch",
    description: "Emergency halt in 47ms",
    icon: "🔴",
    stats: "47ms response",
    color: "text-crimson",
    bgColor: "bg-crimson/10",
    borderColor: "border-crimson/30",
  },
  {
    name: "Evidence Chain",
    description: "Tamper-proof audit trail",
    icon: "🔗",
    stats: "12,847 blocks",
    color: "text-phosphor",
    bgColor: "bg-phosphor/10",
    borderColor: "border-phosphor/30",
  },
  {
    name: "Circuit Breaker",
    description: "Auto-recovery from failures",
    icon: "⚡",
    stats: "3-state FSM",
    color: "text-ember",
    bgColor: "bg-ember/10",
    borderColor: "border-ember/30",
  },
  {
    name: "Rate Limiter",
    description: "Request throttling",
    icon: "🚦",
    stats: "100 req/min",
    color: "text-neural-1",
    bgColor: "bg-neural-1/10",
    borderColor: "border-neural-1/30",
  },
];

const toolCategories = [
  { name: "Vulnerability Scanners", tools: ["Nuclei", "SQLMap", "XSSer"], count: 8 },
  { name: "Network Analysis", tools: ["Nmap", "Masscan", "Shodan"], count: 6 },
  { name: "Web Security", tools: ["Burp", "ZAP", "Nikto"], count: 7 },
  { name: "Forensics", tools: ["Volatility", "Autopsy", "Sleuth"], count: 6 },
];

export function SecurityLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 px-6 pb-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson/10 border border-crimson/30 mb-6">
              <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                XCK Security Layer
              </span>
            </div>
            <h2
              className="text-3xl font-display text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Enterprise Protection
            </h2>
            <p className="text-text-body max-w-xl mx-auto">
              SOAR platform with 27+ security tools. Every action is monitored,
              every threat is neutralized.
            </p>
          </div>

          {/* Core features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-lg border ${feature.bgColor} ${feature.borderColor}
                  hover:scale-105 transition-transform
                `}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h4 className={`font-mono text-sm ${feature.color}`}>{feature.name}</h4>
                <p className="text-xs text-text-ghost mt-1">{feature.description}</p>
                <div className={`text-xs font-mono ${feature.color} mt-2`}>{feature.stats}</div>
              </motion.div>
            ))}
          </div>

          {/* Tool arsenal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg bg-surface-1/50 border border-border-subtle"
          >
            <h3 className="text-sm font-mono text-crimson mb-4">Tool Arsenal</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toolCategories.map((category) => (
                <div key={category.name}>
                  <div className="text-xs text-text-ghost mb-2">{category.name}</div>
                  <div className="space-y-1">
                    {category.tools.map((tool) => (
                      <div key={tool} className="text-xs font-mono text-text-body">
                        • {tool}
                      </div>
                    ))}
                    <div className="text-[10px] text-text-ghost">
                      +{category.count - 3} more
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border-subtle text-center">
              <span className="text-xs text-text-ghost">
                Total: <span className="text-crimson font-mono">27+ tools</span> integrated
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              href="/proof"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-crimson/10 border border-crimson/30 text-crimson hover:bg-crimson/20 transition-colors font-mono text-sm"
            >
              <span>See Evidence Chain in Action</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
