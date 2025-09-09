import AgentCreateForm from "@/components/forms/AgentCreationForm";
import { Button } from "@/components/ui/button";
import { agentHandlers } from "@/handlers/agent_handler";
import type { AgentCreateRequest } from "@/lib/schemas/agent";
import { useEffect, useState } from "react";

export default function AgentsPage() {
  const [open, setOpen] = useState(false);
  const [agents, setAgents] = useState([]);

  const handleCreateAgent = async (data: AgentCreateRequest) => {
    try {
      console.log("Creating agent with data:", data);
      await agentHandlers.createAgent(data);
      // await fetchAgents(); // Refresh the list
    } catch (error) {
      console.error("Failed to create agent:", error);
      throw error; // Re-throw to let the form handle the error state
    }
  };

  // const fetchAgents = async () => {
  //   try {
  //     const agentsData = await agentHandlers.getAgents();
  //     setAgents(agentsData);
  //     console.log("Fetched agents:", agentsData);
  //   } catch (err) {
  //     console.error("Failed to fetch agents", err);
  //   }
  // };

  useEffect(() => {
    // fetchAgents();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Agents Panel</h1>
        <Button onClick={() => setOpen(true)} data-testid="new-agent">
          New Agent
        </Button>
      </div>

      {/* Agent list/table */}
      <div className="mt-6">
        {agents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No agents created yet</div>
          </div>
        ) : (
          <div className="space-y-4">
            {agents.map((agent: any, index) => (
              <div
                key={agent.id || index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {agent.conversation_config?.first_message}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">
                    Model: {agent.conversation_config?.llm?.model || "N/A"}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Test
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AgentCreateForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleCreateAgent}
      />
    </>
  );
}
