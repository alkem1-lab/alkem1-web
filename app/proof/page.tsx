"use client";

import { LenisProvider } from "../../lib/lenis";
import { GridBackground } from "../../components";
import { EvidenceChain } from "../../components/proof/EvidenceChain";
import { TamperDemo } from "../../components/proof/TamperDemo";
import { QEDCertificate } from "../../components/proof/QEDCertificate";
import { ProofHeader } from "../../components/proof/ProofHeader";

export default function ProofPage() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen">
        <GridBackground />

        {/* Header */}
        <ProofHeader />

        {/* Evidence Chain Visualization */}
        <EvidenceChain />

        {/* Try to Tamper Demo */}
        <TamperDemo />

        {/* Q.E.D. Certificate */}
        <QEDCertificate />
      </main>
    </LenisProvider>
  );
}
