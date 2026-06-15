export const aiEngineeringProductionGradeSystems = {
  sections: [
    {
      h2: "The Gap Between a Demo and a Product",
    },
    {
      p: "Building an impressive AI demo has never been easier. A weekend, an API key, and a few hundred lines of code can produce a chatbot that drafts emails, summarizes documents, or answers questions about your product. Turning that demo into something a business can depend on is a different project entirely. The model call is often the smallest part of a production AI system - the rest is data pipelines, orchestration, evaluation, monitoring, cost controls, and the operational discipline to keep all of it running when the underlying models, traffic patterns, and requirements keep changing.",
    },
    {
      p: "AI engineering is the discipline that closes that gap. It borrows heavily from software engineering and platform engineering, but it has to account for a dependency that earlier generations of systems never had to deal with: a component that is probabilistic, expensive, slow relative to a database call, and capable of failing in ways that look like success. A model can return a perfectly formatted, confidently worded answer that is simply wrong. Traditional tests do not catch that. Traditional monitoring does not catch that either. Production-grade AI engineering exists to close those gaps with architecture, process, and tooling.",
    },
    {
      p: "This article lays out the architecture, reliability patterns, performance and cost techniques, evaluation practices, and operational habits that separate AI prototypes from AI products. The themes here recur across the rest of this series - the second article goes deeper on LLM-specific architecture and context design, and the third applies these ideas to deployment pipelines using Harness.",
    },
    {
      h2: "A Five-Layer Architecture for Production AI Systems",
    },
    {
      p: "A useful mental model for a production AI system is five layers, each with its own concerns, failure modes, and ownership. Most teams that struggle with reliability or cost have collapsed two or more of these layers together - for example, mixing retrieval logic directly into the API handler, or treating evaluation as a one-time manual check before launch instead of an ongoing layer of the system.",
    },
    {
      diagram: "five-layer-architecture",
      caption: "The five layers of a production AI system, and what each one owns",
    },
    {
      h3: "1. Data and Retrieval Layer",
    },
    {
      p: "This layer owns everything that gets information into the model's context: document ingestion, chunking, embedding, indexing, and retrieval at query time. In production, this is almost always split into two independent pipelines - an indexing pipeline that runs continuously or on a schedule to keep the knowledge base fresh, and a query pipeline that runs synchronously on the request path and has to be fast. Mature retrieval layers combine dense vector search with sparse keyword search such as BM25, apply metadata filters, and use a re-ranking step (often a cross-encoder model) to push the most relevant passages to the top before they ever reach the LLM. The quality of this layer caps the quality of everything downstream - no amount of prompt engineering compensates for retrieving the wrong documents.",
    },
    {
      h3: "2. Orchestration and Application Layer",
    },
    {
      p: "This is the layer most people picture when they think of 'the AI system': the code that assembles a prompt, calls the model, parses the response, calls tools or functions, and decides what happens next. In a production system this layer also owns session and conversation state (often backed by Redis or Postgres), tool-calling and function execution, multi-step or agentic workflows, and the glue between the AI components and the rest of the application - authentication, business logic, and existing APIs. Treating this layer as ~just the prompt~ is one of the most common reasons prototypes do not survive contact with real users; real conversations branch, fail, time out, and need to be resumed.",
    },
    {
      h3: "3. Model Layer",
    },
    {
      p: "The model layer abstracts away which model - or models - actually generate the output. Production systems rarely depend on a single model from a single provider for everything. Instead, this layer handles model routing (sending simple requests to smaller, cheaper models and harder requests to larger ones), fallback chains (if the primary provider is degraded, fail over to a secondary), and version pinning so that a provider's silent model update does not change your application's behavior overnight. This layer is also where request batching, streaming, and connection pooling live, since these directly affect both latency and cost.",
    },
    {
      h3: "4. Evaluation Layer",
    },
    {
      p: "The evaluation layer is what most prototypes skip entirely, and it is the single biggest differentiator of mature AI engineering teams. It includes golden datasets of representative inputs and expected outputs, automated scoring (often using a second LLM as a judge against a rubric), regression suites that run on every prompt or model change, and online evaluation that samples live traffic to catch drift the offline tests missed. Evaluation is not a launch gate you pass once - it is a continuously running part of the system, the same way unit tests run on every commit.",
    },
    {
      h3: "5. Observability and Operations Layer",
    },
    {
      p: "The final layer gives humans visibility into what the other four are doing: distributed tracing across every model call, retrieval operation, and tool invocation; token-level cost attribution by feature, user, or tenant; latency dashboards broken down by stage; and alerting tuned to catch real problems without drowning the on-call engineer in noise. This layer is what turns 'the model gave a weird answer at 2am' from an unsolvable mystery into a five-minute investigation.",
    },
    {
      h2: "Designing for a Non-Deterministic, Slow, Expensive Dependency",
    },
    {
      p: "Every external API call needs error handling, but LLM calls need a wider range of handling than most engineers are used to designing for. A request can fail outright (timeout, rate limit, 500), succeed but return something unusable (malformed JSON when you asked for structured output, an empty completion, a refusal), or succeed with a response that is syntactically perfect but semantically wrong. Production systems need explicit strategies for all three categories.",
    },
    {
      ul: [
        "**Timeouts and retries with backoff** - set aggressive timeouts (model APIs can hang far longer than a database ever would) and retry transient failures with exponential backoff and jitter, but cap retries so a downstream outage does not cascade into a thundering herd.",
        "**Fallback models and providers** - if your primary model is unavailable or degraded, fail over to a secondary model, even if it is slightly lower quality. A slightly worse answer delivered on time beats a perfect answer that never arrives.",
        "**Idempotency keys** - for any operation that has side effects (sending an email, charging a card, writing to a database) triggered by an agent or tool call, require an idempotency key so that a retried request cannot duplicate the action.",
        "**Circuit breakers** - when error rates or latencies for a model or tool cross a threshold, stop sending traffic to it for a cooldown period rather than continuing to hammer a failing dependency.",
        "**Structured output validation** - validate every model response against a schema before using it. When validation fails, retry with a corrective prompt, fall back to a simpler extraction method, or degrade gracefully rather than passing malformed data downstream.",
        "**Graceful degradation** - design every AI-powered feature with a non-AI fallback path. If the recommendation model is down, show the most popular items; if the summarizer fails, show the first few sentences of the document.",
      ],
    },
    {
      diagram: "reliability-flow",
      caption: "How a request degrades gracefully when the primary model fails or returns something unusable",
    },
    {
      p: "These patterns are not novel - they are standard distributed-systems hygiene. What is new is how often they are needed and how easy it is to forget them when the happy path works so convincingly in a demo.",
    },
    {
      h2: "Performance and Cost Engineering",
    },
    {
      p: "Inference cost and latency scale with usage in a way that database queries usually do not, which makes performance engineering a first-class concern rather than something to revisit later. The good news is that a relatively small set of techniques, applied consistently, can cut both cost and latency by half or more without touching the model itself.",
    },
    {
      p: "**Time-to-first-token (TTFT)** is the metric users actually feel - it is the delay before the response starts streaming. Production systems generally target a TTFT under roughly two seconds for interactive use cases, and treat sustained breaches of that target as a signal to scale out, route to a faster model, or shed load. **Semantic caching** stores responses keyed by the meaning of a request rather than its exact text, so that two differently worded but equivalent questions can share a cached answer; this alone has been reported to cut LLM costs by well over half in workloads with repetitive query patterns. **Prefix caching**, available on most modern inference stacks, reuses the computed state for a shared prompt prefix (such as a long system prompt or document context) across requests, which is especially valuable for RAG and agentic workloads where the same context is reused across many calls.",
    },
    {
      p: "**Model routing** sends each request to the cheapest model capable of handling it well. A simple classification, extraction, or formatting task rarely needs your most capable (and most expensive) model; reserving that model for genuinely hard reasoning tasks can dramatically change the unit economics of a feature.",
    },
    {
      table: {
        head: ["Technique", "What it optimizes", "Typical impact"],
        rows: [
          ["Semantic caching", "Cost, latency for repeated queries", "Up to ~50-70% cost reduction on repetitive workloads"],
          ["Prefix / KV caching", "Cost, TTFT for shared context", "Large latency reduction on long, reused prompts"],
          ["Model routing / tiering", "Cost across mixed workloads", "Often 30-60% blended cost reduction"],
          ["Batching", "Throughput, GPU utilization", "Higher throughput at the cost of added latency"],
          ["Context compression / pruning", "Cost, accuracy on long sessions", "50-90% token reduction in long-running agents"],
        ],
      },
    },
    {
      p: "These techniques compound. A well-tuned production system layers caching, routing, and context management together rather than relying on any single lever - which is also why this is an ongoing engineering effort rather than a one-time optimization pass.",
    },
    {
      h2: "Evaluation-First Development",
    },
    {
      p: "The single highest-leverage habit a team can adopt is to treat evaluation as part of the development loop, not as a final check. Concretely, that means maintaining a **golden dataset** - a curated set of real and representative inputs with known-good outputs or acceptance criteria - and running it automatically whenever a prompt, model, retrieval configuration, or tool definition changes. Because LLM outputs vary in wording even when they are correct, scoring usually combines several approaches: exact-match or rule-based checks for structured outputs, embedding similarity for semantic closeness, and **LLM-as-judge** scoring against an explicit rubric for open-ended quality.",
    },
    {
      ul: [
        "**Offline evaluation** runs the golden dataset against every candidate change before it reaches users, catching regressions the same way a unit test suite catches a broken function.",
        "**Online evaluation** samples a percentage of live traffic, scores it asynchronously, and tracks quality metrics over time - this is how you catch drift caused by upstream model updates, shifting user behavior, or stale retrieval indexes.",
        "**Human review loops** stay in place for the highest-stakes outputs and double as a source of new golden examples, particularly for edge cases the automated suite missed.",
      ],
    },
    {
      p: "Teams that adopt this discipline consistently report being able to ship prompt and model changes with far more confidence and far less manual QA - and, just as importantly, they catch silent quality regressions from third-party model updates before users do.",
    },
    {
      h2: "Observability: Seeing What the System Actually Did",
    },
    {
      p: "When an AI feature misbehaves, the question is rarely 'did the code throw an exception' - it is 'why did the model produce this particular output for this particular input.' Answering that requires **end-to-end tracing**: every request should produce a trace that captures the retrieved context, the exact prompt sent to the model, the raw response, any tool calls and their results, and the final output shown to the user, all linked together and searchable. OpenTelemetry has become the common vendor-neutral standard for this instrumentation, and purpose-built LLM observability platforms layer evaluation, cost tracking, and semantic search across traces on top of it.",
    },
    {
      p: "Cost observability deserves its own attention. Token usage should be attributed down to the feature, customer, or tenant level - not just tracked in aggregate - because AI costs scale with usage in a way that can turn a profitable feature into a loss-making one if a single customer or workflow starts generating disproportionate token volume. Alerting should focus on a small number of actionable signals - latency percentiles, error rates, cost-per-request, and evaluation score trends - rather than raw volume metrics that generate noise without guiding action.",
    },
    {
      h2: "Guardrails, Security, and Governance",
    },
    {
      p: "Production AI systems sit at a new kind of trust boundary: untrusted input (from users, documents, or the open web) can flow directly into a component that makes decisions and takes actions. That makes guardrails a core architectural concern, not an afterthought.",
    },
    {
      ul: [
        "**Input guardrails** screen incoming prompts for prompt-injection attempts, PII, and policy violations before they reach the model or any retrieved context.",
        "**Output guardrails** validate model responses for policy compliance, PII leakage, and structural correctness before they are shown to a user or passed to a downstream system.",
        "**Action guardrails** apply to agentic systems specifically - any tool call with real-world side effects (sending messages, making purchases, modifying records) should pass through permissioning, rate limits, and spend caps so that a misbehaving agent cannot take unbounded action.",
        "**Audit logging** should capture what the system was asked, what context it used, what it decided, and what it did, in a form that can be reviewed after the fact - both for debugging and for compliance.",
      ],
    },
    {
      p: "None of these guardrails need to be exotic. Many can be implemented as straightforward middleware around model and tool calls. What matters is that they exist as an explicit layer of the architecture rather than being scattered ad hoc through application code, because that consistency is what makes them auditable.",
    },
    {
      h2: "Shipping Changes Without Breaking Production",
    },
    {
      p: "Every lever discussed above - a new prompt, a new model version, a retrieval index rebuild, a new tool - is a change to a system whose behavior is hard to fully predict from code review alone. The safest way to ship these changes is the same way safe teams ship any change with uncertain blast radius: progressively. Roll a new prompt or model out to a small percentage of traffic behind a feature flag, compare evaluation scores and business metrics against the existing version, and expand the rollout only as confidence builds. If a regression appears, the rollback should be a configuration change, not a code revert and redeploy.",
    },
    {
      p: "This is where AI engineering and deployment engineering meet, and it is the subject of the third article in this series - a practical look at building these progressive-delivery and rollback pipelines using Harness.",
    },
    {
      callout: {
        title: "Key Takeaways",
        text: "Production AI systems are five interacting layers - data/retrieval, orchestration, model, evaluation, and observability - not just a prompt and an API call. Reliability comes from treating the model as a slow, expensive, occasionally-wrong dependency and designing retries, fallbacks, and guardrails accordingly. Cost and latency are controlled through caching, routing, and context management applied continuously. And evaluation belongs in the development loop, not at the end of it, so that every change can be measured before it reaches users.",
      },
    },
  ],
};
