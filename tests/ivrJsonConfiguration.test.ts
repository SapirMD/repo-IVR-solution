import { describe, it, expect } from "vitest";
import { ivrTreeSchema } from "../src/types/ivrTreeSchema";
import ivrTree from "../examples/ivrTree.json";


describe("valid ivrSchema configuration", () => {
  it("parses valid config without error", () => {
    expect(() => ivrTreeSchema.parse(ivrTree)).not.toThrow();
  });

  it("rejects malformed configuration", () => {
    const broken = { ...ivrTree, nodes: "not-an-object" };
    expect(() => ivrTreeSchema.parse(broken)).toThrow();
  });
});