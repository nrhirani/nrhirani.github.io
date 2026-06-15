// Five-layer architecture for production AI systems (article: AI Engineering).
export default function FiveLayerArchitecture() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";

  return (
    <svg
      viewBox="0 0 700 320"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram of a five-layer production AI architecture: a central pipeline of data and retrieval, orchestration, and model layers, wrapped by evaluation and observability layers."
    >
      <defs>
        <marker id="fla-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
      </defs>

      {/* Side panel: Evaluation Layer */}
      <rect x="15" y="10" width="150" height="300" rx="10" fill="none" stroke="#7c3aed" strokeOpacity="0.4" strokeDasharray="5 5" />
      <text x="90" y="34" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        EVALUATION
      </text>
      <text x="90" y="50" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        LAYER
      </text>
      <text x="90" y="84" textAnchor="middle" fill={muted} fontSize="10.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <tspan x="90" dy="0">Golden datasets</tspan>
        <tspan x="90" dy="16">and LLM-as-judge</tspan>
        <tspan x="90" dy="16">scoring run on</tspan>
        <tspan x="90" dy="16">every prompt or</tspan>
        <tspan x="90" dy="16">model change —</tspan>
        <tspan x="90" dy="16">continuously, not</tspan>
        <tspan x="90" dy="16">just at launch.</tspan>
      </text>

      {/* Side panel: Observability Layer */}
      <rect x="535" y="10" width="150" height="300" rx="10" fill="none" stroke="#2dd4bf" strokeOpacity="0.4" strokeDasharray="5 5" />
      <text x="610" y="34" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        OBSERVABILITY
      </text>
      <text x="610" y="50" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        &amp; OPS LAYER
      </text>
      <text x="610" y="84" textAnchor="middle" fill={muted} fontSize="10.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <tspan x="610" dy="0">End-to-end tracing</tspan>
        <tspan x="610" dy="16">of every model</tspan>
        <tspan x="610" dy="16">call, retrieval, and</tspan>
        <tspan x="610" dy="16">tool invocation —</tspan>
        <tspan x="610" dy="16">plus cost, latency,</tspan>
        <tspan x="610" dy="16">and eval-score</tspan>
        <tspan x="610" dy="16">dashboards.</tspan>
      </text>

      {/* Center pipeline */}
      {/* Box 1 */}
      <rect x="185" y="20" width="330" height="78" rx="10" fill={boxFill} stroke={boxStroke} />
      <circle cx="215" cy="46" r="12" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
      <text x="215" y="50" textAnchor="middle" fill="#2dd4bf" fontSize="12" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">1</text>
      <text x="238" y="50" fill={title} fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">Data &amp; Retrieval Layer</text>
      <text x="215" y="74" fill={muted} fontSize="10.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <tspan x="215" dy="0">Ingestion, chunking, embeddings, hybrid</tspan>
        <tspan x="215" dy="15">search, and re-ranking</tspan>
      </text>

      {/* Arrow 1 -> 2 */}
      <line x1="350" y1="98" x2="350" y2="124" stroke={dim} strokeWidth="1.5" markerEnd="url(#fla-arrow)" />

      {/* Box 2 */}
      <rect x="185" y="130" width="330" height="78" rx="10" fill={boxFill} stroke={boxStroke} />
      <circle cx="215" cy="156" r="12" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="215" y="160" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">2</text>
      <text x="238" y="160" fill={title} fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">Orchestration &amp; Application</text>
      <text x="215" y="184" fill={muted} fontSize="10.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <tspan x="215" dy="0">Prompt assembly, session state, tool</tspan>
        <tspan x="215" dy="15">calls, and agent logic</tspan>
      </text>

      {/* Arrow 2 -> 3 */}
      <line x1="350" y1="208" x2="350" y2="234" stroke={dim} strokeWidth="1.5" markerEnd="url(#fla-arrow)" />

      {/* Box 3 */}
      <rect x="185" y="240" width="330" height="68" rx="10" fill={boxFill} stroke={boxStroke} />
      <circle cx="215" cy="266" r="12" fill="none" stroke="#ec4899" strokeWidth="1.5" />
      <text x="215" y="270" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">3</text>
      <text x="238" y="270" fill={title} fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">Model Layer</text>
      <text x="215" y="294" fill={muted} fontSize="10.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <tspan x="215" dy="0">Routing, fallback chains, version pinning,</tspan>
        <tspan x="215" dy="15">batching, and streaming</tspan>
      </text>
    </svg>
  );
}
