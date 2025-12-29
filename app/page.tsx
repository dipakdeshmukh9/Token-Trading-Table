import Navbar from "./components/navbar/Navbar";
import PulseHeader from "./components/navbar/pulse/PulseHeader";
import PulseColumn from "./components/navbar/pulse/PulseColumn";

export const metadata = {
  title: "Axiom Pulse - Token Discovery",
  description: "Discover and track tokens in real-time",
};

export default function Page() {
  return (
    <div className="h-screen bg-[#0b0e11] text-white flex flex-col overflow-hidden">
      {/* Navbar - Fixed at top */}
      <Navbar />

      {/* PulseHeader - Fixed below navbar */}
      <div className="flex-shrink-0 border-b border-white/6 px-4 md:px-6 lg:px-8 py-3">
        <PulseHeader />
      </div>

      {/* Main Content - Fills remaining viewport */}
      <main className="flex-1 overflow-hidden px-4 md:px-6 lg:px-8 py-3">
        {/* 3-column layout - fills remaining height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          <PulseColumn title="New Pairs" category="new-pairs" />
          <PulseColumn title="Final Stretch" category="final-stretch" />
          <PulseColumn title="Migrated" category="migrated" />
        </div>
      </main>
    </div>
  );
}

