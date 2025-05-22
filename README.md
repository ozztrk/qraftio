# Qraftio Platform

**Version:** 0.1.0 (Initial Structure & Planning)
**Last Updated:** {{CURRENT_DATETIME}}

## 1. Project Overview

Qraftio is a modern web platform designed to connect skilled craftsmen (Handwerker) with customers seeking their services in Germany. The platform aims to streamline the process of finding, booking, and managing jobs, while providing a transparent and efficient experience for both parties.

**Target Users:**

*   **Customers:** Individuals or businesses looking for qualified Handwerker for various services.
*   **Handwerkers:** Professional craftsmen offering their skills and services.

**Core Goals:**

*   Simplify service discovery and Handwerker selection for customers.
*   Provide Handwerkers with tools to manage their services, availability, bookings, and earnings.
*   Facilitate clear communication and transparent payment processes.
*   Build a trusted community for quality craftsmanship.

## 2. Technology Stack

*   **Frontend:**
    *   **Framework:** Vue.js 3 (Composition API)
    *   **Build Tool:** Vite
    *   **Routing:** Vue Router
    *   **State Management:** Pinia (Recommended - to be integrated)
    *   **Styling:** CSS (Scoped styles within Vue components, global styles in `src/assets`)
    *   **Language:** TypeScript (for `main.ts`, Vue components using `<script setup lang="ts">`)
    *   **UI Components:** (Consider a library like PrimeVue or Vuetify for rapid UI development, or build custom)
*   **Backend (Platform as a Service):**
    *   **Provider:** Supabase
    *   **Database:** PostgreSQL
    *   **Authentication:** Supabase Auth (handles user sign-up, login, JWTs, RLS policies)
    *   **Storage:** Supabase Storage (for user-uploaded files like profile pictures, job photos)
    *   **Serverless Functions:** Supabase Edge Functions (Deno, TypeScript)
*   **Payment Processing:**
    *   **Provider:** Stripe (for handling payments, deposits, and payouts)

## 3. Frontend Project Structure (`/src`)

```
/src
├── App.vue               # Root Vue component, sets up <router-view>
├── main.ts               # Application entry point, Vue app initialization, router, Pinia setup
├── assets/               # Static assets (images, global styles e.g., main.css)
├── components/           # Globally reusable UI components (e.g., BaseButton.vue, BaseModal.vue)
│   └── common/           # General purpose components
│   └── layout/           # Components used within layouts (e.g., SidebarNav.vue)
├── layouts/              # Layout components for different page structures
│   ├── AppLayout.vue       # For authenticated user areas (sidebar, main content)
│   ├── AuthLayout.vue      # For authentication pages (login, register)
│   └── DefaultLayout.vue   # For public-facing pages (navbar, footer)
├── router/               # Routing configuration
│   └── index.js          # Defines all application routes, including meta fields for auth
├── stores/               # Pinia state management modules (e.g., authStore.js, userStore.js)
├── views/                # Page-level components, organized by user context/feature
│   ├── public/             # Pages accessible to everyone (HomePage.vue, AboutPage.vue etc.)
│   ├── auth/               # Authentication-related pages (LoginPage.vue, RegisterPage.vue etc.)
│   ├── customer/           # Pages specific to the Customer role (CustomerDashboardPage.vue etc.)
│   │   └── booking/        # Components related to the customer booking flow
│   └── handwerker/         # Pages specific to the Handwerker role (HandwerkerDashboardPage.vue etc.)
│       └── services/       # Components related to handwerker service management
├── services/             # Application-specific services (e.g., apiService.js, supabaseClient.js)
├── utils/                # Utility functions (e.g., validators.js, formatters.js)
├── types/                # TypeScript type definitions and interfaces (e.g., user.ts, booking.ts)
└── composables/          # Reusable Vue Composition API functions (e.g., useAuth.js)
```

## 4. Core Features & Implementation Details

