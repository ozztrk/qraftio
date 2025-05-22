<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Service ID (from prop): {{ serviceId }}</p>
    <p>Current route path: {{ routePath }}</p>
    <!-- Add specific content for ServiceDetailPage here -->
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  serviceId: String
});

const route = useRoute();
const pageName = ref('ServiceDetailPage');
const pageTitle = ref('Service Details');
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
