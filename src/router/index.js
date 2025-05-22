import { createRouter, createWebHistory } from 'vue-router';

// --- Layout Imports ---
const DefaultLayout = () => import('../layouts/DefaultLayout.vue');
const AppLayout = () => import('../layouts/AppLayout.vue');
const AuthLayout = () => import('../layouts/AuthLayout.vue');

// --- Public View Imports (from src/views/public/) ---
const HomePage = () => import('../views/public/HomePage.vue');
const AboutPage = () => import('../views/public/AboutPage.vue');
const ContactPage = () => import('../views/public/ContactPage.vue');
const FaqPage = () => import('../views/public/FaqPage.vue');
const TermsPage = () => import('../views/public/TermsPage.vue');
const PrivacyPage = () => import('../views/public/PrivacyPage.vue');
const ServicesPage = () => import('../views/public/ServicesPage.vue');
const ServiceDetailPage = () => import('../views/public/ServiceDetailPage.vue');
const HandwerkersPage = () => import('../views/public/HandwerkersPage.vue');
const HandwerkerPublicProfilePage = () => import('../views/public/HandwerkerPublicProfilePage.vue');
const LoginPage = () => import('../views/public/LoginPage.vue');
const RegisterPage = () => import('../views/public/RegisterPage.vue');
const ForgotPasswordPage = () => import('../views/public/ForgotPasswordPage.vue');
const ResetPasswordPage = () => import('../views/public/ResetPasswordPage.vue');

// --- Customer View Imports (from src/views/customer/) ---
const CustomerDashboardPage = () => import('../views/customer/CustomerDashboardPage.vue');
const CustomerBookingsPage = () => import('../views/customer/CustomerBookingsPage.vue');
// Booking Flow
const SelectServiceStep = () => import('../views/customer/CustomerBookingNewFlow/SelectServiceStep.vue');
const JobDetailsStep = () => import('../views/customer/CustomerBookingNewFlow/JobDetailsStep.vue');
const FindHandwerkerStep = () => import('../views/customer/CustomerBookingNewFlow/FindHandwerkerStep.vue');
const ConfirmBookingStep = () => import('../views/customer/CustomerBookingNewFlow/ConfirmBookingStep.vue');
const CustomerBookingDetailPage = () => import('../views/customer/CustomerBookingDetailPage.vue');
const CustomerPaymentPage = () => import('../views/customer/CustomerPaymentPage.vue');
const CustomerPaymentSuccessPage = () => import('../views/customer/CustomerPaymentSuccessPage.vue');
const CustomerPaymentFailurePage = () => import('../views/customer/CustomerPaymentFailurePage.vue');
const CustomerBookingCancelPage = () => import('../views/customer/CustomerBookingCancelPage.vue');
const CustomerReviewPage = () => import('../views/customer/CustomerReviewPage.vue');
const CustomerProfilePage = () => import('../views/customer/CustomerProfilePage.vue');
const CustomerProfileSettingsPage = () => import('../views/customer/CustomerProfileSettingsPage.vue');
const CustomerPaymentMethodsPage = () => import('../views/customer/CustomerPaymentMethodsPage.vue');
const CustomerNotificationsPage = () => import('../views/customer/CustomerNotificationsPage.vue');
const CustomerMessagesPage = () => import('../views/customer/CustomerMessagesPage.vue');
// const CustomerMessageDetailPage = () => import('../views/customer/CustomerMessageDetailPage.vue'); // If needed

