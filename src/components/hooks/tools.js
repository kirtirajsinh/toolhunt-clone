import { create } from "zustand";

const tools = (set) => ({
  tools: [],
  cursor: "",
  addTools: (newTools) => {
    set((state) => ({
      tools: [
        ...state.tools,
        ...newTools.filter(
          (tool) =>
            !state.tools.some((existingTool) => existingTool.id === tool.id)
        ),
      ],
    }));
  },
  removeTool: (toolId) => {
    set((state) => ({
      tools: state.tools.filter((tool) => tool.id !== toolId),
    }));
  },
  setCursor: (newCursor) => {
    set(() => ({
      cursor: newCursor,
    }));
  },
});

export const useTools = create(tools);
