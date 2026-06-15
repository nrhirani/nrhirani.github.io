// End-to-end AI release pipeline with automated rollback
// (article: Deploying AI Systems with Harness).
export default function ReleasePipeline() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";
  const font = "ui-sans-serif, system-ui, sans-serif";

  const stages = [
    { x: 15, t: "Build & Unit Test", d: "CI for app + config" },
    { x: 150, t: "Semantic Evaluation", d: "golden dataset score gate" },
    { x: 285, t: "Canary 5%", d: "rollout via feature flag" },
    { x: 420, t: "Automated Verification", d: "canary vs. baseline" },
    { x: 555, t: "Progressive Ramp", d: "25% → 50% → 100%" },
    { x: 690, t: "100% Rollout", d: "fully promoted" },
  ];

  return (
    <svg
      viewBox="0 0 820 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram of a six-stage AI release pipeline: build and unit test, semantic evaluation, canary at five percent, automated verification, progressive ramp, and full rollout. A dashed loop shows automated rollback to the previous configuration if verification detects a regression."
    >
      <defs>
        <marker id="rp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
        <marker id="rp-arrow-pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#ec4899" />
        </marker>
      </defs>

      {stages.map((s, idx) => (
        <g key={s.t}>
          <rect x={s.x} y="30" width="110" height="60" rx="8" fill={boxFill} stroke={idx === 2 || idx === 4 ? "#2dd4bf" : boxStroke} strokeOpacity={idx === 2 || idx === 4 ? 0.5 : 1} />
          <text x={s.x + 55} y="56" textAnchor="middle" fill={title} fontSize="11.5" fontWeight="700" fontFamily={font}>{s.t}</text>
          <text x={s.x + 55} y="74" textAnchor="middle" fill={muted} fontSize="9.5" fontFamily={font}>{s.d}</text>
          {idx < stages.length - 1 && (
            <line x1={s.x + 110} y1="60" x2={s.x + 136} y2="60" stroke={dim} strokeWidth="1.5" markerEnd="url(#rp-arrow)" />
          )}
        </g>
      ))}

      {/* Rollback box */}
      <rect x="285" y="190" width="250" height="60" rx="8" fill={boxFill} stroke="#ec4899" strokeOpacity="0.5" />
      <text x="410" y="216" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Rollback to Previous Config</text>
      <text x="410" y="234" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>feature flag flipped back instantly</text>

      {/* Verification -> Rollback */}
      <path d="M475,90 V186" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#rp-arrow-pink)" />
      <text x="490" y="145" fill="#ec4899" fontSize="10" fontFamily={font}>regression</text>
      <text x="490" y="160" fill="#ec4899" fontSize="10" fontFamily={font}>detected</text>

      {/* Rollback -> Canary */}
      <path d="M345,190 V94" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#rp-arrow-pink)" />
      <text x="330" y="160" textAnchor="end" fill="#ec4899" fontSize="10" fontFamily={font}>flag</text>
      <text x="330" y="145" textAnchor="end" fill="#ec4899" fontSize="10" fontFamily={font}>flipped back</text>
    </svg>
  );
}
