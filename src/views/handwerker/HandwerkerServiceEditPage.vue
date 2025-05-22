<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Handwerkers will configure details, custom form fields, and deposit rules for a specific service they offer.</p>
    <p>Service ID: {{ serviceId }}</p>
    <p>Current route path: {{ routePath }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref('HandwerkerServiceEditPage');
const pageTitle = ref('Edit My Service Offering');
const serviceId = computed(() => route.params.serviceId);
const routePath = computed(() => route.path);
</script>

<style scoped>
div {
  padding: 20px;
  border: 1px dashed #ccc;
  margin: 10px;
  background-color: #fffbe6; 
}
h1 {
  color: #856404;
}
</style>
