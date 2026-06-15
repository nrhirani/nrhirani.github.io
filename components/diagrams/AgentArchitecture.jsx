// Single-agent vs. multi-agent architecture (article: LLM Architecture &
// System Design).
export default function AgentArchitecture() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";
  const font = "ui-sans-serif, system-ui, sans-serif";

  return (
    <svg
      viewBox="0 0 760 320"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram comparing a single agent, which bundles a model and tools with session storage, memory, and tracing, against a multi-agent setup where an orchestrator hands off work between a research agent and a writing agent."
    >
      <defs>
        <marker id="aa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
        <marker id="aa-arrow-rev" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M10,0 L0,5 L10,10 z" fill={dim} />
        </marker>
      </defs>

      {/* Left panel: Single Agent */}
      <text x="185" y="24" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily={font}>
        SINGLE AGENT
      </text>
      <rect x="20" y="36" width="330" height="254" rx="10" fill="none" stroke="#ec4899" strokeOpacity="0.35" strokeDasharray="5 5" />

      <rect x="35" y="55" width="145" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="107" y="82" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Model + Tools</text>
      <text x="107" y="98" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>instructions + tool set</text>

      <rect x="190" y="55" width="145" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="262" y="82" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Session Store</text>
      <text x="262" y="98" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>Redis / Postgres</text>

      <rect x="35" y="135" width="145" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="107" y="162" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Memory</text>
      <text x="107" y="178" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>persists across sessions</text>

      <rect x="190" y="135" width="145" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="262" y="162" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Tracing</text>
      <text x="262" y="178" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>every step recorded</text>

      <text x="185" y="232" textAnchor="middle" fill={muted} fontSize="10.5" fontFamily={font}>
        <tspan x="185" dy="0">A single, well-curated agent is the</tspan>
        <tspan x="185" dy="16">default — easier to evaluate, trace,</tspan>
        <tspan x="185" dy="16">and keep within budget.</tspan>
      </text>

      {/* Right panel: Multi-Agent */}
      <text x="590" y="24" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily={font}>
        MULTI-AGENT
      </text>
      <rect x="400" y="36" width="340" height="254" rx="10" fill="none" stroke="#7c3aed" strokeOpacity="0.35" strokeDasharray="5 5" />

      <rect x="490" y="55" width="160" height="55" rx="8" fill={boxFill} stroke="#7c3aed" strokeOpacity="0.5" />
      <text x="570" y="78" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Orchestrator</text>
      <text x="570" y="95" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>plans + delegates</text>

      <rect x="420" y="195" width="160" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="500" y="222" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Research Agent</text>
      <text x="500" y="238" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>gathers information</text>

      <rect x="600" y="195" width="160" height="68" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="680" y="222" textAnchor="middle" fill={title} fontSize="12.5" fontWeight="700" fontFamily={font}>Writing Agent</text>
      <text x="680" y="238" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>synthesizes output</text>

      {/* Orchestrator -> agents */}
      <path d="M540,110 L500,191" fill="none" stroke={dim} strokeWidth="1.5" markerEnd="url(#aa-arrow)" />
      <path d="M600,110 L680,191" fill="none" stroke={dim} strokeWidth="1.5" markerEnd="url(#aa-arrow)" />

      {/* Handoff between agents */}
      <line x1="580" y1="229" x2="596" y2="229" stroke={dim} strokeWidth="1.5" markerEnd="url(#aa-arrow)" markerStart="url(#aa-arrow-rev)" />
      <text x="590" y="280" textAnchor="middle" fill={muted} fontSize="10.5" fontFamily={font}>
        <tspan x="590" dy="0">Handoffs transfer control —</tspan>
        <tspan x="590" dy="16">and the right slice of context —</tspan>
        <tspan x="590" dy="16">between specialist agents.</tspan>
      </text>
    </svg>
  );
}
