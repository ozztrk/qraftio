<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Token (from prop): {{ token }}</p>
    <p>Current route path: {{ routePath }}</p>
    <!-- Add specific content for ResetPasswordPage here -->
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  token: String
});

const route = useRoute();
const pageName = ref('ResetPasswordPage');
const pageTitle = ref('Reset Password');
const routePath = computed(() => route.path);
</script>

<style scoped>
div {
  padding: 20px;
  border: 1px dashed #ccc;
  margin: 10px;
  background-color: #f9f9f9;
}
h1 {
  color: #333;
}
</style>