*   **User Roles:** Distinct experiences and dashboards for Customers and Handwerkers, managed via a `role` field in the `profiles` table.
*   **Authentication:** Secure user registration, login, password recovery using Supabase Auth. JWTs stored (e.g., in Pinia store and localStorage/sessionStorage) for authenticated requests.
*   **Service Discovery:** Customers can browse services (`ServicesPage.vue`) and find Handwerkers (`FindHandwerkerPage.vue`) with filtering capabilities.
*   **Booking System:** Multi-step booking flow for customers.
*   **Job Management (Handwerker):** View, manage, and update the status of jobs.
*   **Service Portfolio Management (Handwerker):** Define and manage the services they offer, including custom information fields and deposit requirements per service.
*   **Availability Management (Handwerker):** Set recurring working hours, days off, and manage ad-hoc unavailability.
*   **Profile Management:** Users can manage their profiles.
*   **Messaging System (Planned):** Real-time direct communication.
*   **Notifications System (Planned):** In-app notifications.
*   **Payment Processing:** Secure payments via Stripe, supporting a two-part payment flow and platform fee.
*   **Reviews and Ratings:** Customers can leave reviews.

## 5. Layouts: Detailed Responsibilities

*   **`DefaultLayout.vue`:**
    *   **Responsibilities:** Provides the main structure for public pages. Renders a global navigation header (logo, links to Home, Services, Find Handwerker, About, Contact, FAQ, Login, Register) and a global footer.
    *   **Data Flow:** May fetch general site settings or categories if needed for navigation.
*   **`AuthLayout.vue`:**
    *   **Responsibilities:** Provides a clean, centered layout for authentication forms. Includes a prominent logo and a "Back to Home" link.
    *   **Data Flow:** Primarily presentational; child route components handle form data.
*   **`AppLayout.vue`:**
    *   **Responsibilities:** Main layout for authenticated users. Renders a persistent sidebar and a main content area (`<router-view>`). The sidebar's content should adapt based on the authenticated user's role (Customer/Handwerker).
    *   **Data Flow:** Fetches the current user's role from the auth store (Pinia) to determine which navigation links to display in the sidebar. Manages the display of user-related information in the header (e.g., user name, profile picture, logout button).
    *   **Key Components:** Likely uses a `SidebarNav.vue` component.

## 6. Routing and Views: Detailed Breakdown

Routes are defined in `src/router/index.js`. Each route entry includes `path`, `name`, `component`, and potentially `meta` fields (e.g., `meta: { requiresAuth: true, role: 'customer' }`).

### 6.1. Public Routes (using `DefaultLayout.vue`)

*   **`/` (`HomePage.vue`):**
    *   **Responsibilities:** Main landing page. Showcases platform benefits, calls to action (Find a Service, Become a Handwerker), featured services/Handwerkers.
    *   **Data Flow:** May fetch featured content from Supabase.
*   **`/about` (`AboutPage.vue`):** Static content about Qraftio.
*   **`/contact` (`ContactPage.vue`):** Contact form (data submitted to a Supabase function or third-party service).
*   **`/faq` (`FAQPage.vue`):** Static or dynamically fetched FAQ content.
*   **`/services` (`ServicesPage.vue`):**
    *   **Responsibilities:** Lists all available service categories. Allows users to click a category to see related Handwerkers or sub-services.
    *   **Data Flow:** Fetches service categories from the `services` table in Supabase.
*   **`/find-handwerker` (`FindHandwerkerPage.vue`):**
    *   **Responsibilities:** Allows customers to search for Handwerkers based on service type, location (postal code), availability, ratings.
    *   **Data Flow:** Fetches Handwerker profiles (`profiles` table) and their offered services (`handwerker_services`) based on search criteria. Implements filtering and sorting logic.

### 6.2. Authentication Routes (using `AuthLayout.vue`)

*   **`/auth/login` (`LoginPage.vue`):**
    *   **Responsibilities:** Handles user login. Collects email and password.
    *   **Data Flow:** Calls Supabase Auth `signInWithPassword`. On success, stores user session (e.g., in Pinia authStore) and redirects to the appropriate dashboard. Handles login errors.
*   **`/auth/register` (`RegisterPage.vue`):**
    *   **Responsibilities:** Handles new user registration. Collects name, email, password, role (Customer/Handwerker).
    *   **Data Flow:** Calls Supabase Auth `signUp`. On success, may create an entry in the `profiles` table. Handles registration errors.
