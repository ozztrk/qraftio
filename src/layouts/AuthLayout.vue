<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="logo-container">
        <!-- You can place your logo here -->
        <h2>Qraftio Auth</h2>
      </div>
      <router-view />
      <div class="back-to-home">
        <router-link to="/">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No specific script needed for this basic layout shell
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;
}
.auth-container {
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo-container {
  margin-bottom: 30px;
}
.logo-container h2 {
  font-size: 1.8em;
  color: #333;
}
.back-to-home {
  margin-top: 20px;
  font-size: 0.9em;
}
.back-to-home a {
  color: #007bff;
  text-decoration: none;
}
.back-to-home a:hover {
  text-decoration: underline;
}
</style>
