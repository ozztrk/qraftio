<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Handwerkers will use this page to create a custom, one-off job offer for a specific customer inquiry.</p>
    <p>Current route path: {{ routePath }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref('HandwerkerCustomJobOfferPage');
const pageTitle = ref('Create Custom Job Offer');
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
