<script setup>
import AuthAPI from "@/api/AuthAPI";
import { reset } from "@formkit/vue";
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();
const { token } = route.params;

const validToken = ref(false);

onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyPasswordResetToken(token);
    validToken.value = true;
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data.msg);
  }
});

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthAPI.updatePassword(token, { password });
    toast.success(data.msg);
    reset('newPasswordForm');
    router.push({ name: "login" });
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}
</script>
<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Contraseña nueva
    </h1>
    <p class="text-2xl text-white text-center my-5">Pon tu contraseña nueva</p>

    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Password de registro - mínimo 8 caracteres"
        validation="required|length:8"
        :validation-messages="{
          required: 'El password es obligatorio',
          length: 'El password debe tener al menos 8 caracteres',
        }"
      />
      <FormKit
        type="password"
        label="Repetir Password"
        name="password_confirm"
        placeholder="Repite tu password"
        validation="required|confirm"
        :validation-messages="{
          required: 'El password es obligatorio',
          confirm: 'Los passwords no son iguales',
        }"
      />

      <FormKit type="submit" classes="">Guardar Contraseña</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">
    Token no valido
  </p>
</template>