*   **`/auth/forgot-password` (`ForgotPasswordPage.vue`):**
    *   **Responsibilities:** Allows users to request a password reset link.
    *   **Data Flow:** Calls Supabase Auth `resetPasswordForEmail`. Handles success/error messages.
*   **`/auth/reset-password` (`ResetPasswordPage.vue`):**
    *   **Responsibilities:** Allows users to set a new password using a token from the reset email.
    *   **Data Flow:** Calls Supabase Auth `updateUser` with the new password. Handles success/error messages.

### 6.3. Customer Routes (prefixed with `/c`, using `AppLayout.vue`)

*   **`/c/dashboard` (`CustomerDashboardPage.vue`):**
    *   **Responsibilities:** Overview for customers: recent bookings, pending actions, suggested services.
    *   **Data Flow:** Fetches customer-specific data (e.g., recent bookings from `bookings` table).
*   **Booking Flow (Parent: `CustomerBookingNewFlowParent.vue` - manages overall flow state if needed):
    *   `/c/booking/new/service-selection` (`CustomerBookingServiceSelectionPage.vue`):
        *   **Responsibilities:** Customer selects the main service category and potentially sub-services.
        *   **Data Flow:** Fetches service categories from `services`. Passes selection to the next step.
    *   `/c/booking/new/handwerker-selection` (`CustomerBookingHandwerkerSelectionPage.vue`):
        *   **Responsibilities:** Customer selects a specific Handwerker for the chosen service. Displays available Handwerkers, their profiles, ratings, and possibly price estimates.
        *   **Data Flow:** Fetches Handwerkers offering the selected service, considering their availability (`availability` table).
    *   `/c/booking/new/details` (`CustomerBookingJobDetailsPage.vue`):
        *   **Responsibilities:** Customer provides specific details for the job. The form fields are dynamically generated based on the selected Handwerker's configuration for that service (from `handwerker_services` custom fields definition).
        *   **Data Flow:** Fetches service configuration. Submits job details.
    *   `/c/booking/new/confirmation` (`CustomerBookingConfirmationPage.vue`):
        *   **Responsibilities:** Customer reviews all booking details (service, Handwerker, job details, date/time, price, deposit).
        *   **Data Flow:** Displays aggregated data from previous steps. Creates a pending booking in the `bookings` table.
    *   `/c/booking/new/payment` (`CustomerBookingPaymentPage.vue`):
        *   **Responsibilities:** Handles the initial deposit payment via Stripe.
        *   **Data Flow:** Uses Stripe Elements for secure payment input. Calls a Supabase Edge Function (`create-payment-intent`) to get a client secret from Stripe. Confirms payment with Stripe. Updates booking status in `bookings` table.
*   **`/c/bookings` (`CustomerBookingsPage.vue`):**
    *   **Responsibilities:** Lists all of the customer's bookings (upcoming, ongoing, completed, canceled) with filtering options.
    *   **Data Flow:** Fetches bookings for the current customer from the `bookings` table.
*   **`/c/bookings/:bookingId` (`CustomerBookingDetailPage.vue`):**
    *   **Responsibilities:** Shows detailed information for a specific booking, including status, Handwerker details, job specifics, payment status, communication history (if messaging is implemented).
    *   **Data Flow:** Fetches specific booking data, related Handwerker profile, and messages.
*   **`/c/profile` (`CustomerProfilePage.vue`):** Displays customer's profile information.
*   **`/c/profile/settings` (`CustomerProfileSettingsPage.vue`):**
    *   **Responsibilities:** Allows customer to edit their profile (name, contact, address, profile picture).
    *   **Data Flow:** Fetches current profile from `profiles`. Updates profile data and potentially uploads new profile picture to Supabase Storage.
*   **`/c/payments` (`CustomerPaymentsPage.vue`):** Lists payment history from `payments` table.
*   **`/c/messages` (`CustomerMessagesPage.vue`):** (Planned) Interface for messaging.
*   **`/c/notifications` (`CustomerNotificationsPage.vue`):** (Planned) List of notifications.
*   **`/c/reviews` (`CustomerReviewsPage.vue`):**
    *   **Responsibilities:** Allows customers to submit reviews for completed jobs or view their past reviews.
    *   **Data Flow:** Submits review data to the `reviews` table, linked to a booking and Handwerker.

