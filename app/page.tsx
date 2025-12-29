import Navbar from "./components/navbar/Navbar";
import PulseHeader from "./components/navbar/pulse/PulseHeader";
import PulseColumn from "./components/navbar/pulse/PulseColumn";

export const metadata = {
  title: "Axiom Pulse - Token Discovery",
  description: "Discover and track tokens in real-time",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <PulseHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <PulseColumn title="New Pairs" category="new-pairs" />
          <PulseColumn title="Final Stretch" category="final-stretch" />
          <PulseColumn title="Migrated" category="migrated" />
        </div>
      </main>
    </div>
  );
}

