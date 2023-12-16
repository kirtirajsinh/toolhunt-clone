import { create } from "zustand";

const tools = (set) => ({
  tools: [],
  cursor: "",

  categories: [],
  categoryCursor: "",
  categoryWiseTools: [],
  tagWiseTools: [],
  tagCursor: "",
  setTagCursor: (newCursor) => {
    set(() => ({
      tagCursor: newCursor,
    }));
  },

  setCategoryCursor: (newCursor) => {
    set(() => ({
      categoryCursor: newCursor,
    }));
  },
  addTagWiseTools: (newTools) => {
    set((state) => ({
      tagWiseTools: [
        ...state.tagWiseTools,
        ...newTools.filter(
          (tool) =>
            !state.tagWiseTools.some(
              (existingTool) => existingTool.id === tool.id
            )
        ),
      ],
    }));
  },
  removeTagWisetools: () => {
    set(() => ({
      tagWiseTools: [],
    }));
  },
  addCategoryWiseTools: (newTools) => {
    set((state) => ({
      categoryWiseTools: [
        ...state.categoryWiseTools,
        ...newTools.filter(
          (tool) =>
            !state.categoryWiseTools.some(
              (existingTool) => existingTool.id === tool.id
            )
        ),
      ],
    }));
  },
  removeCategoryWiseTools: () => {
    set(() => ({
      categoryWiseTools: [],
    }));
  },
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
  addCategories: (newCategories) => {
    set((state) => ({
      categories: [
        ...state.categories,
        ...newCategories.filter(
          (category) =>
            !state.categories.some(
              (existingCategory) => existingCategory.id === category.id
            )
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
