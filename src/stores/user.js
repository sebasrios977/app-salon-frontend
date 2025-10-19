import AppointmentAPI from "@/api/AppointmentAPI";
import AuthAPI from "@/api/AuthAPI";
import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const router = useRouter();
  const userAppointments = ref([]);
  const loading = ref(false);

  const getUserName = computed(() => {
    return user.value.name || "";
  });

  onMounted(async () => {
    try {
      loading.value = true;
      const { data } = await AuthAPI.auth();
      user.value = data;
      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  async function getUserAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  const logout = () => {
    localStorage.removeItem("token");
    user.value = {};
    router.push({ name: "login" });
  };

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    user,
    userAppointments,
    getUserName,
    noAppointments,
    logout,
    loading,
  };
});
