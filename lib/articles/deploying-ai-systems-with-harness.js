export const deployingAiSystemsWithHarness = {
  sections: [
    {
      h2: "Why AI Deployment Needs a Different Playbook",
    },
    {
      p: "Deploying a typical web service is a well-understood problem: build an artifact, run it through tests, roll it out progressively, watch a small set of metrics, and roll back if they move in the wrong direction. Deploying an AI system has all of the same steps - and several new failure modes layered on top. A new prompt can pass every existing test and still produce subtly worse answers for a slice of real users. A model provider can silently update a model version behind an API that didn't change at all. A retrieval index rebuild can quietly degrade answer quality without throwing a single error. And because inference is metered, a misconfigured agent or a runaway retry loop can turn into a cost incident faster than it turns into an availability incident.",
    },
    {
      p: "None of this means AI systems need an entirely new deployment philosophy. It means the existing one - pipelines as code, progressive delivery, automated verification, fast rollback - has to be extended to cover a wider set of artifacts (prompts, model versions, retrieval configs, tool definitions, evaluation datasets) and a wider set of signals (evaluation scores and token cost, alongside latency and error rate). This article walks through how to build that pipeline using Harness, covering the platform capabilities most relevant to AI workloads: continuous delivery with progressive rollout strategies, feature flags for prompt and config changes, AI-assisted verification and rollback, and the guardrails that keep inference cost under control.",
    },
    {
      h2: "Treat Prompts, Models, and Configs as Code",
    },
    {
      p: "The foundation of a safe AI deployment pipeline is the same foundation that makes any deployment pipeline safe: everything that affects behavior in production has to be versioned, reviewable, and deployable independently of application code. For AI systems, 'everything' is a longer list than most teams initially account for - system prompts and prompt templates, the specific model and model version pinned for each task, retrieval configuration (embedding model, chunking strategy, index version), tool and function definitions available to an agent, and the golden evaluation datasets used to test all of the above.",
    },
    {
      p: "Once these artifacts live in version control alongside application code, they can flow through the same pipeline machinery as any other change - which is what makes the rest of this article possible. A prompt change becomes a pull request, a pipeline run, a progressive rollout, and a metrics-based promotion or rollback decision, with a full audit trail of what changed, when, and based on what evidence.",
    },
    {
      h2: "Where Harness Fits: A Quick Tour of the Platform",
    },
    {
      p: "Harness is a CI/CD and software delivery platform built around the idea that releases should be pipelines, not events - defined as code, executed consistently, and governed by policy. For AI workloads specifically, a handful of Harness modules map directly onto the problems described above.",
    },
    {
      table: {
        head: ["Harness module", "Role in an AI deployment pipeline"],
        rows: [
          [
            "Continuous Integration (CI)",
            "Runs build, unit tests, and - for AI artifacts - semantic evaluation suites against golden datasets on every change to a prompt, model config, or retrieval setting.",
          ],
          [
            "Continuous Delivery (CD)",
            "Executes progressive delivery strategies (canary, blue-green, rolling) for model-serving services and the applications that call them, across Kubernetes, VMs, or serverless targets.",
          ],
          [
            "Feature Flags",
            "Rolls out new prompts, model versions, or retrieval configurations to a percentage of traffic without a full redeploy, and provides the kill switch for instant rollback.",
          ],
          [
            "Release Orchestration / AI Verification",
            "Continuously verifies a release in progress by analyzing metrics, logs, and evaluation signals, and can pause or roll back automatically if it detects regressions.",
          ],
          [
            "AIDA",
            "Harness's AI assistant, embedded across the platform - helps generate and troubleshoot pipelines, analyzes failure logs, and supports automated rollback decisions.",
          ],
          [
            "Database DevOps",
            "Applies the same versioned, reviewed change-management discipline to vector store schemas and index migrations as to application database changes.",
          ],
        ],
      },
    },
    {
      diagram: "harness-modules",
      caption: "How CI, CD, Feature Flags, Release Orchestration, and Database DevOps fit together in an AI pipeline",
    },
    {
      p: "The pattern across all of these is the same one Harness applies to traditional software delivery: combine **continuous integration** (catch problems before release) with **continuous delivery** (release in a controlled, observable, reversible way). For AI systems, CI's job expands to include semantic evaluation, and CD's job expands to include the metrics that matter for model quality, not just system health.",
    },
    {
      h2: "CI for AI: Semantic Testing Before Release",
    },
    {
      p: "Traditional unit tests check that code produces an expected output for a given input. LLM outputs vary in wording even when they're correct, so a pipeline that only does exact-match testing will either pass things it shouldn't or - more often - become so strict that engineers start ignoring it. The fix is **semantic evaluation**: scoring a candidate change against a golden dataset using a combination of structural checks (does the output match the expected schema?), similarity checks (is the meaning close to a reference answer?), and LLM-as-judge scoring against an explicit rubric.",
    },
    {
      p: "In a Harness CI stage, this looks like any other automated test step - it runs on every change to a prompt, model configuration, or retrieval setting, produces a pass/fail and a set of scores, and gates promotion to the next stage. A simplified pipeline stage might look like this:",
    },
    {
      code: {
        lang: "yaml",
        text: `pipeline:
  name: ai-assistant-release
  stages:
    - stage:
        name: Semantic Evaluation
        type: CI
        spec:
          execution:
            steps:
              - step:
                  name: Run Golden Dataset Eval
                  type: Run
                  spec:
                    command: |
                      python evals/run_golden_set.py \\
                        --config configs/prompt_v14.yaml \\
                        --dataset evals/golden_v3.jsonl \\
                        --min-score 0.92
              - step:
                  name: Publish Eval Report
                  type: Run
                  spec:
                    command: |
                      python evals/publish_report.py \\
                        --output reports/eval_v14.json`,
      },
    },
    {
      p: "If the evaluation score falls below the configured threshold, the pipeline fails the same way a failed unit test would - the change simply doesn't progress to a delivery stage. This is the single highest-leverage gate in the whole pipeline: it catches the majority of quality regressions before they reach any real traffic, using the same evaluation logic discussed in the first article of this series.",
    },
    {
      h2: "Progressive Delivery for Models and Prompts",
    },
    {
      h3: "Canary Releases for Model and Prompt Versions",
    },
    {
      p: "Once a change passes semantic evaluation, the next question is how it behaves against real traffic - and the answer should never be 'all at once.' Harness CD's built-in support for **canary deployments** applies directly to AI workloads: route a small percentage of traffic - 5%, say - to the new prompt version, model version, or retrieval configuration, while the rest continues on the current version. Compare evaluation scores, latency, cost-per-request, and business metrics (resolution rate, conversion, escalation rate) between the two groups, and only proceed to the next traffic increment if the comparison holds up.",
    },
    {
      p: "This is particularly important for changes that semantic evaluation can't fully capture - a new model version might score identically on a golden dataset but behave differently on the long tail of real user phrasing, tone, or edge cases that a fixed evaluation set doesn't include. Canary releases are the safety net for exactly that gap.",
    },
    {
      h3: "Feature Flags for Prompt and Configuration Rollout",
    },
    {
      p: "Not every AI change requires a full redeploy. Prompt text, retrieval parameters (top-k, re-ranking thresholds), routing rules, and guardrail settings are naturally suited to **feature flags** - they can be toggled or adjusted per percentage of traffic, per customer segment, or per environment without rebuilding or redeploying the service that calls the model. Harness Feature Flags lets a team ship a new system prompt to 10% of users, watch evaluation and business metrics in near-real-time, and either ramp up or flip back to the previous prompt instantly - the rollback is a configuration change, not a deploy.",
    },
    {
      p: "This separation matters operationally: it means the riskiest, most frequently iterated part of an AI system - prompts and retrieval tuning - can move at a much faster cadence than the application code around it, without each iteration carrying the risk profile of a full deployment.",
    },
    {
      h2: "AI-Powered Verification and Automated Rollback",
    },
    {
      p: "A canary that's quietly degrading isn't useful if a human has to notice it. Harness's release orchestration capabilities apply automated, AI-assisted verification to a release in progress - analyzing metrics, logs, and (for AI workloads) evaluation and drift signals during the rollout window, and comparing the new version's behavior against a baseline. If the analysis detects an anomaly - an error rate spike, a latency regression, a drop in evaluation scores, or cost per request climbing outside its expected range - the pipeline can automatically pause the rollout or trigger a rollback, rather than waiting for an on-call engineer to spot a dashboard.",
    },
    {
      p: "AIDA, Harness's embedded AI assistant, plays two roles here. During pipeline authoring, it can generate and refine pipeline definitions from a description of the desired rollout strategy, which lowers the barrier to setting these patterns up correctly the first time. During an incident, it can analyze failure logs and verification results to help an engineer get to root cause faster - turning 'the canary failed verification' into a specific pointer at what changed and what broke.",
    },
    {
      p: "The combination of canary releases, feature-flagged config changes, and automated verification means the default failure mode for an AI deployment shifts from 'a human notices users are complaining' to 'the pipeline noticed the regression during a 5% rollout and rolled back automatically' - a difference that, in practice, is the difference between an incident and a non-event.",
    },
    {
      h2: "Orchestrating Model-Serving Infrastructure",
    },
    {
      p: "Alongside the application and orchestration layer, most production AI systems run model-serving infrastructure of their own - whether that's a self-hosted open-weight model behind an inference server, an embedding service for the retrieval pipeline, or a re-ranking model. These services are deployed the same way any containerized service is, with two AI-specific wrinkles: they're often GPU-bound, and their 'health' includes model-specific signals (inference latency per token, queue depth, GPU memory utilization) alongside standard ones.",
    },
    {
      p: "Harness CD's deployment strategies - rolling updates, blue-green, and canary - work across Kubernetes, VMs, and serverless targets, and apply directly to model-serving deployments. A blue-green strategy is particularly well suited to swapping model versions on GPU infrastructure: the new model version is deployed alongside the existing one, validated against a slice of traffic or a synthetic test suite, and traffic is cut over only once it's confirmed healthy - with the previous version kept warm for an immediate rollback if needed, avoiding the cold-start penalty of reloading a large model onto a GPU under pressure.",
    },
    {
      h2: "Guardrails in the Pipeline: Cost and Token Budgets",
    },
    {
      p: "Inference cost is a production concern that belongs in the deployment pipeline, not just in a monthly billing review. A retrieval configuration change that doubles the average context size, or an agent change that adds an extra reasoning loop, can quietly double inference cost without any code-level red flag. Treating **cost-per-request** and **tokens-per-request** as first-class metrics in canary comparisons and verification checks catches these regressions at the same stage - and with the same automated rigor - as latency or error-rate regressions.",
    },
    {
      p: "For agentic systems specifically, guardrails need to extend into runtime, not just deployment: per-session token budgets, rate limits on tool calls, and spend caps that halt an agent before a bug or an adversarial input turns into a five-figure inference bill. These limits should themselves be configuration - managed through the same feature-flag and pipeline machinery as everything else - so that tightening a budget in response to an incident is a fast, auditable change rather than a code deploy.",
    },
    {
      h2: "A Sample Release Pipeline, End to End",
    },
    {
      p: "Putting the pieces together, a release pipeline for a change to an AI system's prompt and retrieval configuration might run through the following stages:",
    },
    {
      ol: [
        "**Build and unit test** - standard CI for any application code changes alongside the prompt/config change.",
        "**Semantic evaluation** - run the golden dataset through the new configuration; fail the pipeline if scores drop below threshold.",
        "**Canary deployment (5%)** - roll the new configuration out to a small percentage of production traffic via feature flag.",
        "**Automated verification** - compare evaluation scores, latency, error rate, and cost-per-request between canary and baseline over a defined window.",
        "**Progressive ramp (25% → 50% → 100%)** - on a clean verification result, increase traffic in increments, re-verifying at each step.",
        "**Automatic rollback** - at any stage, if verification detects a regression, flip the feature flag back to the previous configuration and notify the owning team with the verification report attached.",
      ],
    },
    {
      diagram: "release-pipeline",
      caption: "A six-stage release pipeline, with automated rollback to the previous configuration on regression",
    },
    {
      p: "Every stage here is something Harness already does for traditional software releases. What makes it an AI deployment pipeline is what flows through it - prompts, model versions, and retrieval configs as versioned artifacts - and what it watches - evaluation scores and cost alongside the usual operational metrics.",
    },
    {
      h2: "Best Practices Checklist",
    },
    {
      ul: [
        "Version prompts, model configs, retrieval settings, and golden datasets in source control, and route every change through the same pipeline as code.",
        "Gate every change on semantic evaluation against a representative golden dataset before it reaches any real traffic.",
        "Use canary or percentage-based rollout for every model, prompt, or retrieval change - no AI behavior change should go to 100% of traffic in one step.",
        "Put prompt text and tunable parameters behind feature flags so rollback is a configuration change, not a redeploy.",
        "Include evaluation scores, cost-per-request, and token usage as first-class metrics in automated verification, alongside latency and error rate.",
        "Keep the previous model version warm during blue-green cutovers for GPU-backed services to avoid slow rollbacks.",
        "Set per-session and per-tenant cost and rate guardrails as configuration, so they can be tightened quickly during an incident.",
      ],
    },
    {
      callout: {
        title: "Key Takeaways",
        text: "Deploying AI systems extends - rather than replaces - established CD practices. Treat prompts, model versions, and retrieval configs as versioned artifacts that flow through CI and CD like any other change. Gate releases on semantic evaluation, roll changes out progressively with canaries and feature flags, and let automated, AI-assisted verification watch evaluation scores and cost alongside latency and error rate so that regressions are caught - and rolled back - before users notice.",
      },
    },
  ],
};
