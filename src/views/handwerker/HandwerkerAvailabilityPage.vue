<template>
  <div class="availability-page">
    <h1>{{ pageTitle }}</h1>
    <p>Define your standard working hours and booking preferences.</p>

    <form @submit.prevent="saveAvailability">
      <h2>Weekly Schedule</h2>
      <div v-for="(day, index) in weeklySchedule" :key="index" class="day-schedule">
        <h3>{{ day.name }}</h3>
        <label class="working-day-label">
          <input type="checkbox" v-model="day.isWorkingDay" />
          Working Day
        </label>
        <div v-if="day.isWorkingDay" class="time-inputs">
          <div>
            <label :for="`start-time-${day.name}`">Work Start:</label>
            <input :id="`start-time-${day.name}`" type="time" v-model="day.startTime" />
          </div>
          <div>
            <label :for="`end-time-${day.name}`">Work End:</label>
            <input :id="`end-time-${day.name}`" type="time" v-model="day.endTime" />
          </div>
          <div>
            <label :for="`break-start-${day.name}`">Break Start:</label>
            <input :id="`break-start-${day.name}`" type="time" v-model="day.breakStartTime" />
          </div>
          <div>
            <label :for="`break-end-${day.name}`">Break End:</label>
            <input :id="`break-end-${day.name}`" type="time" v-model="day.breakEndTime" />
          </div>
        </div>
        <div v-else class="day-off">
          <p>Day Off</p>
        </div>
      </div>

      <h2>General Booking Settings</h2>
      <div class="booking-settings">
        <div>
          <label for="min-notice">Minimum Notice for Bookings (hours):</label>
          <input id="min-notice" type="number" v-model.number="generalSettings.minNoticeHours" min="0" />
        </div>
      </div>

      <button type="submit" class="save-button">Save Availability</button>
    </form>

    <p class="route-path">Current route path: {{ routePath }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref('HandwerkerAvailabilityPage');
const pageTitle = ref('Manage My Availability');
const routePath = computed(() => route.path);

const weeklySchedule = ref([
  { name: 'Monday', isWorkingDay: true, startTime: '09:00', endTime: '17:00', breakStartTime: '12:00', breakEndTime: '13:00' },
  { name: 'Tuesday', isWorkingDay: true, startTime: '09:00', endTime: '17:00', breakStartTime: '12:00', breakEndTime: '13:00' },
  { name: 'Wednesday', isWorkingDay: true, startTime: '09:00', endTime: '17:00', breakStartTime: '12:00', breakEndTime: '13:00' },
  { name: 'Thursday', isWorkingDay: true, startTime: '09:00', endTime: '17:00', breakStartTime: '12:00', breakEndTime: '13:00' },
  { name: 'Friday', isWorkingDay: true, startTime: '09:00', endTime: '17:00', breakStartTime: '12:00', breakEndTime: '13:00' },
  { name: 'Saturday', isWorkingDay: false, startTime: '', endTime: '', breakStartTime: '', breakEndTime: '' },
  { name: 'Sunday', isWorkingDay: false, startTime: '', endTime: '', breakStartTime: '', breakEndTime: '' },
]);

const generalSettings = ref({
  minNoticeHours: 24,
});

const saveAvailability = () => {
  // Logic to save availability data to the backend (Supabase 'availability' table)
  console.log('Saving availability:', JSON.parse(JSON.stringify(weeklySchedule.value)));
  console.log('Saving general settings:', JSON.parse(JSON.stringify(generalSettings.value)));
  // Add actual save logic here, e.g., calling a Supabase function or API endpoint
  alert('Availability settings saved (simulated)!');
};

</script>

<style scoped>
.availability-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fffbe6;
  border: 1px dashed #ccc;
}

h1 {
  color: #856404;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #856404;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.day-schedule {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
}

.day-schedule h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.working-day-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.working-day-label input[type="checkbox"] {
  margin-right: 8px;
  transform: scale(1.2);
}

.time-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.time-inputs > div {
  display: flex;
  flex-direction: column;
}

.time-inputs label {
  font-size: 0.9em;
  margin-bottom: 4px;
  color: #333;
}

.time-inputs input[type="time"],
.booking-settings input[type="number"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.day-off p {
  color: #777;
  font-style: italic;
}

.booking-settings div {
  margin-bottom: 15px;
}

.booking-settings label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.save-button {
  display: block;
  width: 100%;
  padding: 12px 20px;
  background-color: #856404;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #664d03;
}

.route-path {
  margin-top: 30px;
  font-size: 0.8em;
  color: #777;
  text-align: center;
}
</style>
