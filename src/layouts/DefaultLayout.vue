<template>
  <div>
    <!-- Consider adding a global header/navbar here -->
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/services">Services</router-link> |
        <router-link to="/handwerkers">Find Handwerker</router-link> |
        <router-link to="/about">About Us</router-link> |
        <router-link to="/contact">Contact</router-link> |
        <router-link to="/faq">FAQ</router-link> |
        <router-link to="/auth/login">Login</router-link> |
        <router-link to="/auth/register">Register</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <!-- Consider adding a global footer here -->
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Qraftio</p>
    </footer>
  </div>
</template>

<script setup>
// No specific script needed for this basic layout shell
</script>

<style scoped>
header nav {
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
main {
  padding: 0 20px;
}
footer {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
  font-size: 0.9em;
  color: #777;
}
</style>
