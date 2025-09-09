interface CreateAgentRequest {
  name: string;
  conversation_config: {
    agent_prompt: string;
    first_message: string;
    language: string;
  };
}
export type { CreateAgentRequest };
