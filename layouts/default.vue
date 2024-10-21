<script setup lang="ts">

import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
    <div class="mx-2xl mt-3 w-full items-center container">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>