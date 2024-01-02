import { create } from "zustand";

const tools = (set) => ({
  tools: [],
  cursor: "",
  trendingTools: [],
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
  setTrendingTools: (newTools) => {
    set(() => ({
      trendingTools: newTools,
    }));
  },
  setCategoryCursor: (newCursor) => {
    set(() => ({
      categoryCursor: newCursor,
    }));
  },
  addTagWiseTools: (newTools) => {
    set((state) => ({
      tagWiseTools: [...state.tagWiseTools, ...newTools],
    }));
  },
  removeTagWisetools: () => {
    set(() => ({
      tagWiseTools: [],
    }));
  },
  addCategoryWiseTools: (newTools) => {
    set((state) => ({
      categoryWiseTools: [...state.categoryWiseTools, ...newTools],
    }));
  },
  removeCategoryWiseTools: () => {
    set(() => ({
      categoryWiseTools: [],
    }));
  },
  addTools: (newTools) => {
    set((state) => ({
      tools: [...state.tools, ...newTools],
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
