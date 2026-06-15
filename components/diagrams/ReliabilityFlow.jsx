// Reliability flow for LLM calls: retries, circuit breaker, fallback model,
// schema validation, and graceful degradation (article: AI Engineering).
export default function ReliabilityFlow() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";
  const font = "ui-sans-serif, system-ui, sans-serif";

  return (
    <svg
      viewBox="0 0 780 320"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Flowchart: a request goes to the primary model; on success it is schema-validated and returned; on repeated errors a circuit breaker routes to a fallback model; if validation fails, the system degrades gracefully before responding."
    >
      <defs>
        <marker id="rf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
      </defs>

      {/* Request */}
      <rect x="20" y="30" width="130" height="50" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="85" y="60" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Request</text>

      {/* Primary Model */}
      <rect x="210" y="30" width="170" height="50" rx="8" fill={boxFill} stroke="#ec4899" strokeOpacity="0.5" />
      <text x="295" y="52" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Primary Model Call</text>
      <text x="295" y="68" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>timeout + retry with backoff</text>

      {/* Schema Validation */}
      <rect x="480" y="30" width="170" height="50" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="565" y="52" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Schema Validation</text>
      <text x="565" y="68" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>structured output check</text>

      {/* Response */}
      <rect x="690" y="70" width="80" height="140" rx="8" fill={boxFill} stroke="#2dd4bf" strokeOpacity="0.5" />
      <text x="730" y="145" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Response</text>

      {/* Circuit Breaker */}
      <rect x="210" y="150" width="170" height="50" rx="8" fill={boxFill} stroke="#7c3aed" strokeOpacity="0.5" />
      <text x="295" y="172" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Circuit Breaker</text>
      <text x="295" y="188" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>trips after error threshold</text>

      {/* Fallback Model */}
      <rect x="430" y="150" width="170" height="50" rx="8" fill={boxFill} stroke="#7c3aed" strokeOpacity="0.5" />
      <text x="515" y="172" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Fallback Model</text>
      <text x="515" y="188" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>secondary provider / version</text>

      {/* Graceful Degradation */}
      <rect x="480" y="230" width="170" height="50" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="565" y="252" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Graceful Degradation</text>
      <text x="565" y="268" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>non-AI fallback path</text>

      {/* Arrows */}
      {/* Request -> Primary Model */}
      <line x1="150" y1="55" x2="206" y2="55" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />

      {/* Primary Model -> Schema Validation */}
      <line x1="380" y1="55" x2="476" y2="55" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />
      <text x="428" y="44" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>success</text>

      {/* Primary Model -> Circuit Breaker */}
      <line x1="295" y1="80" x2="295" y2="146" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />
      <text x="370" y="118" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>errors / timeout</text>

      {/* Circuit Breaker -> Fallback Model */}
      <line x1="380" y1="175" x2="426" y2="175" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />

      {/* Fallback Model -> Schema Validation */}
      <path d="M515,150 V108 H565 V84" fill="none" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />

      {/* Schema Validation -> Response (valid) */}
      <path d="M650,55 H670 V140 H686" fill="none" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />
      <text x="672" y="48" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>valid</text>

      {/* Schema Validation -> Graceful Degradation (invalid) */}
      <line x1="565" y1="80" x2="565" y2="226" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />
      <text x="608" y="160" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>invalid</text>

      {/* Graceful Degradation -> Response */}
      <path d="M650,255 H670 V210 H686" fill="none" stroke={dim} strokeWidth="1.5" markerEnd="url(#rf-arrow)" />
    </svg>
  );
}
