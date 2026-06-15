// How Harness modules fit together for an AI deployment pipeline
// (article: Deploying AI Systems with Harness).
export default function HarnessModules() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";
  const font = "ui-sans-serif, system-ui, sans-serif";

  return (
    <svg
      viewBox="0 0 830 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram of Harness modules in an AI pipeline: CI runs build, tests and semantic evaluation; CD progressively deploys to model-serving infrastructure and connects to Database DevOps for vector store migrations; Feature Flags control prompt and config rollout; Release Orchestration with AIDA verifies the release and can automatically pause or roll back to Feature Flags."
    >
      <defs>
        <marker id="hm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
        <marker id="hm-arrow-violet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed" />
        </marker>
      </defs>

      {/* Feedback arc: Release Orchestration -> Feature Flags */}
      <path d="M728,100 C728,38 518,38 518,96" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#hm-arrow-violet)" />
      <text x="623" y="28" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" letterSpacing="1" fontFamily={font}>
        AUTOMATED PAUSE / ROLLBACK
      </text>

      {/* CI */}
      <rect x="15" y="100" width="165" height="80" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="98" y="124" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>CI</text>
      <text x="98" y="140" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>
        <tspan x="98" dy="0">Build, unit tests, and</tspan>
        <tspan x="98" dy="14">semantic eval against</tspan>
        <tspan x="98" dy="14">golden datasets</tspan>
      </text>

      {/* CD */}
      <rect x="225" y="100" width="165" height="80" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="308" y="124" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>CD</text>
      <text x="308" y="140" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>
        <tspan x="308" dy="0">Canary / blue-green</tspan>
        <tspan x="308" dy="14">rollout to model-</tspan>
        <tspan x="308" dy="14">serving infrastructure</tspan>
      </text>

      {/* Feature Flags */}
      <rect x="435" y="100" width="165" height="80" rx="8" fill={boxFill} stroke="#2dd4bf" strokeOpacity="0.5" />
      <text x="518" y="124" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Feature Flags</text>
      <text x="518" y="140" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>
        <tspan x="518" dy="0">Toggle prompts, models,</tspan>
        <tspan x="518" dy="14">and configs per % of</tspan>
        <tspan x="518" dy="14">traffic — no redeploy</tspan>
      </text>

      {/* Release Orchestration + AIDA */}
      <rect x="645" y="100" width="170" height="80" rx="8" fill={boxFill} stroke="#ec4899" strokeOpacity="0.5" />
      <text x="730" y="124" textAnchor="middle" fill={title} fontSize="12" fontWeight="700" fontFamily={font}>
        <tspan x="730" dy="0">Release Orchestration</tspan>
        <tspan x="730" dy="15">+ AIDA</tspan>
      </text>
      <text x="730" y="160" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>
        <tspan x="730" dy="0">AI-assisted verification</tspan>
        <tspan x="730" dy="14">and automated rollback</tspan>
      </text>

      {/* Database DevOps */}
      <rect x="225" y="220" width="165" height="50" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="308" y="240" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Database DevOps</text>
      <text x="308" y="257" textAnchor="middle" fill={muted} fontSize="9.5" fontFamily={font}>versioned vector-store / index migrations</text>

      {/* Arrows: CI -> CD -> Feature Flags -> Release Orchestration */}
      <line x1="180" y1="140" x2="221" y2="140" stroke={dim} strokeWidth="1.5" markerEnd="url(#hm-arrow)" />
      <line x1="390" y1="140" x2="431" y2="140" stroke={dim} strokeWidth="1.5" markerEnd="url(#hm-arrow)" />
      <line x1="600" y1="140" x2="641" y2="140" stroke={dim} strokeWidth="1.5" markerEnd="url(#hm-arrow)" />

      {/* CD <-> Database DevOps */}
      <line x1="308" y1="180" x2="308" y2="216" stroke={dim} strokeWidth="1.5" markerEnd="url(#hm-arrow)" />
    </svg>
  );
}
