<template>
  <div class="app-layout">
    <aside class="sidebar">
      <p>App Sidebar</p>
      <!-- Navigation links specific to authenticated users -->
      <nav>
        <h3>Customer Area</h3>
        <router-link to="/c/dashboard">Dashboard</router-link>
        <router-link to="/c/booking/new/select-service">New Booking</router-link>
        <router-link to="/c/bookings">My Bookings</router-link>
        <router-link to="/c/profile">My Profile</router-link>
        <router-link to="/c/messages">Messages</router-link>
        <router-link to="/c/notifications">Notifications</router-link>

        <hr class="nav-divider">

        <h3>Handwerker Area</h3>
        <router-link to="/h/dashboard">Dashboard</router-link>
        <router-link to="/h/jobs">My Jobs</router-link>
        <router-link to="/h/jobs/new/info">Create Job Offer</router-link>
        <router-link to="/h/services">My Services</router-link>
        <router-link to="/h/availability">Availability</router-link>
        <router-link to="/h/calendar">Calendar</router-link>
        <router-link to="/h/earnings">Earnings</router-link>
        <router-link to="/h/profile">My Profile</router-link>
        <router-link to="/h/messages">Messages</router-link>
        <router-link to="/h/notifications">Notifications</router-link>

        <hr class="nav-divider">

        <a href="#" @click.prevent="logout">Logout (Placeholder)</a>
      </nav>
    </aside>
    <main class="content">
      <header class="app-header">
        <p>App Header (e.g., User Profile, Notifications)</p>
      </header>
      <div class="page-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
// Logic for user role, notifications, etc., would go here
// Placeholder for logout function
const logout = () => {
  console.log('Logout action triggered');
  // Actual logout logic (e.g., clear auth state, redirect to login) will go here
  // For now, just a console log and maybe a redirect to home
  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  // router.push('/');
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  overflow-y: auto; /* Ensure sidebar is scrollable if content exceeds height */
}
.sidebar nav a {
  display: block;
  color: white;
  margin-bottom: 10px;
  padding: 8px 10px;
  text-decoration: none;
  border-radius: 4px;
}
.sidebar nav a:hover, .sidebar nav a.router-link-active {
  background-color: #555;
}
.sidebar h3 {
  color: #aaa;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 0.9em;
  text-transform: uppercase;
}
.nav-divider {
  border: 0;
  border-top: 1px solid #555;
  margin: 15px 0;
}
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.app-header {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
.page-content {
  padding: 20px;
  flex-grow: 1;
}
</style>
