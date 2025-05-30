import { z } from "zod";


// --------------------
// Options
// --------------------
export const BaseOption = z.object({
  choice: z.string(),
  label: z.string(),
});

export const GotoNodeOption = BaseOption.extend({
  action: z.literal("gotoNode"),
  target: z.string(),
});

export const DialOption = BaseOption.extend({
  action: z.literal("dial"),
  number: z.string(),
});

// Discriminated union of options
export const OptionsSchema = z.discriminatedUnion("action", [GotoNodeOption, DialOption]);

export const FallbackSchema = z.object({
  action: z.literal("gotoNode"),
  target: z.string(),
});


// --------------------
// Node Schemas
// --------------------
export const GotoNodeSchema = z.object({
  prompt: z.string(),
  inputType: z.literal("dtmfOrSpeech"),
  options: z.array(OptionsSchema),
  fallback: FallbackSchema,
});

export const DialNodeSchema = z.object({
  prompt: z.string(),
  action: z.literal("dial"),
  number: z.string(),
});

// Discriminated union not applicable since there's no common field to discriminate on
// So we fallback to a manual union
export const NodeSchema = z.union([GotoNodeSchema, DialNodeSchema]);

export const NodesSchema = z.record(NodeSchema);


// --------------------
// Full IVR Tree Schema
// --------------------
export const ivrTreeSchema = z.object({
  id: z.string(),
  entrypoint: z.string(),
  nodes: NodesSchema,
});


// --------------------
// Inferred Types
// --------------------
export type GotoNodeOption = z.infer<typeof GotoNodeOption>;
export type DialOption = z.infer<typeof DialOption>;
export type Option = z.infer<typeof OptionsSchema>;
export type Fallback = z.infer<typeof FallbackSchema>;

export type GotoNode = z.infer<typeof GotoNodeSchema>;
export type DialNode = z.infer<typeof DialNodeSchema>;
export type Node = z.infer<typeof NodeSchema>;
export type IVRTree = z.infer<typeof ivrTreeSchema>;