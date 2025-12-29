import Navbar from "./components/navbar/Navbar";
import PulseHeader from "./components/navbar/pulse/PulseHeader";
//import PulseHeader from "./components/pulse/PulseHeader";
import PulseColumn from "./components/navbar/pulse/PulseColumn";
// import PulseColumn from "./components/pulse/PulseColumn";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-6">
        <PulseHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PulseColumn title="New Pairs" />
          <PulseColumn title="Final Stretch" />
          <PulseColumn title="Migrated" />
        </div>
      </main>
    </div>
  );
}
