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

export interface Voice {
  voice_id: string;
  name: string;
  samples: null | string;
  category: string;
  description: string;
  labels: {
    accent: string;
    descriptive: string;
    age: string;
    gender: string;
    language: string;
    use_case: string;
  };
  preview_url: string;
}
