import { genericAPI } from "@/api/api";
import type { CreateAgentRequest } from "@/types/agent";
const baseUrl = "http://localhost:8000/api";

export const agentHandlers = {
  createAgent: async (agentData: CreateAgentRequest) => {
    console.log(">>>request Data:", agentData);
    try {
      console.log("Creating agent:");
      const response = await genericAPI.post(`${baseUrl}/agents`, agentData);
      console.log("Agent created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create agent:", error);
    }
  },

  getAgents: async (page = 1, limit = 10, search?: string) => {
    try {
      console.log(
        `Loading agents - Page: ${page}, Limit: ${limit}, Search: ${
          search || "none"
        }`
      );
      const agentData = { page, limit };
      const response = await genericAPI.get(`${baseUrl}/agents`, agentData);
      console.log("Already created agents:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to load agents:", error);
      throw error;
    }
  },
};
