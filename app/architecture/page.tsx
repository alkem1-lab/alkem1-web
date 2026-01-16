"use client";

import { LenisProvider } from "../../lib/lenis";
import { GridBackground } from "../../components";
import { ArchitectureHeader } from "../../components/architecture/ArchitectureHeader";
import { LayerDiagram } from "../../components/architecture/LayerDiagram";
import { DataFlow } from "../../components/architecture/DataFlow";
import { SecurityLayer } from "../../components/architecture/SecurityLayer";

export default function ArchitecturePage() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen">
        <GridBackground />

        {/* Header */}
        <ArchitectureHeader />

        {/* 5-Layer Interactive Diagram */}
        <LayerDiagram />

        {/* Data Flow Visualization */}
        <DataFlow />

        {/* Security Layer Detail */}
        <SecurityLayer />
      </main>
    </LenisProvider>
  );
}
