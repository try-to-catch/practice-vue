<script setup>

</script>

<template>
  <div class="relative h-screen overflow-hidden">
    <video autoplay class="w-full h-full object-cover object-center " loop muted>
      <source src="/bg.mp4" type="video/mp4">
      <!-- Add additional source tags for other video formats if needed -->
    </video>
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
