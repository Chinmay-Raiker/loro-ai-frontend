import { genericAPI } from "@/api/api";
import { type AgentCreateRequest } from "@/lib/schemas/agent";
import { type Agent } from "@/lib/types/agent";
import { type ApiResponse } from "@/lib/types/api";
const baseUrl = "http://localhost:8000/api";

export const createAgent = async (agentData: AgentCreateRequest) => {
  console.log(">>>request Data:", agentData);
  try {
    console.log("Creating agent:");
    const response = await genericAPI.post(`${baseUrl}/agents`, agentData);
    console.log("Agent created successfully:", response.data);
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
    console.log(
      `Loading agents - Page: ${page}, Limit: ${limit}, Search: ${
        search || "none"
      }`
    );
    const agentData = { page, limit };
    const response = await genericAPI.get<ApiResponse<Agent>>(
      `${baseUrl}/agents`,
      agentData
    );
    console.log("Already created agents:", response.data);

    return response.data.data;
  } catch (error) {
    console.error("Failed to load agents:", error);
    throw error;
  }
};
