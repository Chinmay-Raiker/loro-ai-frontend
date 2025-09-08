### 1. Create Agent

```http
POST /api/agents
```

**Request Body**: Complete agent configuration from frontend
**Server Action**: Validates data → calls ElevenLabs `/v1/convai/agents/create`
**Response**: `{ "success": true, "agent_id": "string", "agent": {...} }`

### 2. Get Agent Details

```http
GET /api/agents/:agent_id
```

**Server Action**: Calls ElevenLabs `/v1/convai/agents/:agent_id`
**Response**: Complete agent configuration

### 3. List User's Agents

```http
GET /api/agents
```

**Query Params**: `page`, `limit`, `search`
**Server Action**: Calls ElevenLabs `/v1/convai/agents` with pagination
**Response**: `{ "agents": [...], "pagination": {...} }`

### 4. Update Agent

```http
PATCH /api/agents/:agent_id
```

**Request Body**: Partial agent configuration updates
**Server Action**: Validates → calls ElevenLabs `/v1/convai/agents/:agent_id`

### 5. Delete Agent

```http
DELETE /api/agents/:agent_id
```

**Server Action**: Calls ElevenLabs `/v1/convai/agents/:agent_id`

### 6. Duplicate Agent

```http
POST /api/agents/:agent_id/duplicate
```

**Request Body**: `{ "name": "New Agent Name" }` (optional)
**Server Action**: Calls ElevenLabs duplicate endpoint

## Configuration Helper Routes

### 7. Get Available Voices

```http
GET /api/voices
```

**Server Action**: Calls ElevenLabs `/v1/voices`
**Response**: `{ "voices": [...] }` with voice previews

### 8. Get Voice Preview

```http
GET /api/voices/:voice_id/preview
```

**Server Action**: Generate sample audio with selected voice
**Response**: Audio file or base64 audio data

### 9. Get Available Models

```http
GET /api/models
```

**Server Action**: Return supported LLM and TTS models
**Response**: `{ "llm_models": [...], "tts_models": [...] }`

### 10. Calculate Usage Costs

```http
POST /api/agents/calculate-cost
```

**Request Body**: Agent configuration
**Server Action**: Calls ElevenLabs calculate-usage endpoint
**Response**: `{ "estimated_cost_per_minute": number }`

### 11. Validate Agent Config

```http
POST /api/agents/validate
```

**Request Body**: Agent configuration
**Server Action**: Server-side validation before ElevenLabs call
**Response**: `{ "valid": boolean, "errors": [...] }`
