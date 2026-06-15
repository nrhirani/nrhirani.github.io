// RAG architecture: separate indexing and query pipelines that share a
// vector store (article: LLM Architecture & System Design).
export default function RagPipeline() {
  const boxFill = "#0d0d11";
  const boxStroke = "rgba(255,255,255,0.14)";
  const title = "#f5f5f7";
  const muted = "#9ca3af";
  const dim = "#6b7280";
  const font = "ui-sans-serif, system-ui, sans-serif";

  return (
    <svg
      viewBox="0 0 800 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram of a RAG pipeline split into two independent paths: an indexing pipeline that chunks, embeds, and stores documents in a vector store, and a query pipeline that retrieves, re-ranks, and assembles context for the LLM from that vector store."
    >
      <defs>
        <marker id="rag-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={dim} />
        </marker>
      </defs>

      {/* Row labels */}
      <text x="20" y="16" fill="#2dd4bf" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily={font}>
        INDEXING PIPELINE — continuous
      </text>
      <text x="20" y="176" fill="#ec4899" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily={font}>
        QUERY PIPELINE — per request
      </text>

      {/* Indexing pipeline */}
      <rect x="20" y="30" width="130" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="85" y="55" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Documents</text>
      <text x="85" y="72" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>raw sources</text>

      <rect x="170" y="30" width="130" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="235" y="55" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Chunking</text>
      <text x="235" y="72" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>semantic boundaries</text>

      <rect x="320" y="30" width="130" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="385" y="55" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Embedding</text>
      <text x="385" y="72" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>vector representations</text>

      <rect x="470" y="30" width="170" height="60" rx="8" fill={boxFill} stroke="#2dd4bf" strokeOpacity="0.5" />
      <text x="555" y="55" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Vector Store</text>
      <text x="555" y="72" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>embeddings + metadata</text>

      {/* Indexing arrows */}
      <line x1="150" y1="60" x2="166" y2="60" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
      <line x1="300" y1="60" x2="316" y2="60" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
      <line x1="450" y1="60" x2="466" y2="60" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />

      {/* Connector from Vector Store down to Hybrid Retrieval */}
      <path d="M555,90 V138 H230 V186" fill="none" stroke={dim} strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#rag-arrow)" />
      <text x="392" y="132" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>reads index</text>

      {/* Query pipeline */}
      <rect x="20" y="190" width="110" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="75" y="225" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Query</text>

      <rect x="150" y="190" width="180" height="60" rx="8" fill={boxFill} stroke="#ec4899" strokeOpacity="0.5" />
      <text x="240" y="215" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Hybrid Retrieval</text>
      <text x="240" y="232" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>dense + sparse (BM25)</text>

      <rect x="350" y="190" width="140" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="420" y="215" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Re-ranking</text>
      <text x="420" y="232" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>cross-encoder model</text>

      <rect x="510" y="190" width="160" height="60" rx="8" fill={boxFill} stroke={boxStroke} />
      <text x="590" y="215" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>Context Assembly</text>
      <text x="590" y="232" textAnchor="middle" fill={muted} fontSize="10" fontFamily={font}>top-k passages</text>

      <rect x="690" y="190" width="90" height="60" rx="8" fill={boxFill} stroke="#7c3aed" strokeOpacity="0.5" />
      <text x="735" y="225" textAnchor="middle" fill={title} fontSize="13" fontWeight="700" fontFamily={font}>LLM</text>

      {/* Query arrows */}
      <line x1="130" y1="220" x2="146" y2="220" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
      <line x1="330" y1="220" x2="346" y2="220" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
      <line x1="490" y1="220" x2="506" y2="220" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
      <line x1="670" y1="220" x2="686" y2="220" stroke={dim} strokeWidth="1.5" markerEnd="url(#rag-arrow)" />
    </svg>
  );
}
