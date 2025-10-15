<script setup>
const authRoutes = [
  { name: "register", text: "Crear una cuenta" },
  { name: "login", text: "Iniciar sesión" },
];
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        class="uppercase font-bold text-white"
        v-for="route in authRoutes"
        :key="route.name"
        :to="{ name: route.name }"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </div>
</template>
