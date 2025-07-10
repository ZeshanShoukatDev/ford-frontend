import { ref, provide, inject, watch } from "vue";

const SELECTED_MODEL_KEY = "selectedModel";
const STORAGE_KEY = "ford_selected_model";
const VISIBILITY_KEY = "ford_disclaimer_visible";

export function provideSelectedModel() {
  // Initialize from localStorage if available
  const initialModel = localStorage.getItem(STORAGE_KEY) || null;
  const selectedModel = ref(initialModel);
  const isDisclaimerVisible = ref(
    localStorage.getItem(VISIBILITY_KEY) === "true"
  );

  const setSelectedModel = (model) => {
    selectedModel.value = model;
    // Reset visibility when model changes
    isDisclaimerVisible.value = true;
    // Persist to localStorage
    if (model) {
      localStorage.setItem(STORAGE_KEY, model);
      localStorage.setItem(VISIBILITY_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VISIBILITY_KEY);
    }
  };

  const hideDisclaimer = () => {
    isDisclaimerVisible.value = false;
    localStorage.setItem(VISIBILITY_KEY, "false");
  };

  const resetDisclaimer = () => {
    selectedModel.value = null;
    isDisclaimerVisible.value = false;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VISIBILITY_KEY);
  };

  provide(SELECTED_MODEL_KEY, {
    selectedModel,
    setSelectedModel,
    isDisclaimerVisible,
    hideDisclaimer,
    resetDisclaimer,
  });

  return {
    selectedModel,
    setSelectedModel,
    isDisclaimerVisible,
    hideDisclaimer,
    resetDisclaimer,
  };
}

export function useSelectedModel() {
  const context = inject(SELECTED_MODEL_KEY);
  if (!context) {
    throw new Error(
      "useSelectedModel must be used within a component that has called provideSelectedModel"
    );
  }
  return context;
}
