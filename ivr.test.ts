import { describe, it, expect } from "vitest";
import { ConfigSchema } from "./src/types/ivrTree";
import validConfig from "./examples/ivr-config.json";

describe("IVR Config Schema", () => {
  it("parses valid config without error", () => {
    expect(() => ConfigSchema.parse(validConfig)).not.toThrow();
  });

  it("rejects malformed config", () => {
    const broken = { ...validConfig, nodes: "not-an-object" };
    expect(() => ConfigSchema.parse(broken)).toThrow();
  });
});