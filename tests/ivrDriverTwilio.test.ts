import { describe, it, expect } from "vitest";
import { handleNode } from "../src/ivrTwilio/ivrDriverTwilio";
import { IVRTree } from "../src/types/ivrTreeSchema";

const ivrTree: IVRTree = {
  id: "site-001",
  entrypoint: "main",
  nodes: {
    main: {
      prompt: "Welcome. this is the entry point.",
      inputType: "dtmfOrSpeech",
      options: [
        { choice: "1", label: "Sales", action: "gotoNode", target: "sales" },
        { choice: "2", label: "Support", action: "gotoNode", target: "support" },
        { choice: "3", label: "Agents", action: "gotoNode", target: "agents" }
      ],
      fallback: { action: "gotoNode", target: "main" }
    },
    sales: {
      prompt: "Connecting Sales…",
      action: "dial",
      number: "+12345678901"
    },
    support: {
      prompt: "Connecting Support…",
      action: "dial",
      number: "+10987654321"
    },
    agents: {
      prompt: "Choose the agent you want to be connected to.",
      inputType: "dtmfOrSpeech",
      options: [
        { choice: "1", label: "Sapir", action: "dial", number: "+12345678901" },
        { choice: "2", label: "Sassy", action: "dial", number: "+10987654321" }
      ],
      fallback: { action: "gotoNode", target: "agents" }
    }
  }
};

describe("handleNode", () => {
  it("should return correct XML for main node prompt", () => {
    const result = handleNode(ivrTree, "main");
    expect(result).toContain("<Say>Welcome. this is the entry point.</Say>");
    expect(result).toContain("press 1 for Sales");
    expect(result).toContain("press 2 for Support");
    expect(result).toContain("press 3 for Agents");
  });

  it("should return correct XML when digit 1 is pressed (Sales)", () => {
    const result = handleNode(ivrTree, "main", "1");
    expect(result).toContain("<Say>Connecting Sales…</Say>");
    expect(result).toContain("<Dial>+12345678901</Dial>");
  });

  it("should return correct XML when digit 3 is pressed (Agents prompt)", () => {
    const result = handleNode(ivrTree, "main", "3");
    expect(result).toContain("<Say>Choose the agent you want to be connected to.</Say>");
    expect(result).toContain("press 1 for Sapir");
    expect(result).toContain("press 2 for Sassy");
  });

  it("should fallback to main if invalid digit is pressed", () => {
    const result = handleNode(ivrTree, "main", "9");
    expect(result).toContain("<Say>Welcome. this is the entry point.</Say>");
  });

  it("should redirect to /voice if node does not exist", () => {
    const result = handleNode(ivrTree, "non-existent-node");
    expect(result).toContain("<Say>Invalid option. Returning to main menu.</Say>");
    expect(result).toContain("<Redirect>/voice</Redirect>");
  });
});
