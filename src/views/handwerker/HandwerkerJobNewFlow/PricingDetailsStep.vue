<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Current route path: {{ routePath }}</p>
    <!-- Add specific content for PricingDetailsStep here -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref('PricingDetailsStep');
const pageTitle = ref('New Job: Pricing Details');
const routePath = computed(() => route.path);
</script>

<style scoped>
div {
  padding: 20px;
  border: 1px dashed #ccc;
  margin: 10px;
  background-color: #fffef0;
}
h1 {
  color: #795548;
}
</style>
