import AgentCreateForm from "@/components/forms/AgentCreationForm";
import { Button } from "@/components/ui/button";
import { createAgent, listAgents } from "@/handlers/agent_handler";
import type { AgentCreateRequest } from "@/lib/schemas/agent";
import { type Agent } from "@/lib/types/agent";
import { useEffect, useState } from "react";
import AgentList from "./AgentList";

export default function AgentsPage() {
  const [open, setOpen] = useState(false);
  const [agentsList, setAgentsList] = useState<Agent[]>([]);

  const handleCreateAgent = async (data: AgentCreateRequest) => {
    try {
      await createAgent(data);
      await fetchAgents(); // Refresh the list
    } catch (error) {
      console.error("Failed to create agent:", error);
      throw error; // Re-throw to let the form handle the error state
    }
  };

  const fetchAgents = async () => {
    try {
      const agentsData = await listAgents();
      setAgentsList(agentsData);
    } catch (err) {
      console.error("Failed to fetch agents", err);
    }
  };

  useEffect(() => {
    fetchAgents();
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
        {agentsList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No agents created yet</div>
          </div>
        ) : (
          <AgentList agentsData={agentsList} />
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