### 6.4. Handwerker Routes (prefixed with `/h`, using `AppLayout.vue`)

*   **`/h/dashboard` (`HandwerkerDashboardPage.vue`):**
    *   **Responsibilities:** Overview for Handwerkers: upcoming jobs, new booking requests, earnings summary, pending actions.
    *   **Data Flow:** Fetches Handwerker-specific data (bookings, messages, earnings).
*   **`/h/jobs` (`HandwerkerJobsPage.vue`):**
    *   **Responsibilities:** Lists all jobs assigned to the Handwerker (pending confirmation, upcoming, in progress, completed, canceled). Allows status updates.
    *   **Data Flow:** Fetches jobs from `bookings` table where Handwerker ID matches. Updates job status.
*   **`/h/jobs/new/info` (`HandwerkerCustomJobOfferPage.vue`):**
    *   **Responsibilities:** Simple form for Handwerker to create a one-off custom job offer for a customer who inquired directly (not through standard service selection). Includes description, price, proposed date/time.
    *   **Data Flow:** Creates a new entry in `bookings` (or a similar `offers` table) with a special status.
*   **`/h/jobs/:jobId` (`HandwerkerJobDetailPage.vue`):**
    *   **Responsibilities:** Detailed view of a specific job: customer details, job requirements, location, payment status. Allows Handwerker to mark job as complete, request final payment.
    *   **Data Flow:** Fetches specific job data. Triggers payment-related Edge Functions.
*   **`/h/services` (`HandwerkerServicesPage.vue`):**
    *   **Responsibilities:** Lists all services the Handwerker has configured to offer. Allows adding new services or editing existing ones.
    *   **Data Flow:** Fetches services from `handwerker_services` linked to the current Handwerker.
*   **`/h/services/:serviceId/edit` (`HandwerkerServiceEditPage.vue`):**
    *   **Responsibilities:** The core page for a Handwerker to define/edit a specific service they offer. This includes:
        *   Basic service details (name, description, base price/pricing model).
        *   **Custom Form Builder:** UI for defining custom fields (text, number, photo upload, dropdowns) that customers need to fill when booking this service.
        *   Deposit rules (percentage/fixed amount).
    *   **Data Flow:** Fetches/updates service configuration in `handwerker_services` (custom fields likely stored as JSONB).
*   **`/h/availability` (`HandwerkerAvailabilityPage.vue`):**
    *   **Responsibilities:** Allows Handwerker to define their recurring weekly availability (working days, start/end times, break times) and general booking settings (e.g., minimum notice period).
    *   **Data Flow:** Fetches/updates availability rules in the `availability` table (likely one record per Handwerker storing their rules as JSONB or multiple records for time slots).
*   **`/h/calendar` (`HandwerkerCalendarPage.vue`):**
    *   **Responsibilities:** Visual calendar displaying confirmed bookings and allowing Handwerker to block out specific dates/times for ad-hoc unavailability (vacation, appointments).
    *   **Data Flow:** Fetches bookings from `bookings` and specific unavailability from `availability`. Updates ad-hoc blocks in `availability`.
*   **`/h/earnings` (`HandwerkerEarningsPage.vue`):**
    *   **Responsibilities:** Shows earnings reports, transaction history, payout status.
    *   **Data Flow:** Fetches data from `payments` and potentially a `payouts` table.
*   **`/h/profile` (`HandwerkerProfilePage.vue`):** Displays the Handwerker's public-facing profile.
*   **`/h/profile/settings` (`HandwerkerProfileSettingsPage.vue`):**
    *   **Responsibilities:** Allows Handwerker to edit their profile (business name, contact, address, bio, profile picture, portfolio images, service areas covered, qualifications/certifications).
    *   **Data Flow:** Fetches/updates `profiles` table. Uploads images to Supabase Storage.
*   **`/h/reviews` (`HandwerkerReviewsPage.vue`):** Shows reviews received from customers.
*   **`/h/messages` (`HandwerkerMessagesPage.vue`):** (Planned) Interface for messaging.
*   **`/h/notifications` (`HandwerkerNotificationsPage.vue`):** (Planned) List of notifications.

## 7. Backend Integration (Supabase): Detailed Schema & Functions

