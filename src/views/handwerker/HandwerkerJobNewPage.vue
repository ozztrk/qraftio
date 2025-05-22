<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>This page might redirect to a job creation flow.</p>
    <p>Current route path: {{ routePath }}</p>
    <!-- Add specific content for HandwerkerJobNewPage here -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref('HandwerkerJobNewPage');
const pageTitle = ref('Create New Job');
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
