import { Stepper } from "@/components/common/Stepper";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

import {
  AgentCreateRequestSchema,
  type AgentCreateRequest,
} from "@/lib/schemas/agent";
import useAgentStore from "@/store/agent_store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";

// ================== DEFAULT VALUES ==================
const DEFAULT_VALUES: Partial<AgentCreateRequest> = {
  name: "",
  conversation_config: {
    agent_prompt: "",
    first_message: "",
    language: "en",
    llm: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1000,
    },
    tts: {
      voice_id: "21m00Tcm4TlvDq8ikWAM",
      model: "eleven_flash_v2_5",
    },
  },
};

interface AgentCreateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AgentCreateRequest) => Promise<void>;
}

export default function AgentCreateForm({
  open,
  onOpenChange,
  onSubmit,
}: AgentCreateFormProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ["Basics", "Model", "Voices"] as const;

  // Voices: load from store with caching
  const { voices, voicesLoading, voicesError, loadVoices } = useAgentStore();

  console.log('🎤 Component state:', { 
    voicesCount: voices.length, 
    voicesLoading, 
    voicesError,
    open 
  });

  // Memoize the voice loading logic to prevent unnecessary calls
  const ensureVoicesLoaded = useCallback(async () => {
    console.log('🔄 ensureVoicesLoaded:', { voicesLength: voices.length, voicesLoading });
    if (voices.length === 0 && !voicesLoading) {
      console.log('📋 Calling loadVoices...');
      await loadVoices();
    }
  }, [voices.length, voicesLoading, loadVoices]);

  useEffect(() => {
    console.log('🎆 useEffect triggered:', { open });
    if (open) {
      // Only load voices if we don't have them and aren't already loading
      void ensureVoicesLoaded();
    }
  }, [open, ensureVoicesLoaded]);

  const form = useForm<AgentCreateRequest>({
    resolver: zodResolver(AgentCreateRequestSchema),
    defaultValues: DEFAULT_VALUES as AgentCreateRequest,
    mode: "onChange",
  });

  // Field paths per step (used by form.trigger for step-scoped validation)
  const STEP_FIELDS: FieldPath<AgentCreateRequest>[][] = [
    [
      "name",
      "conversation_config.agent_prompt",
      "conversation_config.first_message",
    ],
    [
      "conversation_config.llm.model",
      "conversation_config.llm.temperature",
      "conversation_config.llm.max_tokens",
    ],
    ["conversation_config.tts.voice_id", "conversation_config.tts.model"],
  ];

  const handleNext = async () => {
    const valid = await form.trigger(STEP_FIELDS[step], {
      shouldFocus: true,
    });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    // Ensure final step fields are valid, then full form (in case of cross-field rules)

    const stepValid = await form.trigger(STEP_FIELDS[step], {
      shouldFocus: true,
    });
    if (!stepValid) return;

    const fullValid = await form.trigger(undefined, { shouldFocus: true });
    if (!fullValid) return;

    setLoading(true);
    try {
      const data = form.getValues();
      await onSubmit(data);
      form.reset(DEFAULT_VALUES as AgentCreateRequest);
      setStep(0);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create agent:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    onOpenChange(false);
    // optional: keep progress if desired; currently resets
    setStep(0);
    form.reset(DEFAULT_VALUES as AgentCreateRequest);
  };

  console.log(voices);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Stepper steps={steps as unknown as string[]} current={step} />
        </div>

        <Form {...form}>
          <form className="space-y-6">
            {/* ===== STEP 0: Basics ===== */}
            {step === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sales Concierge" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="conversation_config.agent_prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Prompt *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the agent's role and behavior..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="conversation_config.first_message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Hi! How can I help you today?"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* ===== STEP 1: Model Config ===== */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Model Configuration</h3>

                <FormField
                  control={form.control}
                  name="conversation_config.llm.model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language Model *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gpt-4o-mini">
                            GPT-4O Mini
                          </SelectItem>
                          <SelectItem value="gpt-4o">GPT-4O</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5 Turbo
                          </SelectItem>
                          <SelectItem value="claude-3-5-sonnet">
                            Claude 3.5 Sonnet
                          </SelectItem>
                          <SelectItem value="claude-3-haiku">
                            Claude 3 Haiku
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="conversation_config.llm.temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={2}
                            step={0.1}
                            placeholder="0.7"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : parseFloat(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="conversation_config.llm.max_tokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Tokens</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={4000}
                            placeholder="1000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : parseInt(e.target.value, 10)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* ===== STEP 2: Voice Config ===== */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Voice Configuration</h3>

                {voicesLoading && (
                  <p className="text-sm text-muted-foreground">
                    Loading voices…
                  </p>
                )}
                {voicesError && (
                  <p className="text-sm text-red-500">{voicesError}</p>
                )}

                <FormField
                  control={form.control}
                  name="conversation_config.tts.voice_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={voices.length ? field.value : undefined} // guard when no items
                        disabled={voicesLoading || voices.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                voicesLoading
                                  ? "Loading voices…"
                                  : "Select a voice"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {voices.length > 0
                            ? voices.map((v) => (
                                <SelectItem key={v.voice_id} value={v.voice_id}>
                                  {v.name}
                                </SelectItem>
                              ))
                            : !voicesLoading && (
                                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                  No voices available
                                </div>
                              )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="conversation_config.tts.model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TTS Model</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select TTS model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="eleven_flash_v2_5">
                            ElevenLabs Flash v2.5
                          </SelectItem>
                          <SelectItem value="eleven_turbo_v2_5">
                            ElevenLabs Turbo v2.5
                          </SelectItem>
                          <SelectItem value="eleven_multilingual_v2">
                            ElevenLabs Multilingual v2
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* ===== FOOTER: Wizard Actions ===== */}
            <DialogFooter className="justify-between pt-2">
              <div />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAndReset}
                  disabled={loading}
                >
                  Cancel
                </Button>

                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}

                {step < steps.length - 1 && (
                  <Button type="button" onClick={handleNext} disabled={loading}>
                    Next
                  </Button>
                )}

                {step === steps.length - 1 && (
                  <Button
                    type="button"
                    onClick={handleFinish}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Finish"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
