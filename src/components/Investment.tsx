import React from "react";
import { TrendingUp, DollarSign, KeyRound, Building2, CheckCircle2 } from "lucide-react";

export const Investment: React.FC = () => {
  const milestones = [
    {
      pct: "10%",
      phase: "Reservation Deposit",
      desc: "Secures priority unit allocation and locks in pre-construction baseline pricing.",
      highlight: true,
    },
    {
      pct: "40%",
      phase: "Construction Phase",
      desc: "Spread across verified quarterly structural milestones throughout build progress.",
      highlight: false,
    },
    {
      pct: "10%",
      phase: "Structure Completion",
      desc: "Payable upon architectural superstructure top-out and external glass installation.",
      highlight: false,
    },
    {
      pct: "40%",
      phase: "Key Handover",
      desc: "Final balance upon deed transfer, title registration, and formal key handover.",
      highlight: false,
    },
  ];

  const investorPoints = [
    {
      title: "12–16% Projected Net Rental Yield",
      desc: "Prime address ensures high demand from multinational executives and diplomatic missions.",
    },
    {
      title: "Hard Currency Capital Growth",
      desc: "Residences act as a prime inflation and foreign exchange hedge in premier Nigerian sub-markets.",
    },
    {
      title: "Turnkey Property Asset Management",
      desc: "Optional full-service leasing, maintenance, and concierge rental dispatch for global diaspora owners.",
    },
  ];

  return (
    <section id="investment" className="py-28 bg-[#070c16]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block">
              04 // Capital Security
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Transparent Milestone-Linked Investment
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-[400px] leading-relaxed">
            Constructed with institutional oversight. Payments are strictly linked to verified engineering milestones.
          </p>
        </div>

        {/* Milestone Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/10 p-[1px] mb-16">
          {milestones.map((m, idx) => (
            <div
              key={m.phase}
              className={`p-8 flex flex-col justify-between min-h-[220px] transition-colors duration-300 ${
                m.highlight
                  ? "bg-[#121c32] border-b-2 border-gold"
                  : "bg-[#0c1424] hover:bg-[#0e192e]"
              }`}
            >
              <div>
                <div className="font-display text-4xl sm:text-5xl text-gold font-normal mb-3">
                  {m.pct}
                </div>
                <div className="font-sans text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  {m.phase}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Investor Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {investorPoints.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 bg-[#0c1424] border border-white/10 flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
