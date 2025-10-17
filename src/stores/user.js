import AuthAPI from "@/api/AuthAPI";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const router = useRouter();

  const getUserName = computed(() => {
    return user.value.name || "";
  });

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data;
    } catch (error) {
      console.log(error);
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    user.value = {};
    router.push({ name: "login" });
  };

  return {
    user,
    getUserName,
    logout,
  };
});
