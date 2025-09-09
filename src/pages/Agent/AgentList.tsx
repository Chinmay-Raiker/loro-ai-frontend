import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui";
import { type Agent } from "@/lib/types/agent";

type AgentListProps = {
  agentsData: Agent[];
};

const columns: Column<Agent>[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "created_at_unix_secs",
    label: "Created On",
    sortable: true,
    render: (row) =>
      new Date(row.created_at_unix_secs * 1000).toLocaleDateString(),
  },
  {
    key: "access_info",
    label: "Creator",
    render: (row) => row.access_info.creator_name,
  },
  {
    key: "agent_id",
    label: "Actions",
    render: (row) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log(`Editing ${row.name}`)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log(`Testing ${row.name}`)}
        >
          Test
        </Button>
      </div>
    ),
  },
];

function AgentList({ agentsData }: AgentListProps) {
  return (
    <div>
      <DataTable
        rows={agentsData}
        columns={columns}
        searchableKeys={["name"]} // Specify which keys the filter should search
        testId="agents-table"
      />
    </div>
  );
}

export default AgentList;
