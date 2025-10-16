<script setup>
import AuthAPI from '@/api/AuthAPI';
import { inject } from 'vue';


const toast = inject("toast");

const handleSubmit = async (formData) => {
    try {
      const response = await AuthAPI.login(formData);
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Ingresa a tu cuenta
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Si tienes una cuenta, inicia sesión
  </p>

  <FormKit
    id="loginForm"
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
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Password"
      validation="required"
      :validation-messages="{
        required: 'El password es obligatorio',
      }"
    />
    <FormKit type="submit" classes="">Iniciar sesión</FormKit>
  </FormKit>
</template>
