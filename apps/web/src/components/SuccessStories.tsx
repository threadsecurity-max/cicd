import { useState, useEffect } from "react";
import { SectionHeading, Reveal, Button } from "./ui";
import { Award, CheckCircle2, DollarSign, ExternalLink, X, ZoomIn } from "lucide-react";
import { useUi } from "./useUi";

export interface SuccessReport {
  img: string;
  program: string;
  sev: "Critical" | "High" | "Medium";
  score: string;
  weakness: string;
  amount: number;
  status: "Resolved" | "Triaged";
}

export const SUCCESS_REPORTS: SuccessReport[] = [
  {
    img: "qualcomm.png",
    program: "Qualcomm",
    sev: "Critical",
    score: "9–10",
    weakness: "Code Injection",
    amount: 4500,
    status: "Resolved",
  },
  {
    img: "private-critical.png",
    program: "Private Program",
    sev: "Critical",
    score: "9–10",
    weakness: "Code Injection",
    amount: 4500,
    status: "Resolved",
  },
  {
    img: "tiktok.png",
    program: "TikTok",
    sev: "Medium",
    score: "5.4",
    weakness: "Command Injection",
    amount: 2500,
    status: "Resolved",
  },
  {
    img: "palantir.png",
    program: "Palantir",
    sev: "Medium",
    score: "4–6.9",
    weakness: "Code Injection",
    amount: 2000,
    status: "Resolved",
  },
  {
    img: "linux-foundation.png",
    program: "Linux Foundation Decentralized Trust",
    sev: "High",
    score: "7–8.9",
    weakness: "Code Injection",
    amount: 1500,
    status: "Resolved",
  },
  {
    img: "groq.png",
    program: "Groq",
    sev: "High",
    score: "8.8",
    weakness: "Code Injection",
    amount: 1474,
    status: "Resolved",
  },
  {
    img: "adobe.jpg",
    program: "Adobe",
    sev: "Critical",
    score: "9–10",
    weakness: "Code Injection",
    amount: 1000,
    status: "Resolved",
  },
  {
    img: "epicgames.png",
    program: "Epic Games",
    sev: "Medium",
    score: "5.9",
    weakness: "Command Injection",
    amount: 1000,
    status: "Resolved",
  },
  {
    img: "private-high.jpg",
    program: "Private Program",
    sev: "High",
    score: "7–8.9",
    weakness: "Code Injection",
    amount: 1000,
    status: "Triaged",
  },
];

const formatCurrency = (val: number) => `$${val.toLocaleString("en-US")}`;

const getSevColor = (sev: string) => {
  switch (sev.toLowerCase()) {
    case "critical":
      return "text-red-400 bg-red-950/60 border-red-800/60";
    case "high":
      return "text-amber-400 bg-amber-950/60 border-amber-800/60";
    default:
      return "text-blue-400 bg-blue-950/60 border-blue-800/60";
  }
};

export function SuccessStories({ isStandalonePage = false }: { isStandalonePage?: boolean }) {
  const [selectedReport, setSelectedReport] = useState<SuccessReport | null>(null);
  const { openScan, navigate } = useUi();

  const totalBounties = SUCCESS_REPORTS.reduce((sum, r) => sum + r.amount, 0);
  const totalPrograms = new Set(SUCCESS_REPORTS.map((r) => r.program)).size;
  const maxBounty = Math.max(...SUCCESS_REPORTS.map((r) => r.amount));

  // Handle escape key to close lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedReport(null);
    };
    if (selectedReport) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedReport]);

  return (
    <section id="success" className={`relative scroll-mt-20 border-t border-white/6 py-20 sm:py-28 ${isStandalonePage ? "pt-28" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <SectionHeading
            eyebrow="Proven Research Track Record"
            title="Real Bounties. Verified Reports."
          >
            Signal was built by active security researchers who hunt on HackerOne and Bugcrowd. Below are verified, awarded reports across Fortune 100 enterprises and hyper-growth tech giants.
          </SectionHeading>
        </div>

        {/* Stats Metrics */}
        <Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                <DollarSign className="h-5 w-5" />
              </div>
              <p className="font-mono text-3xl font-bold tracking-tight text-white">
                {formatCurrency(totalBounties)}+
              </p>
              <p className="mt-1 text-xs text-zinc-400">Total in Resolved Bounties Shown</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Award className="h-5 w-5" />
              </div>
              <p className="font-mono text-3xl font-bold tracking-tight text-white">{totalPrograms}</p>
              <p className="mt-1 text-xs text-zinc-400">Target Programs (Startups to Fortune 100)</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="font-mono text-3xl font-bold tracking-tight text-white">
                {formatCurrency(maxBounty)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">Top Single Finding (Critical Severity)</p>
            </div>
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUCCESS_REPORTS.map((report, idx) => (
            <Reveal key={report.img} delay={idx * 60}>
              <div
                onClick={() => setSelectedReport(report)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-2xl hover:shadow-signal/10"
              >
                {/* Image preview with zoom overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={`/success/${report.img}`}
                    alt={`Resolved report for ${report.program} - ${report.weakness}`}
                    className="h-full w-full object-cover object-top opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                      <ZoomIn className="h-3.5 w-3.5" /> View Proof
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-signal">
                        {report.program}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-400">{report.weakness}</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${getSevColor(
                        report.sev
                      )}`}
                    >
                      {report.sev}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3">
                    <span className="font-mono text-xs text-zinc-500">
                      Score: {report.score}
                    </span>
                    <span className="font-mono text-base font-bold text-signal">
                      {report.status === "Triaged" ? "Triaged" : formatCurrency(report.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Disclaimer / Note */}
        <p className="mt-8 text-center text-xs text-zinc-500">
          * These are real, resolved reports from the security research team behind Signal, demonstrated as verification of methodology and triage accuracy. Report IDs are redacted for privacy. Program and brand names belong to their respective owners.
        </p>

        {/* CTA Banner */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-signal/10 via-black/60 to-purple-950/20 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Hunt the same high-impact vectors on your targets.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Signal automates the tedious scanning of CI/CD pipelines, workflows, and secret scopes so you can focus on writing high-bounty reports.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={openScan}>
              Start Hunting <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" onClick={() => navigate("/pricing")}>
              View Pricing & Plans
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/90 px-6 py-4">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-semibold uppercase ${getSevColor(
                    selectedReport.sev
                  )}`}
                >
                  {selectedReport.sev}
                </span>
                <span className="text-sm font-bold text-white">{selectedReport.program}</span>
                <span className="text-xs text-zinc-400">— {selectedReport.weakness}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold text-signal">
                  {selectedReport.status === "Triaged"
                    ? "Triaged"
                    : formatCurrency(selectedReport.amount)}
                </span>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Proof Image */}
            <div className="max-h-[75vh] overflow-auto p-4 flex justify-center bg-black">
              <img
                src={`/success/${selectedReport.img}`}
                alt={`Proof report for ${selectedReport.program}`}
                className="max-h-full max-w-full rounded-lg object-contain shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
