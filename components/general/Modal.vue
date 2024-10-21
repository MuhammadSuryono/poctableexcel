<script setup lang="ts">
interface Props {
  isVisible: boolean;
  title: string;
}
const emit = defineEmits<{onClose: boolean}>();
withDefaults(defineProps<Props>(), {
  isVisible: false,
  title: ""
})

const closeModal = () => {
  emit("onClose", true);
}
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        &times;
      </button>
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <p class="mb-4">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>