// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const bottonNav = ref(null);

  return { bottonNav };
});
