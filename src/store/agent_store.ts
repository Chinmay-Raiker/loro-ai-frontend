import { create } from "zustand";
import { type Voice } from "@/lib/types/agent";
import { fetchVoicesAPI } from "@/handlers/agent_handler";

interface AgentState {
  // Voices cache
  voices: Voice[];
  voicesLoading: boolean;
  voicesError: string | null;

  // Actions
  setVoices: (voices: Voice[]) => void;
  addVoice: (voice: Voice) => void;
  clearVoices: () => void;
  loadVoices: () => Promise<Voice[]>; // cached fetch: only hits API if empty
}

// Create the store
const useAgentStore = create<AgentState>((set, get) => ({
  voices: [],
  voicesLoading: false,
  voicesError: null,

  setVoices: (newVoices: Voice[]) => {
    set({ voices: newVoices });
  },

  addVoice: (newVoice: Voice) => {
    set((state) => ({ voices: [...state.voices, newVoice] }));
  },

  clearVoices: () => set({ voices: [] }),

  loadVoices: async () => {
    const { voices } = get();
    console.log('🔍 loadVoices called, current voices:', voices.length);
    
    if (voices.length > 0) {
      console.log('✅ Using cached voices:', voices.length);
      return voices; // Use cache
    }

    console.log('📡 Fetching voices from API...');
    set({ voicesLoading: true, voicesError: null });
    try {
      const fetched = await fetchVoicesAPI();
      console.log('✅ API returned voices:', fetched.length, fetched);
      set({ voices: fetched, voicesLoading: false });
      return fetched;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load voices";
      console.log('❌ API error:', message, err);
      set({ voicesError: message, voicesLoading: false });
      throw err;
    }
  },
}));

export default useAgentStore;
