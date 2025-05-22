<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>This is the placeholder for the {{ pageName }} page.</p>
    <p>Booking ID (from prop): {{ bookingId }}</p>
    <p>Current route path: {{ routePath }}</p>
    <!-- Add specific content for CustomerPaymentSuccessPage here -->
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  bookingId: String
});

const route = useRoute();
const pageName = ref('CustomerPaymentSuccessPage');
const pageTitle = ref('Payment Successful');
const routePath = computed(() => route.path);
</script>

<style scoped>
div {
  padding: 20px;
  border: 1px dashed #ccc;
  margin: 10px;
  background-color: #f0f8ff;
}
h1 {
  color: #0056b3;
}
</style>
