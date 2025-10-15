<script setup>
import AuthAPI from "@/api/AuthAPI";
import { reset } from "@formkit/vue";
import { inject } from "vue";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthAPI.register(formData);
    toast.success(data.msg);
    reset('registerForm');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Crea una cuenta
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Crea una cuenta en AppSalon
  </p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto',
      }"
    />
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

    <FormKit type="submit" classes="">Crear cuenta</FormKit>
  </FormKit>
</template>