// --- Handwerker View Imports (from src/views/handwerker/) ---
const HandwerkerDashboardPage = () => import('../views/handwerker/HandwerkerDashboardPage.vue');
const HandwerkerJobsPage = () => import('../views/handwerker/HandwerkerJobsPage.vue');
const HandwerkerJobDetailPage = () => import('../views/handwerker/HandwerkerJobDetailPage.vue');
const HandwerkerCalendarPage = () => import('../views/handwerker/HandwerkerCalendarPage.vue');
const HandwerkerServicesPage = () => import('../views/handwerker/HandwerkerServicesPage.vue');
const HandwerkerProfilePage = () => import('../views/handwerker/HandwerkerProfilePage.vue');
const HandwerkerProfileSettingsPage = () => import('../views/handwerker/HandwerkerProfileSettingsPage.vue');
const HandwerkerReviewsPage = () => import('../views/handwerker/HandwerkerReviewsPage.vue');
const HandwerkerEarningsPage = () => import('../views/handwerker/HandwerkerEarningsPage.vue');
const HandwerkerNotificationsPage = () => import('../views/handwerker/HandwerkerNotificationsPage.vue');
const HandwerkerMessagesPage = () => import('../views/handwerker/HandwerkerMessagesPage.vue');
const HandwerkerAvailabilityPage = () => import('../views/handwerker/HandwerkerAvailabilityPage.vue');
const HandwerkerServiceEditPage = () => import('../views/handwerker/HandwerkerServiceEditPage.vue');
const HandwerkerCustomJobOfferPage = () => import('../views/handwerker/HandwerkerCustomJobOfferPage.vue');
// const HandwerkerMessageDetailPage = () => import('../views/handwerker/HandwerkerMessageDetailPage.vue'); // If needed

// --- Other ---
const NotFoundPage = () => import('../views/NotFoundPage.vue'); // This would be in src/views/

