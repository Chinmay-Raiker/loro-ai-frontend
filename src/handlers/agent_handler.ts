import { genericAPI } from "@/api/api";
import { type AgentCreateRequest } from "@/lib/schemas/agent";
import { type Agent, type Voice } from "@/lib/types/agent";
import { type ApiResponse } from "@/lib/types/api";
const baseUrl = "http://localhost:8000/api";

export const createAgent = async (agentData: AgentCreateRequest) => {
  try {
    const response = await genericAPI.post(`${baseUrl}/agents`, agentData);
    return response.data;
  } catch (error) {
    console.error("Failed to create agent:", error);
  }
};

export const listAgents = async (
  page = 1,
  limit = 10,
  search?: string
): Promise<Agent[]> => {
  try {
    const agentData = { page, limit };
    const response = await genericAPI.get<ApiResponse<Agent>>(
      `${baseUrl}/agents`,
      agentData
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to load agents:", error);
    throw error;
  }
};

export const fetchVoicesAPI = async (): Promise<Voice[]> => {
  try {
    const response = await genericAPI.get(`${baseUrl}/voices`);
    const voice_data = response.data.data.voices;
    return voice_data;
  } catch (error) {
    console.error("Failed to load agents:", error);
    throw error;
  }
};
