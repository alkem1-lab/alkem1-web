"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
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

// Enhanced tool categories with full details
const toolCategories = [
  { 
    name: "Vulnerability Scanners", 
    icon: "🎯",
    color: "#ef4444",
    description: "Automated vulnerability detection across web apps, APIs, and infrastructure",
    tools: [
      { name: "Nuclei", desc: "Template-based scanner. 8,000+ CVE templates. Fast parallel scanning.", use: "CVE detection" },
      { name: "SQLMap", desc: "SQL injection automation. Detects 6 injection types. DB fingerprinting.", use: "SQL injection" },
      { name: "XSSer", desc: "Cross-site scripting detection. 1,300+ vectors. Bypass filter analysis.", use: "XSS attacks" },
      { name: "Nikto", desc: "Web server scanner. 7,000+ dangerous files/CGIs. SSL support.", use: "Server vulns" },
      { name: "WPScan", desc: "WordPress vulnerability scanner. Plugin/theme enumeration.", use: "WordPress" },
      { name: "Trivy", desc: "Container & filesystem scanner. SBOM generation. CI/CD ready.", use: "Container security" },
      { name: "Semgrep", desc: "Static analysis. Custom rules. Supports 30+ languages.", use: "Code analysis" },
      { name: "OSV-Scanner", desc: "Open source vulnerability scanner. Google's OSV database.", use: "Dependency scan" },
    ]
  },
  { 
    name: "Network Analysis", 
    icon: "🌐",
    color: "#3b82f6",
    description: "Deep packet inspection, port scanning, and network reconnaissance",
    tools: [
      { name: "Nmap", desc: "Port scanner & network mapper. OS detection. Service versioning.", use: "Port scanning" },
      { name: "Masscan", desc: "Internet-scale port scanner. 10M packets/sec. Async transmission.", use: "Mass scanning" },
      { name: "Shodan", desc: "IoT search engine. Banner grabbing. Historical data.", use: "Asset discovery" },
      { name: "Wireshark", desc: "Packet analyzer. 3,000+ protocols. Real-time capture.", use: "Traffic analysis" },
      { name: "Zeek", desc: "Network security monitor. Protocol parsing. Script language.", use: "IDS/monitoring" },
      { name: "TCPDump", desc: "CLI packet analyzer. BPF filtering. Low-level capture.", use: "Quick capture" },
    ]
  },
  { 
    name: "Web Security", 
    icon: "🕸️",
    color: "#8b5cf6",
    description: "Web application testing, API security, and penetration testing tools",
    tools: [
      { name: "Burp Suite", desc: "Web app security platform. Proxy, scanner, intruder. Industry standard.", use: "Web pentesting" },
      { name: "OWASP ZAP", desc: "Open source web scanner. Automated + manual testing. API support.", use: "DAST scanning" },
      { name: "Ffuf", desc: "Fast web fuzzer. Content discovery. Parameter brute-forcing.", use: "Fuzzing" },
      { name: "Gobuster", desc: "Directory/DNS brute-forcer. Written in Go. Fast enumeration.", use: "Dir enumeration" },
      { name: "Httpx", desc: "HTTP toolkit. Probe multiple hosts. Tech detection.", use: "HTTP probing" },
      { name: "Katana", desc: "Web crawler. JavaScript rendering. Headless browsing.", use: "Crawling" },
      { name: "Arjun", desc: "HTTP parameter discovery. Hidden params. Multiple methods.", use: "Param discovery" },
    ]
  },
  { 
    name: "Forensics & IR", 
    icon: "🔬",
    color: "#f59e0b",
    description: "Digital forensics, memory analysis, and incident response toolkit",
    tools: [
      { name: "Volatility", desc: "Memory forensics framework. 200+ plugins. Windows/Linux/Mac.", use: "RAM analysis" },
      { name: "Autopsy", desc: "Digital forensics GUI. Timeline analysis. File recovery.", use: "Disk forensics" },
      { name: "Sleuth Kit", desc: "CLI forensics tools. File system analysis. Hash databases.", use: "FS analysis" },
      { name: "YARA", desc: "Pattern matching. Malware classification. Custom rules.", use: "Malware ID" },
      { name: "Plaso", desc: "Timeline creation. 80+ parsers. Super timeline.", use: "Timeline" },
      { name: "Velociraptor", desc: "Endpoint monitoring. Live forensics. Threat hunting.", use: "EDR/hunting" },
    ]
  },
];

