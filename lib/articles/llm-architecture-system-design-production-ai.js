export const llmArchitectureSystemDesignProductionAi = {
  sections: [
    {
      h2: "Why Architecture Matters More Than Model Choice",
    },
    {
      p: "Teams building their first AI feature tend to spend most of their time on a question that turns out to matter less than they expect: which model should we use? Model quality differences narrow every few months, and a model swap is often a one-line configuration change. The decisions that are expensive to undo - and that determine whether a system is fast, affordable, and accurate six months from now - are architectural: how information gets into the model's context, how much autonomy the system has to take multi-step actions, how state is managed across a session, and how the system degrades when context, retrieval, or a tool call goes wrong.",
    },
    {
      p: "This article is a practical map of those architectural decisions for LLM-based systems: the core integration patterns and their trade-offs, how to design a retrieval pipeline that holds up under real traffic, the emerging discipline of context engineering, agent architectures from single-agent to multi-agent, strategies for long-context workloads, and the routing and caching techniques that keep cost and latency under control as usage grows.",
    },
    {
      h2: "Four Core Integration Patterns",
    },
    {
      p: "Almost every production LLM system is built from some combination of four patterns. They are not mutually exclusive - most real systems combine two or three - but each comes with different cost, latency, freshness, and governance trade-offs, and choosing the wrong default for a given problem is one of the most common sources of wasted engineering effort.",
    },
    {
      table: {
        head: ["Pattern", "Best for", "Freshness", "Relative cost/latency", "Governance"],
        rows: [
          [
            "Retrieval-Augmented Generation (RAG)",
            "Grounding answers in large, changing knowledge bases",
            "High - index updates independently of the model",
            "Adds retrieval latency; token cost scales with context size",
            "Easy to audit - retrieved sources are inspectable",
          ],
          [
            "Function calling / tools",
            "Connecting the model to live systems, calculations, and actions",
            "Real-time - data comes from the tool call itself",
            "Adds round-trip latency per tool call",
            "Action-level guardrails required",
          ],
          [
            "Fine-tuning",
            "Teaching a model a style, format, or narrow skill it doesn't have by default",
            "Low - knowledge is frozen at training time",
            "Higher upfront cost; can lower per-call cost for narrow tasks",
            "Harder to audit; behavior is baked into weights",
          ],
          [
            "Agentic orchestration",
            "Multi-step tasks requiring planning, tool use, and adaptation",
            "Depends on tools/retrieval used during execution",
            "Highest - multiple model calls per task",
            "Requires the most guardrails and observability",
          ],
        ],
      },
    },
    {
      p: "A useful default ordering when scoping a new feature is to ask: can this be solved with retrieval and a single well-structured prompt? If not, does it need a tool call to live data or a system action? Only once those are exhausted does it make sense to reach for fine-tuning (for style, tone, or a narrow extraction task that a general model can't be reliably prompted into) or full agentic orchestration (for genuinely multi-step, adaptive workflows). Reaching for the most complex pattern first is one of the most common sources of unnecessary cost and fragility.",
    },
    {
      h2: "Designing the Retrieval Layer: RAG That Works at Scale",
    },
    {
      h3: "Separate Indexing and Query Pipelines",
    },
    {
      p: "A RAG system that works in a notebook usually has one script that chunks documents, embeds them, and answers questions in the same process. A production RAG system splits this into two independent pipelines. The **indexing pipeline** runs continuously or on a schedule: it ingests new and changed documents, chunks them with attention to semantic boundaries (not fixed character counts), generates embeddings, and writes them to a vector store along with metadata for filtering. The **query pipeline** runs synchronously on every user request and has to be fast: it embeds the query, retrieves candidates, re-ranks them, and assembles the final context. Keeping these separate means an indexing backlog never adds latency to a user-facing request, and a query-pipeline incident never blocks ingestion of new content.",
    },
    {
      diagram: "rag-pipeline",
      caption: "Indexing and query pipelines run independently but share the same vector store",
    },
    {
      h3: "Hybrid Retrieval and Re-ranking",
    },
    {
      p: "Dense vector search alone misses things that pure keyword search catches easily - exact product codes, acronyms, names - and vice versa. Production retrieval layers combine **dense vector search** with **sparse keyword search** (commonly BM25), merge the two result sets (Reciprocal Rank Fusion is the most common technique), and then apply **metadata filters** (by date, source, permission level, or document type) before the results ever reach the model. A final **re-ranking** step, often using a smaller cross-encoder model, reorders the merged candidates by relevance to the specific query - this step alone often produces the single biggest jump in answer quality for a RAG system, because it corrects for the fact that embedding similarity is a proxy for relevance, not relevance itself.",
    },
    {
      p: "Two metrics matter most when evaluating a retrieval layer: **recall** (did the relevant passage make it into the candidate set at all?) and **precision at k** (of the passages that made it into the model's context, how many were actually useful?). Teams that only evaluate end-to-end answer quality often can't tell whether a bad answer came from a retrieval miss or a reasoning failure - evaluating retrieval independently of generation makes debugging dramatically faster.",
    },
    {
      h2: "Context Engineering: Making the Most of a Finite Window",
    },
    {
      p: "Context windows have grown from a few thousand tokens to, in some models, several million - but research and production experience converge on the same conclusion: **context quality matters far more than context window size**. As context grows, models become measurably worse at using information buried in the middle of it, a phenomenon often called 'lost in the middle,' and cost grows linearly (or worse) with every token included, whether or not it is useful. The practical response to this is a discipline often called context engineering, which treats what goes into the model's context window as a first-class design decision rather than an afterthought.",
    },
    {
      p: "Five patterns recur across well-built context-engineering systems:",
    },
    {
      ul: [
        "**Progressive disclosure** - load only what's needed for the current step, and fetch more only if the model asks for it, instead of front-loading everything that might be relevant.",
        "**Compression** - summarize or prune accumulated conversation history and tool outputs so that a long-running session doesn't silently balloon into an enormous, expensive, and noisy prompt. The best compression preserves the exact wording of facts the system depends on, rather than paraphrasing them away.",
        "**Routing** - classify the incoming request and direct it to the right context source (a specific document set, a specific tool, a specific sub-agent) rather than dumping every possible source into one prompt.",
        "**Evolved retrieval** - fetch external knowledge on demand at the point the model needs it, rather than retrieving everything up front 'just in case.'",
        "**Tool management** - keep the set of tools offered to the model in any given step small and relevant; a model asked to choose between forty tools makes worse choices than one asked to choose between five.",
      ],
    },
    {
      p: "In long-running agent sessions, the combined effect of these techniques is dramatic - production systems have reported 50-90% reductions in token usage per session purely from context engineering, with no change to the underlying model, simply because most of what a naive implementation stuffs into the prompt was never load-bearing.",
    },
    {
      h2: "Agent Architectures: From Single Agent to Multi-Agent",
    },
    {
      p: "An 'agent' in production is best understood not as a single clever prompt but as a small system with five recurring components: the model itself with its instructions and available tools, a way to manage **sessions** (conversation history and working memory, typically persisted in Redis or Postgres so it survives across replicas and restarts), **tracing** for every step the agent takes, **memory** that persists relevant facts beyond a single session, and - in multi-agent designs - **handoffs**, which are structured tool calls that transfer control (and the right slice of context) from one specialized agent to another.",
    },
    {
      p: "Whether to use a single agent or multiple is a design decision with real cost and reliability implications, not a default to reach for because it sounds more sophisticated. A single agent with a well-curated tool set is easier to evaluate, trace, and keep within budget, and it should be the starting point for most tasks. Multi-agent designs earn their complexity when a task naturally decomposes into specialist roles with different tools, instructions, or models - for example, a research agent that gathers information and a writing agent that synthesizes it, each with a context window tuned to its job - or when running steps in parallel meaningfully reduces latency. The key engineering challenge in multi-agent systems is exactly what the single-agent case avoids: defining how agents share context so that handoffs don't silently drop or duplicate information.",
    },
    {
      diagram: "agent-architecture",
      caption: "A single agent bundles model, tools, session, memory, and tracing; multi-agent designs add an orchestrator and handoffs",
    },
    {
      h2: "Long-Context Strategies",
    },
    {
      p: "Even with very large context windows available, naively filling them is rarely the right answer. 'Needle in a haystack' evaluations - where a model is asked to find a specific fact buried in a long document - consistently show that retrieval accuracy degrades as the surrounding context grows, and degrades faster when the relevant information sits in the middle rather than at the start or end. Production systems treat a large context window as a ceiling to stay well under, not a target to fill.",
    },
    {
      p: "The practical strategies for long-context workloads layer together: **chunking** large documents and retrieving only the relevant pieces rather than passing the whole document; **selective retention**, where older turns of a conversation are summarized or dropped once they stop being relevant to the current task; **dynamic pruning**, which removes tool outputs and intermediate results once they've served their purpose; and **external memory**, where facts that need to persist across sessions are written to a database and retrieved on demand rather than carried forward in the prompt indefinitely. No single technique is sufficient on its own - the systems that handle long-running sessions well combine all four, tuned to the specific workload.",
    },
    {
      h2: "Model Routing and Multi-Model Strategies",
    },
    {
      p: "Production systems increasingly treat 'which model' as a per-request decision rather than a global configuration. **Model routing** classifies each incoming request - by complexity, required capability, latency sensitivity, or cost budget - and sends it to the model best suited to handle it. A request that needs to extract a date from a sentence does not need the same model as one that needs to plan a multi-step research task.",
    },
    {
      p: "Two routing approaches are common in practice. **Rule-based routing** uses fast, cheap heuristics - input length, the presence of certain keywords, the API endpoint being called - to make a routing decision with effectively no added latency. **Model-based routing** uses a small, fast model to classify the request itself before routing; this is more accurate, particularly for nuanced 'is this simple or complex' judgments, but adds a small amount of latency and cost to every request, so it needs to be weighed against the savings it produces downstream. Most mature systems start with rule-based routing for the obvious cases and add model-based routing only for the genuinely ambiguous slice of traffic.",
    },
    {
      p: "Routing should be paired with **fallback chains**: if the preferred model for a tier is unavailable, degraded, or rate-limited, the request should fail over to an alternative rather than failing outright. This is as much a reliability pattern as a cost one - it decouples your system's availability from any single provider's.",
    },
    {
      h2: "Caching Strategies for LLM Systems",
    },
    {
      p: "Caching is one of the few optimizations in LLM systems that improves cost, latency, and load on upstream providers simultaneously, which is why it's worth designing in from the start rather than retrofitting. **Exact-match caching** - returning a stored response for an identical request - is the simplest form, but is of limited value because user inputs are rarely identical word-for-word. **Semantic caching** solves this by keying the cache on the meaning of a request (typically via embedding similarity) rather than its exact text, so that 'what's your return policy?' and 'how do returns work?' can share a cached answer. **Prefix caching** (sometimes called KV-cache reuse) operates at the inference level: when many requests share a long common prefix - a system prompt, a retrieved document, a tool definition list - the model provider or serving stack can reuse the computed internal state for that prefix across requests, which is especially valuable for RAG and agentic workloads where the same context recurs across many calls in a session.",
    },
    {
      p: "The combination matters: semantic caching reduces the number of model calls made at all, while prefix caching reduces the cost of the calls that still need to be made. Systems that implement both report cost reductions in the range of 50-90% on workloads with high query repetition or long shared contexts - numbers that are hard to achieve through any single optimization alone.",
    },
    {
      h2: "A Decision Framework for New Features",
    },
    {
      p: "When scoping a new AI-powered feature, working through these questions in order tends to produce simpler, cheaper, and more reliable designs than starting from 'which model and which framework':",
    },
    {
      ol: [
        "**What information does the model need that it doesn't already have?** If the answer is 'facts from our data,' start with retrieval, not fine-tuning.",
        "**Does the task require taking actions or fetching live data?** If so, you need function calling / tool use, with action-level guardrails from day one.",
        "**Is this a single well-scoped step, or a multi-step task that requires planning and adaptation?** Single steps stay as a single agent with a small tool set; genuinely multi-step, adaptive tasks may justify orchestration - but start single-agent and add complexity only when you can point to the specific limitation it solves.",
        "**What's the cost and latency budget per request, and does every request need your best model?** Design the routing tier before you need it - retrofitting routing into a system built around one model is much harder than building it in from the start.",
        "**How will you know if a change to any of the above made things better or worse?** If there's no evaluation set that can answer that question, build one before building the feature - it will pay for itself on the very first prompt iteration.",
      ],
    },
    {
      callout: {
        title: "Key Takeaways",
        text: "Architecture - not model choice - determines whether an LLM system stays fast, affordable, and accurate as it scales. Favor retrieval and tool use over fine-tuning and agentic orchestration until simpler patterns are exhausted. Treat context as a curated, finite resource through progressive disclosure, compression, routing, and pruning. Start with a single agent and add multi-agent complexity only when a task genuinely decomposes into specialist roles. And design routing and caching in from the start - both compound with every other optimization in this article.",
      },
    },
  ],
};
