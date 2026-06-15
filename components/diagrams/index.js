import FiveLayerArchitecture from "./FiveLayerArchitecture";
import ReliabilityFlow from "./ReliabilityFlow";
import RagPipeline from "./RagPipeline";
import AgentArchitecture from "./AgentArchitecture";
import ReleasePipeline from "./ReleasePipeline";
import HarnessModules from "./HarnessModules";

// Registry of inline SVG diagram components, referenced by key from
// lib/articles/*.js section blocks: { diagram: "<key>", caption: "..." }.
export const diagrams = {
  "five-layer-architecture": FiveLayerArchitecture,
  "reliability-flow": ReliabilityFlow,
  "rag-pipeline": RagPipeline,
  "agent-architecture": AgentArchitecture,
  "release-pipeline": ReleasePipeline,
  "harness-modules": HarnessModules,
};