export function SecurityLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Vulnerability Scanners");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const totalTools = toolCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

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
              SOAR platform with {totalTools}+ security tools. Every action is monitored,
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

          {/* Tool Arsenal - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-surface-1/30 border border-border-subtle overflow-hidden"
          >
            {/* Arsenal Header */}
            <div className="p-6 border-b border-border-subtle bg-void/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-mono text-crimson flex items-center gap-2">
                    <span className="text-2xl">🛡️</span>
                    Tool Arsenal
                  </h3>
                  <p className="text-xs text-text-ghost mt-1">Click category to explore tools</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-crimson">{totalTools}+</div>
                  <div className="text-[10px] text-text-ghost uppercase tracking-wider">Tools Integrated</div>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {toolCategories.map((category) => {
                const isExpanded = expandedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setExpandedCategory(
                      isExpanded ? null : category.name
                    )}
                    className="relative p-4 text-left transition-all border-r border-b border-border-subtle last:border-r-0 group"
                    style={{
                      backgroundColor: isExpanded ? `${category.color}15` : undefined,
                    }}
                  >
                    {/* Active indicator - left border */}
                    {isExpanded && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: category.color }}
                      />
                    )}
                    
                    {/* Hover overlay */}
                    <div 
                      className={`
                        absolute inset-0 transition-opacity pointer-events-none
                        ${isExpanded ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
                      `}
                      style={{ backgroundColor: `${category.color}08` }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className={`text-xl transition-transform ${isExpanded ? 'scale-110' : 'group-hover:scale-105'}`}
                        >
                          {category.icon}
                        </span>
                        <span 
                          className={`text-sm font-mono font-bold ${isExpanded ? '' : 'group-hover:brightness-125'}`}
                          style={{ color: category.color }}
                        >
                          {category.tools.length}
                        </span>
                      </div>
                      <div 
                        className={`text-sm font-medium transition-colors ${isExpanded ? '' : 'text-text-bright group-hover:text-white'}`}
                        style={{ color: isExpanded ? category.color : undefined }}
                      >
                        {category.name}
                      </div>
                      <div className={`text-[10px] mt-1 line-clamp-2 transition-colors ${isExpanded ? 'text-text-body' : 'text-text-ghost'}`}>
                        {category.description}
                      </div>
                      <div 
                        className={`
                          mt-3 text-[10px] font-mono flex items-center gap-1 
                          px-2 py-1 rounded-md w-fit transition-all
                          ${isExpanded 
                            ? 'bg-white/10' 
                            : 'bg-transparent group-hover:bg-white/5'
                          }
                        `}
                        style={{ color: category.color }}
                      >
                        <span className={`transition-transform ${isExpanded ? 'rotate-0' : 'group-hover:translate-x-0.5'}`}>
                          {isExpanded ? '▼' : '▶'}
                        </span>
                        <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Tool Details */}
            <AnimatePresence>
              {expandedCategory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {toolCategories
                    .filter((cat) => cat.name === expandedCategory)
                    .map((category) => (
                      <div key={category.name} className="p-6 bg-void/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.tools.map((tool, idx) => (
                            <motion.div
                              key={tool.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onMouseEnter={() => setHoveredTool(tool.name)}
                              onMouseLeave={() => setHoveredTool(null)}
                              className={`
                                p-4 rounded-lg border transition-all cursor-default
                                ${hoveredTool === tool.name 
                                  ? 'bg-surface-1/50 border-border-subtle scale-[1.02]' 
                                  : 'bg-surface-1/20 border-transparent'
                                }
                              `}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span 
                                      className="font-mono text-sm font-semibold"
                                      style={{ color: category.color }}
                                    >
                                      {tool.name}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[9px] bg-surface-2 text-text-ghost uppercase">
                                      {tool.use}
                                    </span>
                                  </div>
                                  <p className="text-xs text-text-body mt-2 leading-relaxed">
                                    {tool.desc}
                                  </p>
                                </div>
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                                  style={{ backgroundColor: `${category.color}15` }}
                                >
                                  {category.icon}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats Footer */}
            <div className="p-4 bg-void/50 border-t border-border-subtle">
              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-text-ghost">
                {toolCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-1">
                    <span>{cat.icon}</span>
                    <span style={{ color: cat.color }} className="font-mono">{cat.tools.length}</span>
                    <span>{cat.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
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