Row Level Security (RLS) policies must be implemented on all tables to ensure users can only access/modify their own data or data relevant to their role.

*   **`profiles` Table:**
    *   `id` (UUID, Primary Key, references `auth.users.id`)
    *   `created_at` (TIMESTAMPTZ, default `now()`)
    *   `updated_at` (TIMESTAMPTZ)
    *   `email` (TEXT, unique, from `auth.users`)
    *   `role` (TEXT, 'customer' or 'handwerker')
    *   `full_name` (TEXT)
    *   `avatar_url` (TEXT, path to image in Supabase Storage)
    *   `phone_number` (TEXT)
    *   `address_street` (TEXT)
    *   `address_city` (TEXT)
    *   `address_postal_code` (TEXT)
    *   `address_country` (TEXT, default 'Germany')
    *   `handwerker_specific_data` (JSONB, nullable, for business name, bio, qualifications, service areas etc.)
    *   `customer_specific_data` (JSONB, nullable)
    *   `stripe_customer_id` (TEXT, nullable, for Stripe integration)
*   **`services` Table (Master Service Categories):**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `name` (TEXT, unique, e.g., "Plumbing", "Electrical Work")
    *   `description` (TEXT, nullable)
    *   `icon_url` (TEXT, nullable)
    *   `parent_service_id` (UUID, nullable, references `services.id` for sub-categories)
