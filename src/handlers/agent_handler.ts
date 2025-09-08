import { genericAPI } from "@/api/api";

interface CreateAgentData {
  name: string;
  description?: string;
  // Add other relevant fields as needed
}
const baseURL = "/api/agents";

export const agentHandlers = {
  createAgent: async (agentData: CreateAgentData) => {
    try {
      console.log("Creating agent:", {
        name: agentData.name,
        description: agentData.description,
      });
      const response = await genericAPI.post(baseURL, agentData);
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
      const response = await genericAPI.get(baseURL, agentData);
      console.log("Already created agents:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to load agents:", error);
      throw error;
    }
  },
};