const routes = [
  // --- Public Routes ---
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'HomePage', component: HomePage },
      { path: 'about', name: 'AboutPage', component: AboutPage },
      { path: 'contact', name: 'ContactPage', component: ContactPage },
      { path: 'faq', name: 'FaqPage', component: FaqPage },
      { path: 'terms-of-service', name: 'TermsPage', component: TermsPage },
      { path: 'privacy-policy', name: 'PrivacyPage', component: PrivacyPage },
      { path: 'services', name: 'ServicesPage', component: ServicesPage },
      { path: 'services/:serviceId', name: 'ServiceDetailPage', component: ServiceDetailPage, props: true },
      { path: 'handwerkers', name: 'HandwerkersPage', component: HandwerkersPage },
      { path: 'handwerkers/:handwerkerId', name: 'HandwerkerPublicProfilePage', component: HandwerkerPublicProfilePage, props: true },
    ]
  },
  // --- Auth Routes ---
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'LoginPage', component: LoginPage },
      { path: 'register', name: 'RegisterPage', component: RegisterPage },
      // { path: 'register/customer', name: 'RegisterCustomerPage', component: RegisterCustomerPage }, // Example
      // { path: 'register/handwerker', name: 'RegisterHandwerkerPage', component: RegisterHandwerkerPage }, // Example
      { path: 'forgot-password', name: 'ForgotPasswordPage', component: ForgotPasswordPage },
      { path: 'reset-password', name: 'ResetPasswordPage', component: ResetPasswordPage, props: route => ({ token: route.query.token }) },
    ]
  },
  // --- Customer Routes (AppLayout) ---
  {
    path: '/c', // Prefix for customer routes
    component: AppLayout,
    meta: { requiresAuth: true, role: 'customer' }, // Example meta fields for route guards
    children: [
      { path: 'dashboard', name: 'CustomerDashboardPage', component: CustomerDashboardPage },
      { path: 'bookings', name: 'CustomerBookingsPage', component: CustomerBookingsPage },
      {
        path: 'bookings/new',
        // component: RouterView, // Use a nested RouterView or a layout component for multi-step
        children: [
          { path: 'select-service', name: 'SelectServiceStep', component: SelectServiceStep },
          { path: 'details', name: 'JobDetailsStep', component: JobDetailsStep },
          { path: 'find-handwerker', name: 'FindHandwerkerStep', component: FindHandwerkerStep },
          { path: 'confirm/:handwerkerId', name: 'ConfirmBookingStep', component: ConfirmBookingStep, props: true },
        ]
      },
      { path: 'bookings/:bookingId', name: 'CustomerBookingDetailPage', component: CustomerBookingDetailPage, props: true },
      { path: 'bookings/:bookingId/payment', name: 'CustomerPaymentPage', component: CustomerPaymentPage, props: true },
      { path: 'bookings/:bookingId/payment/success', name: 'CustomerPaymentSuccessPage', component: CustomerPaymentSuccessPage, props: true },
      { path: 'bookings/:bookingId/payment/failure', name: 'CustomerPaymentFailurePage', component: CustomerPaymentFailurePage, props: true },
      { path: 'bookings/:bookingId/cancel', name: 'CustomerBookingCancelPage', component: CustomerBookingCancelPage, props: true },
      { path: 'bookings/:bookingId/review', name: 'CustomerReviewPage', component: CustomerReviewPage, props: true },
      { path: 'profile', name: 'CustomerProfilePage', component: CustomerProfilePage },
      { path: 'profile/settings', name: 'CustomerProfileSettingsPage', component: CustomerProfileSettingsPage },
      { path: 'payment-methods', name: 'CustomerPaymentMethodsPage', component: CustomerPaymentMethodsPage },
      { path: 'notifications', name: 'CustomerNotificationsPage', component: CustomerNotificationsPage },
      { path: 'messages', name: 'CustomerMessagesPage', component: CustomerMessagesPage },
      // { path: 'messages/:chatId', name: 'CustomerMessageDetailPage', component: CustomerMessageDetailPage, props: true },
    ]
  },
  // --- Handwerker Routes (AppLayout) ---
  {
    path: '/h', // Prefix for handwerker routes
    component: AppLayout,
    meta: { requiresAuth: true, role: 'handwerker' }, // Example meta fields for route guards
    children: [
      { path: 'dashboard', name: 'HandwerkerDashboardPage', component: HandwerkerDashboardPage },
      { path: 'jobs', name: 'HandwerkerJobsPage', component: HandwerkerJobsPage },
      { path: 'jobs/new/info', name: 'HandwerkerCustomJobOfferPage', component: HandwerkerCustomJobOfferPage },
      { path: 'jobs/:jobId', name: 'HandwerkerJobDetailPage', component: HandwerkerJobDetailPage, props: true },
      // { path: 'jobs/:jobId/mark-complete', name: 'HandwerkerMarkCompleteAction', component: HandwerkerJobDetailPage }, // Actions might not be separate routes
      // { path: 'jobs/:jobId/request-payment', name: 'HandwerkerRequestPaymentAction', component: HandwerkerJobDetailPage },
      { path: 'calendar', name: 'HandwerkerCalendarPage', component: HandwerkerCalendarPage },
      { path: 'availability', name: 'HandwerkerAvailabilityPage', component: HandwerkerAvailabilityPage },
      { path: 'services', name: 'HandwerkerServicesPage', component: HandwerkerServicesPage },
      { path: 'services/:serviceId/edit', name: 'HandwerkerServiceEditPage', component: HandwerkerServiceEditPage, props: true },
      { path: 'profile', name: 'HandwerkerProfilePage', component: HandwerkerProfilePage },
      { path: 'profile/settings', name: 'HandwerkerProfileSettingsPage', component: HandwerkerProfileSettingsPage },
      { path: 'reviews', name: 'HandwerkerReviewsPage', component: HandwerkerReviewsPage },
      { path: 'earnings', name: 'HandwerkerEarningsPage', component: HandwerkerEarningsPage },
      { path: 'notifications', name: 'HandwerkerNotificationsPage', component: HandwerkerNotificationsPage },
      { path: 'messages', name: 'HandwerkerMessagesPage', component: HandwerkerMessagesPage },
      // { path: 'messages/:chatId', name: 'HandwerkerMessageDetailPage', component: HandwerkerMessageDetailPage, props: true },
    ]
  },
  // --- Catch All 404 ---
  {
    path: '/:catchAll(.*)*', // Vue Router 4 syntax for catch-all
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Or process.env.BASE_URL for Vue CLI
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// --- Navigation Guards (Example) ---
// You'll need to implement actual authentication logic (e.g., checking Supabase auth state)
// and potentially a state management solution (Pinia/Vuex) to get user role.
//
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const requiredRole = to.meta.role;
//   const isAuthenticated = false; // Replace with actual auth check
//   const userRole = null; // Replace with actual role check
//
//   if (requiresAuth && !isAuthenticated) {
//     next({ name: 'LoginPage', query: { redirect: to.fullPath } });
//   } else if (requiresAuth && isAuthenticated && requiredRole && userRole !== requiredRole) {
//     // Optional: Redirect to a 'Forbidden' page or back to a safe dashboard
//     // For simplicity, redirecting to home or a role-specific dashboard
//     if (userRole === 'customer') next({ name: 'CustomerDashboardPage' });
//     else if (userRole === 'handwerker') next({ name: 'HandwerkerDashboardPage' });
//     else next({ name: 'HomePage' }); // Fallback
//   } else {
//     next();
//   }
// });

export default router;
