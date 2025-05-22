<template>
  <div class="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go to Homepage</router-link>
  </div>
</template>

<script setup>
// No script needed for this simple page
</script>

<style scoped>
.not-found-container {
  text-align: center;
  padding: 50px 20px;
}
.not-found-container h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}
.not-found-container p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}
.not-found-container a {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.not-found-container a:hover {
  background-color: #0056b3;
}
</style>
