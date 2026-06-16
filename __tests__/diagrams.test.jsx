/**
 * Tests for inline SVG diagram components.
 * Verifies each diagram renders an accessible SVG with role="img" and an aria-label.
 * Also tests the diagram registry index and the ArticleBody diagram block.
 */

import { render, screen } from "@testing-library/react";
import { diagrams } from "@/components/diagrams";
import AgentArchitecture from "@/components/diagrams/AgentArchitecture";
import FiveLayerArchitecture from "@/components/diagrams/FiveLayerArchitecture";
import HarnessModules from "@/components/diagrams/HarnessModules";
import RagPipeline from "@/components/diagrams/RagPipeline";
import ReleasePipeline from "@/components/diagrams/ReleasePipeline";
import ReliabilityFlow from "@/components/diagrams/ReliabilityFlow";
import ArticleBody from "@/components/ArticleBody";

// Real diagrams registry — do NOT mock here so we can test it
// ArticleBody tests below use the real registry too

describe("Diagram registry", () => {
  test("exports six named diagrams", () => {
    expect(Object.keys(diagrams)).toHaveLength(6);
  });

  test("contains the expected keys", () => {
    expect(diagrams).toHaveProperty("five-layer-architecture");
    expect(diagrams).toHaveProperty("reliability-flow");
    expect(diagrams).toHaveProperty("rag-pipeline");
    expect(diagrams).toHaveProperty("agent-architecture");
    expect(diagrams).toHaveProperty("release-pipeline");
    expect(diagrams).toHaveProperty("harness-modules");
  });

  test("all values are functions (React components)", () => {
    Object.values(diagrams).forEach((Component) => {
      expect(typeof Component).toBe("function");
    });
  });
});

const diagramComponents = [
  ["AgentArchitecture", AgentArchitecture],
  ["FiveLayerArchitecture", FiveLayerArchitecture],
  ["HarnessModules", HarnessModules],
  ["RagPipeline", RagPipeline],
  ["ReleasePipeline", ReleasePipeline],
  ["ReliabilityFlow", ReliabilityFlow],
];

describe.each(diagramComponents)("%s", (name, Component) => {
  test("renders an SVG element", () => {
    const { container } = render(<Component />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test('SVG has role="img" for accessibility', () => {
    render(<Component />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("SVG has a non-empty aria-label", () => {
    render(<Component />);
    const svg = screen.getByRole("img");
    const label = svg.getAttribute("aria-label");
    expect(label).toBeTruthy();
    expect(label.length).toBeGreaterThan(10);
  });
});

describe("ArticleBody — diagram block", () => {
  test("renders a known diagram component", () => {
    const { container } = render(
      <ArticleBody sections={[{ diagram: "agent-architecture", caption: "Agent diagram" }]} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Agent diagram")).toBeInTheDocument();
  });

  test("renders the caption inside a figcaption", () => {
    const { container } = render(
      <ArticleBody sections={[{ diagram: "release-pipeline", caption: "Pipeline stages" }]} />
    );
    const caption = container.querySelector("figcaption");
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveTextContent("Pipeline stages");
  });

  test("renders nothing for an unknown diagram key", () => {
    const { container } = render(
      <ArticleBody sections={[{ diagram: "nonexistent-diagram" }]} />
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(container.querySelector("figure")).not.toBeInTheDocument();
  });

  test("renders diagram without caption when caption is omitted", () => {
    const { container } = render(
      <ArticleBody sections={[{ diagram: "rag-pipeline" }]} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).not.toBeInTheDocument();
  });
});
