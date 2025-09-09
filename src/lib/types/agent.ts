export interface Agent {
  agent_id: string;
  name: string;
  tags: [];
  created_at_unix_secs: number;
  access_info: {
    is_creator: boolean;
    creator_name: string;
    creator_email: string;
    role: string;
  };
  last_call_time_unix_secs: string | null;
}
