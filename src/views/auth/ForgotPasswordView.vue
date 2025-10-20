<script setup>
import AuthAPI from '@/api/AuthAPI';
import { reset } from '@formkit/vue';
import { inject } from 'vue';

const toast = inject("toast");
const handleSubmit = async ({ email }) => {
    try {
      const { data } = await AuthAPI.forgotPassword({ email });
      toast.success(data.msg);
      reset('forgotPassword');
    } catch (error) {
      toast.error(error.response.data.msg);
    }
};
</script>
<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Olvidé mi contraseña
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Recupera el acceso a tu cuenta
  </p>

  <FormKit
    id="forgotPassword"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de registro"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'El email no es válido',
      }"
    />

    <FormKit type="submit" classes="">Enviar Instrucciones</FormKit>
  </FormKit>
</template>
