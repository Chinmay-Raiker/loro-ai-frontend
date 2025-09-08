import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { agentHandlers } from "@/handlers/agent_handler";

export default function AgentsPage() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  const [step, setStep] = useState(0);
  const steps = ["Profile", "Training", "Validation", "Finish"];

  const [userAgents, setUserAgents] = useState<any[]>([]);

  async function handleSubmit() {
    await agentHandlers.createAgent(formData);
    // refresh list after creating
    const agents = await agentHandlers.getAgents();
    setUserAgents(agents);
    setOpen(false);
    setStep(0);
    setFormData({ name: "", type: "" });
  }

  useEffect(() => {
    async function fetchAgents() {
      try {
        const agents = await agentHandlers.getAgents();
        setUserAgents(agents);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      }
    }
    fetchAgents();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Agents Pannel</h1>
        <Button onClick={() => setOpen(true)} data-testid="new-agent">
          New Agent
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-label="Create agent" className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {step === 0 && (
              <div className="grid gap-3">
                <Input
                  placeholder="Agent Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
                <label className="text-sm">
                  Type
                  <select
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={formData.type}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  >
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>VMware Migration</option>
                    <option>Modernization</option>
                  </select>
                </label>
              </div>
            )}
            {step === 2 && (
              <div className="text-sm text-gray-600">
                Agent ready to finish.
              </div>
            )}
          </div>
          <DialogFooter className="justify-between">
            <div />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 && (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              )}
              {step === steps.length - 1 && (
                <Button onClick={handleSubmit}>Finish</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
