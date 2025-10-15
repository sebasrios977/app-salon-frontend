<script setup>
import { inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const route = useRoute();
const router = useRouter();
const { token } = route.params;

const toast = inject("toast");

onMounted(async () => {
  try {
    const { data } = await AuthAPI.confirmAccount(token);
    toast.success(data.msg);
    setTimeout(() => {
      router.push({ name: "login" });
    }, 3000);
  } catch (error) {
    toast.error(error.response.data.msg);
  }
});
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Verificar Cuenta
  </h1>
</template>