*   **`handwerker_services` Table (Services Offered by Handwerkers):**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `handwerker_id` (UUID, Foreign Key references `profiles.id`)
    *   `service_id` (UUID, Foreign Key references `services.id` - the master service category)
    *   `custom_service_name` (TEXT, nullable, if Handwerker wants to name their specific offering differently)
    *   `description` (TEXT, Handwerker's description of their service)
    *   `pricing_model` (TEXT, e.g., 'hourly', 'fixed', 'per_unit')
    *   `price_amount` (NUMERIC, nullable)
    *   `unit_name` (TEXT, nullable, e.g., 'hour', 'sqm')
    *   `deposit_required` (BOOLEAN, default `false`)
    *   `deposit_type` (TEXT, nullable, 'percentage' or 'fixed')
    *   `deposit_value` (NUMERIC, nullable)
    *   `custom_form_fields` (JSONB, nullable, definition of fields customer needs to fill, e.g., `[{name: 'room_size', label: 'Room Size (sqm)', type: 'number'}, ...]`) 
    *   `is_active` (BOOLEAN, default `true`)
*   **`bookings` Table:**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `customer_id` (UUID, Foreign Key references `profiles.id`)
    *   `handwerker_id` (UUID, Foreign Key references `profiles.id`)
    *   `handwerker_service_id` (UUID, Foreign Key references `handwerker_services.id`)
    *   `booking_time_start` (TIMESTAMPTZ)
    *   `booking_time_end` (TIMESTAMPTZ, nullable)
    *   `status` (TEXT, e.g., 'pending_confirmation', 'confirmed', 'in_progress', 'completed', 'canceled_by_customer', 'canceled_by_handwerker')
    *   `job_details_customer_input` (JSONB, data from the dynamic form)
    *   `total_price` (NUMERIC)
    *   `deposit_amount_paid` (NUMERIC, nullable)
    *   `final_amount_paid` (NUMERIC, nullable)
    *   `platform_fee` (NUMERIC, calculated)
    *   `created_at` (TIMESTAMPTZ, default `now()`)
    *   `updated_at` (TIMESTAMPTZ)
*   **`availability` Table (Handwerker Availability Rules & Overrides):**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `handwerker_id` (UUID, Foreign Key references `profiles.id`, unique if one row per Hwkr for general rules)
    *   `type` (TEXT, 'recurring_schedule' or 'specific_block' or 'specific_opening')
    *   `recurring_schedule_rules` (JSONB, nullable, for weekly schedule: `[{day: 'Monday', start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true}, ...]`) 
    *   `general_booking_settings` (JSONB, nullable, e.g. `{minNoticeHours: 24}`)
    *   `specific_date_start` (TIMESTAMPTZ, nullable, for specific blocks/openings)
    *   `specific_date_end` (TIMESTAMPTZ, nullable, for specific blocks/openings)
    *   `is_available` (BOOLEAN, nullable, for specific_block type, usually false)
    *   `reason` (TEXT, nullable, for specific blocks)
*   **`payments` Table:**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `booking_id` (UUID, Foreign Key references `bookings.id`)
    *   `stripe_payment_intent_id` (TEXT, unique)
    *   `amount` (NUMERIC)
    *   `currency` (TEXT, default 'eur')
    *   `status` (TEXT, e.g., 'succeeded', 'pending', 'failed')
    *   `payment_type` (TEXT, 'deposit' or 'final_payment')
    *   `created_at` (TIMESTAMPTZ, default `now()`)
*   **`reviews` Table:**
    *   `id` (UUID, Primary Key, default `gen_random_uuid()`)
    *   `booking_id` (UUID, Foreign Key references `bookings.id`, unique)
    *   `customer_id` (UUID, Foreign Key references `profiles.id`)
    *   `handwerker_id` (UUID, Foreign Key references `profiles.id`)
    *   `rating` (INTEGER, 1-5)
    *   `comment` (TEXT, nullable)
    *   `created_at` (TIMESTAMPTZ, default `now()`)
*   **`messages` Table (Planned):** `id`, `booking_id` (nullable), `sender_id`, `receiver_id`, `content`, `created_at`, `read_at`.
*   **`notifications` Table (Planned):** `id`, `user_id`, `type`, `message`, `link_url`, `is_read`, `created_at`.

*   **Supabase Edge Functions:**
    *   **`create-payment-intent`:**
        *   **Purpose:** Creates a Stripe PaymentIntent for a booking deposit or final payment.
        *   **Input:** `{ bookingId: string, amount: number, currency: string, customerStripeId?: string, paymentType: 'deposit' | 'final_payment' }`
        *   **Output:** `{ clientSecret: string, paymentIntentId: string }` or error.
        *   **Logic:** Validates booking, calculates amount (applies platform fee if applicable), interacts with Stripe API.
    *   **`stripe-webhook`:**
        *   **Purpose:** Handles incoming webhooks from Stripe (e.g., `payment_intent.succeeded`, `payment_intent.payment_failed`).
        *   **Input:** Stripe event object.
        *   **Output:** HTTP 200 on success, or error code.
        *   **Logic:** Verifies webhook signature. Updates `payments` and `bookings` tables based on the event type.
    *   **`complete-booking-payment` (May be part of `stripe-webhook` or separate):**
        *   **Purpose:** Logic to finalize a booking after successful final payment.
        *   **Input:** `{ bookingId: string }`
        *   **Output:** Success/failure.
        *   **Logic:** Updates booking status, potentially triggers notifications.
    *   **`process-payout` (Planned, for Handwerker payouts):**
        *   **Purpose:** Initiates payouts to Handwerkers via Stripe Connect (if used).

## 8. State Management (Pinia)

Proposed Pinia stores:

*   **`authStore.js`:**
    *   **State:** `user` (Supabase user object), `session` (Supabase session object), `isAuthenticated` (boolean), `loading` (boolean).
    *   **Actions:** `login()`, `register()`, `logout()`, `fetchUserSession()`, `resetPassword()`.
    *   **Getters:** `currentUserRole`.
*   **`userProfileStore.js`:**
    *   **State:** `profile` (current user's profile data from `profiles` table), `loading` (boolean).
    *   **Actions:** `fetchProfile()`, `updateProfile()`.
*   **`bookingStore.js` (Customer focus):**
    *   **State:** `currentBookingFlowData` (data collected across booking steps), `customerBookings` (list), `selectedBookingDetails`.
    *   **Actions:** `startNewBooking()`, `updateBookingStepData()`, `createBooking()`, `fetchCustomerBookings()`, `fetchBookingDetails()`.
*   **`handwerkerJobStore.js` (Handwerker focus):**
    *   **State:** `handwerkerJobs` (list), `selectedJobDetails`.
    *   **Actions:** `fetchHandwerkerJobs()`, `updateJobStatus()`.
*   **`handwerkerServiceStore.js`:**
    *   **State:** `handwerkerServicesConfig` (list of services offered by HW), `currentEditingServiceConfig`.
    *   **Actions:** `fetchHandwerkerServices()`, `saveServiceConfiguration()`.
*   **`handwerkerAvailabilityStore.js`:**
    *   **State:** `availabilityRules`, `calendarEvents`.
    *   **Actions:** `fetchAvailability()`, `saveAvailability()`, `blockCalendarTime()`.
*   **`uiStore.js` (Optional):**
    *   **State:** Global UI state like `isSidebarOpen`, `isLoadingGlobal`, `notifications` (toast messages).
    *   **Actions:** `toggleSidebar()`, `showLoading()`, `hideLoading()`, `addToastNotification()`.

## 9. Payment System: Detailed Flow

1.  **Service Configuration (Handwerker):** Handwerker defines if a service requires a deposit (percentage/fixed) in `HandwerkerServiceEditPage.vue` (data saved to `handwerker_services`).
2.  **Booking (Customer):**
    *   Customer reaches payment step (`CustomerBookingPaymentPage.vue`).
    *   Frontend calls `create-payment-intent` Edge Function with booking details and deposit amount.
    *   Edge Function calculates final deposit (if percentage), creates PaymentIntent with Stripe, returns `clientSecret`.
    *   Frontend uses Stripe.js (`confirmCardPayment` with `clientSecret`) to collect card details and confirm payment.
3.  **Webhook Handling:**
    *   Stripe sends `payment_intent.succeeded` to `stripe-webhook` Edge Function.
    *   Webhook updates `payments` and `bookings` tables (e.g., `deposit_amount_paid`, status to 'confirmed').
4.  **Job Completion (Handwerker):**
    *   Handwerker marks job as complete in `HandwerkerJobDetailPage.vue`.
    *   This may trigger a notification to the customer and enable final payment.
5.  **Final Payment (Customer):**
    *   Customer initiates final payment (similar flow to deposit, potentially from `CustomerBookingDetailPage.vue`).
    *   `create-payment-intent` called for remaining amount.
    *   Stripe webhook updates `payments` and `bookings` (e.g., `final_amount_paid`, status to 'completed').
6.  **Platform Fee:** Calculated and retained by Stripe (or handled via transfers if using Stripe Connect for payouts) during payment processing by the Edge Functions.

## 10. Setup and Running the Project

### Prerequisites

*   Node.js (latest LTS version recommended)
*   npm or yarn
*   Supabase Account & Project
*   Stripe Account

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd qraftio
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # pnpm install
    ```

### Environment Variables

Create a `.env.local` file (or `.env` for some setups) in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_project_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
# For backend/Edge Functions (if separate .env for Supabase functions):
# STRIPE_SECRET_KEY=your_stripe_secret_key
# SUPABASE_JWT_SECRET=your_supabase_jwt_secret (for verifying JWTs in Edge Functions)
```

**Note:** Ensure frontend variables are prefixed with `VITE_`.

### Supabase Setup

1.  Set up your Supabase project.
2.  Use the SQL statements (or migrations) based on section 7 to create your tables and RLS policies.
3.  Deploy Edge Functions.

### Running the Development Server

```bash
npm run dev
# or
# yarn dev
```

### Building for Production

```bash
npm run build
# or
# yarn build
```

## 11. Development Roadmap & Phasing

This provides a structured approach to building Qraftio.

**Phase 0: Foundation & Setup (Completed)**

*   [x] Project initialization (Vite, Vue 3, TypeScript).
*   [x] Basic directory structure.
*   [x] Initial routing setup with placeholder components for all views.
*   [x] Layout components (`DefaultLayout`, `AuthLayout`, `AppLayout`) with basic navigation.
*   [x] This detailed README.md.

**Phase 1: Core Authentication & User Profiles**

*   **Goal:** Users can register, login, logout, and manage basic profiles.
*   Implement Supabase Auth integration.
*   Develop `LoginPage.vue`, `RegisterPage.vue`, `ForgotPasswordPage.vue`, `ResetPasswordPage.vue`.
*   Implement `authStore.js` (Pinia).
*   Develop `CustomerProfileSettingsPage.vue` and `HandwerkerProfileSettingsPage.vue` for basic profile updates (name, email, password change). Link to `profiles` table.
*   Implement RLS on `profiles` table.
*   Basic UI for `CustomerDashboardPage.vue` and `HandwerkerDashboardPage.vue` (post-login landing).

**Phase 2: Handwerker Core Setup (Services & Availability)**

*   **Goal:** Handwerkers can define the services they offer (initially without full custom forms) and set their availability.
*   Develop `HandwerkerServicesPage.vue` to list/add/edit basic service offerings (linking to master `services`, storing in `handwerker_services` without `custom_form_fields` initially).
*   Develop `HandwerkerAvailabilityPage.vue` UI (as started) and backend logic to save to `availability` table.
*   Develop `HandwerkerCalendarPage.vue` to display base availability (bookings come later).
*   Implement `handwerkerServiceStore.js` and `handwerkerAvailabilityStore.js`.

**Phase 3: Customer Service Discovery & Basic Booking (No Payments Yet)**

*   **Goal:** Customers can find Handwerkers and initiate a booking request (without payment).
*   Develop `ServicesPage.vue` (public) to list service categories.
*   Develop `FindHandwerkerPage.vue` with basic search/filter for Handwerkers based on services offered and availability.
*   Implement the customer booking flow (`CustomerBookingNewFlowParent.vue` and its children) up to the confirmation step.
    *   `CustomerBookingJobDetailsPage.vue` will use a generic details form initially.
*   Create pending bookings in `bookings` table.
*   Implement `bookingStore.js` (customer part).

**Phase 4: Job Management & Basic Communication (Handwerker)**

*   **Goal:** Handwerkers can see and manage booking requests.
*   Develop `HandwerkerJobsPage.vue` to display incoming booking requests and allow accept/reject.
*   Update `bookings` table status.
*   (Optional: Very basic messaging placeholder if time allows).

**Phase 5: Payment Integration (Stripe)**

*   **Goal:** Implement deposit and final payment flows.
*   Set up Stripe account and API keys.
*   Develop `create-payment-intent` and `stripe-webhook` Edge Functions.
*   Integrate Stripe Elements into `CustomerBookingPaymentPage.vue`.
*   Update `payments` and `bookings` tables based on payment status.
*   Implement UI for Handwerker to request final payment and customer to make it.

**Phase 6: Advanced Handwerker Service Configuration**

*   **Goal:** Handwerkers can create custom forms for their services.
*   Enhance `HandwerkerServiceEditPage.vue` with a UI for defining `custom_form_fields` (JSONB).
*   Dynamically render these custom forms in `CustomerBookingJobDetailsPage.vue`.
*   Store and retrieve customer input from these dynamic fields in `bookings.job_details_customer_input`.

**Phase 7: Reviews & Ratings**

*   **Goal:** Customers can review completed jobs.
*   Develop `CustomerReviewsPage.vue` for submitting reviews.
*   Develop `HandwerkerReviewsPage.vue` to display received reviews.
*   Store reviews in `reviews` table.

**Phase 8: Real-time Features (Messaging & Notifications)**

*   **Goal:** Implement real-time communication and notifications.
*   Integrate Supabase Realtime for `messages` and `notifications` tables.
*   Develop UI components for messaging and displaying notifications.

**Phase 9: Refinements, Testing & Deployment Prep**

*   **Goal:** Polish UI/UX, comprehensive testing, prepare for deployment.
*   Role-based navigation in `AppLayout.vue`.
*   Advanced filtering, sorting.
*   Error handling, form validation.
*   Write unit and integration tests.
*   Optimize for performance.
*   Prepare deployment scripts/CI-CD.

## 12. Key Challenges & Considerations

*   **Dynamic Form Builder (Handwerker Services):** This is a complex UI/UX and data modeling challenge.
*   **Availability Logic:** Handling recurring schedules, overrides, and querying for available slots can be intricate.
*   **Stripe Integration:** Ensuring secure and robust payment flows, including webhook handling and fee calculation.
*   **Real-time Updates:** Managing real-time subscriptions efficiently.
*   **RLS Policies:** Designing comprehensive RLS policies for data security is critical.
*   **Scalability:** While Supabase handles much of this, efficient querying and data structures are important.

This expanded README aims to be a living document. It should be regularly updated as development progresses, decisions are made, and new features are planned.
