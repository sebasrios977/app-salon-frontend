import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import ServicesAPI from "@/api/ServicesAPI";

export const useServicesStore = defineStore("services", () => {
  const services = ref([]);

  onMounted(async () => {
    try {
      const { data } = await ServicesAPI.all();
      services.value = data;
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  });

  return { services };
});
