import { z } from "zod";

// Option object
export const OptionSchema = z.object({
  choice: z.string(),
  label: z.string(),
  action: z.enum(["gotoNode", "callCenter"]),
  target: z.string().optional(), // Only required for gotoNode
});

export type Option = z.infer<typeof OptionSchema>;

// Fallback object
export const FallbackSchema = z.object({
  action: z.enum(["gotoNode", "callCenter"]),
  target: z.string(),
});

export type Fallback = z.infer<typeof FallbackSchema>;

// Node object
export const NodeSchema = z.object({
  prompt: z.string(),
  inputType: z.enum(["dtmfOrSpeech"]).optional(),
  options: OptionSchema.array().optional(),
  fallback: FallbackSchema.optional(),
  action: z.enum(["callCenter"]).optional(),
  target: z.string().optional(),
});

export type Node = z.infer<typeof NodeSchema>;

// Nodes collection
export const NodesSchema = z.record(NodeSchema);
export type Nodes = z.infer<typeof NodesSchema>;

// Main IVR schema
export const ConfigSchema = z.object({
  id: z.string(),
  entrypoint: z.string(),
  nodes: NodesSchema,
});

export type Config = z.infer<typeof ConfigSchema>;
