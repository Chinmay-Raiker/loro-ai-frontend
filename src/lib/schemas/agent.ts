// lib/schemas/agent.ts
import { z } from "zod";

// ================== AGENT VALIDATION SCHEMAS ==================

// Enums
export const LanguageSchema = z.enum([
  "auto-detect",
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "ja",
  "ko",
  "zh",
]);

export const LLMModelSchema = z.enum([
  "gpt-4o-mini",
  "gpt-4o",
  "gpt-3.5-turbo",
  "claude-3-5-sonnet",
  "claude-3-haiku",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
]);

export const TTSModelSchema = z.enum([
  "eleven_flash_v2_5",
  "eleven_turbo_v2_5",
  "eleven_multilingual_v2",
]);

export const ASRQualitySchema = z.enum(["high"]);

// Nested config schemas
export const ASRConfigSchema = z.object({
  quality: ASRQualitySchema.optional(),
  use_enhanced: z.boolean().optional(),
});

export const LLMConfigSchema = z.object({
  model: LLMModelSchema,
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().min(1).max(4000).optional(),
  top_p: z.number().min(0).max(1).nullable().optional(),
  frequency_penalty: z.number().min(-2).max(2).nullable().optional(),
  presence_penalty: z.number().min(-2).max(2).nullable().optional(),
});

export const TTSConfigSchema = z.object({
  voice_id: z.string().min(1, "Voice ID is required"),
  model: TTSModelSchema.optional(),
  latency_optimizations: z.number().min(0).max(4).optional(),
  stability: z.number().min(0).max(1).optional(),
  similarity_boost: z.number().min(0).max(1).optional(),
  style: z.number().min(0).max(1).nullable().optional(),
  use_speaker_boost: z.boolean().optional(),
});

export const ConversationConfigSchema = z.object({
  agent_prompt: z.string().min(1, "Agent prompt is required").max(10000),
  first_message: z.string().min(1, "First message is required").max(1000),
  language: LanguageSchema.optional(),
  asr: ASRConfigSchema.optional().nullable(),
  llm: LLMConfigSchema.optional(),
  tts: TTSConfigSchema.optional(),
});

// Platform settings schemas
export const WidgetSettingsSchema = z.object({
  accent_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
    .optional(),
  text_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
    .optional(),
  background_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
    .optional(),
});

export const PrivacySettingsSchema = z.object({
  enhanced: z.boolean().optional(),
  opt_out_recording: z.boolean().optional(),
});

export const PlatformSettingsSchema = z.object({
  widget: WidgetSettingsSchema.optional().nullable(),
  privacy: PrivacySettingsSchema.optional().nullable(),
});

// Main schema
export const AgentCreateRequestSchema = z.object({
  name: z.string().min(1, "Agent name is required").max(100),
  conversation_config: ConversationConfigSchema,
  platform_settings: PlatformSettingsSchema.optional().nullable(),
});

// Export types
export type AgentCreateRequest = z.infer<typeof AgentCreateRequestSchema>;
export type ConversationConfig = z.infer<typeof ConversationConfigSchema>;
export type LLMConfig = z.infer<typeof LLMConfigSchema>;
export type TTSConfig = z.infer<typeof TTSConfigSchema>;
export type ASRConfig = z.infer<typeof ASRConfigSchema>;
export type WidgetSettings = z.infer<typeof WidgetSettingsSchema>;
export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;
export type PlatformSettings = z.infer<typeof PlatformSettingsSchema>;

// Form options for select components
export const LANGUAGE_OPTIONS = [
  { value: "auto-detect", label: "Auto Detect" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
];

export const LLM_MODEL_OPTIONS = [
  { value: "gpt-4o-mini", label: "GPT-4O Mini" },
  { value: "gpt-4o", label: "GPT-4O" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
];

export const TTS_MODEL_OPTIONS = [
  { value: "eleven_flash_v2_5", label: "ElevenLabs Flash v2.5" },
  { value: "eleven_turbo_v2_5", label: "ElevenLabs Turbo v2.5" },
  { value: "eleven_multilingual_v2", label: "ElevenLabs Multilingual v2" },
];
