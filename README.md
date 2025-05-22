# Qraftio Platform

**Version:** 0.1.0 (Initial Structure & Planning)
**Last Updated:** 2025-05-22

## 1. Project Overview

Qraftio is a modern web platform designed to connect skilled craftsmen (Handwerker) with customers seeking their services in Germany. The platform aims to streamline the process of finding, booking, and managing jobs, while providing a transparent and efficient experience for both parties.

**Target Users:**

*   **Customers:** Individuals or businesses looking for qualified craftsmen for various services.
*   **Craftsmen (Handwerkers):** Professional craftsmen offering their skills and services.

**Core Goals:**

*   Simplify service discovery and craftsman selection for customers.
*   Provide craftsmen with tools to manage their services, availability, bookings, and earnings.
*   Facilitate clear communication and transparent payment processes.
*   Build a trusted community for quality craftsmanship.

## 2. Technology Stack

*   **Frontend:**
    *   **Framework:** Vue.js 3 (Composition API)
    *   **Build Tool:** Vite
    *   **Routing:** Vue Router
    *   **State Management:** Pinia (recommended - to be integrated)
    *   **Styling:** CSS (scoped styles within Vue components, global styles in `src/assets`)
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
├── style.css             # Global CSS styles
├── assets/               # Static assets
│   ├── fonts/            # Font files
│   ├── images/           # Image assets
│   ├── styles/           # Additional CSS stylesheets
│   └── vue.svg           # Vue logo
├── components/           # Reusable UI components
│   ├── auth/             # Authentication-related components
│   ├── bookings/         # Booking-related components 
│   └── common/           # General purpose components
├── layouts/              # Layout components for different page structures
│   ├── AppLayout.vue       # For authenticated user areas (sidebar, main content)
│   ├── AuthLayout.vue      # For authentication pages (login, register)
│   └── DefaultLayout.vue   # For public-facing pages (navbar, footer)
├── router/               # Routing configuration
│   └── index.js          # Defines all application routes, including meta fields for auth
├── stores/               # Pinia state management modules
│   ├── authStore.js        # Authentication state management
│   └── bookingStore.js     # Booking flow and management state
├── views/                # Page-level components, organized by user context/feature
│   ├── NotFoundPage.vue    # 404 page
│   ├── public/             # Pages accessible to everyone (HomePage.vue, AboutPage.vue etc.)
│   │   └── (includes auth pages: LoginPage, RegisterPage, etc.)
│   ├── customer/           # Pages specific to the Customer role (CustomerDashboardPage.vue etc.)
│   └── handwerker/         # Pages specific to the Craftsman role (HandwerkerDashboardPage.vue etc.)
├── services/             # Application-specific services (e.g., apiService.js, supabaseClient.js)
└── vite-env.d.ts         # TypeScript declaration file for Vite
```

**Note:** The project may evolve to include additional directories such as `utils/` (utility functions), `types/` (TypeScript type definitions), and `composables/` (reusable Vue Composition API functions) as development progresses.

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

**Phase -1: Supabase Backend Foundation (Completed)**

- **Core Data Models Established:**
    - [x] **User Management (`profiles`):** Foundational table storing essential data for both Customers and Handwerkers. Links to Supabase Auth users.
    - [x] **Service Definition & Offering (`services`, `handwerker_services`):** Defines service categories and allows Handwerkers to list their specific offerings, pricing, and duration.
    - [x] **Availability & Scheduling (`availability`):** Enables Handwerkers to manage their working hours and exceptions.
    - [x] **Booking Management (`bookings`):** Tracks service requests, linking customers, handwerkers, services, times, and status.
    - [x] **Location Data (`locations`):** Stores location-related information.

- **Payment System Infrastructure & Core Logic:**
    - [x] **Payment Processing Tables (`payments`, `payment_splits`, `refunds`):
        - `payments`: Records all financial transactions (deposits, final payments).
        - `payment_splits`: Details platform fee (4.99%) distribution and Handwerker payouts.
        - `refunds`: Tracks refunded amounts.
    - [x] **Invoicing (`invoices`):** Table structure for managing invoices.
    - [x] **Stripe Integration - Core Edge Functions & Associated RPCs Implemented:
        - `create-payment-intent` (Edge Function):
            - Securely initiates Stripe payments for customers.
            - Calculates the 4.99% platform fee and the net amount for the Handwerker.
            - Calls the `create_payment` RPC to log the payment attempt details (including Stripe Payment Intent ID) in the `payments` table.
            - Returns a client secret for frontend Stripe Elements.
        -  `stripe-webhook` (Edge Function): *Not yet implemented - moved to Phase 5*
    - [x] **Supporting Remote Procedure Calls (RPCs) Implemented:**
        - `create_payment`: (Used by `create-payment-intent`) - Also handles payment splits internally rather than using a separate function
        - `update_payment_status`: (Used by `stripe-webhook`)
        - `update_booking_on_payment`: (Used by `stripe-webhook`) - Trigger function that updates booking status when payment status changes
        - `calculate_platform_fee`: Helper function for fee calculations
        - `calculate_remaining_payment`: Helper function for determining final payment amounts
        - *Note: `create_refund_record` function to be implemented in Phase 5 alongside the `stripe-webhook` Edge Function*

- **Community & Feedback Structures:**
    - [x] **Reviews & Ratings (`reviews`):** Allows customers to submit feedback for completed jobs.

- **Communication Infrastructure (Initial Setup):**
    - [x] **Messaging (`messages`):** Basic table structure for future real-time chat.
    - [x] **Notifications (`notifications`):** Foundational table for future user alerts.

- **Authentication & Core Configuration:**
    - [x] **Supabase Auth:** User authentication system (signup, login, etc.) initialized.
    - [x] **Environment Variables:** Secure configuration of Supabase & Stripe API keys.

- **Overall Row Level Security (RLS) Status:**
    - [x] **RLS Enabled on All Custom Tables:** Security policies are active for `profiles`, `services`, `handwerker_services`, `availability`, `bookings`, `payments`, `payment_splits`, `refunds`, `reviews`, `messages`, `notifications`, `invoices`, and `locations`.
    - [x] **Initial Policies Supporting Core Flows:** Foundational RLS policies are in place, particularly for tables involved in the payment lifecycle (`payments`, `payment_splits`, `bookings`), ensuring the existing Edge Functions and RPCs operate with a baseline level of data protection.
    - [ ] **Comprehensive Granular RLS Pending:** While RLS is enabled and initial policies exist, the development and rigorous testing of comprehensive, granular RLS policies for all tables, covering all user roles and interaction scenarios, remain a key focus for subsequent development phases.

**Phase 0: Frontend Foundation & Project Setup (Completed)**

*   [x] Project initialization (Vite, Vue 3, TypeScript).
*   [x] Basic directory structure for frontend.
*   [x] Initial routing setup with placeholder components for all defined views.
*   [x] Layout components (`DefaultLayout`, `AuthLayout`, `AppLayout`) with basic navigation structure.
*   [x] This detailed README.md.

**Phase 1: Core Authentication & User Profiles**
- **Goal:** Users can register, login, logout, and manage basic profiles.
- **Backend Tasks (Supabase):**
    - [ ] Implement and rigorously test Row Level Security (RLS) policies on the `profiles` table (users manage own, admin access).
    - [ ] *Optional:* Create `update_user_profile` RPC if complex server-side logic is needed beyond Supabase client helpers for profile updates.
- **Frontend Tasks (Vue.js):**
    - [ ] Implement Supabase Auth client-side logic for registration, login, logout, password reset.
    - [ ] Develop Vue components: `LoginPage.vue`, `RegisterPage.vue`, `ForgotPasswordPage.vue`, `ResetPasswordPage.vue`.
    - [ ] Create `authStore.js` (Pinia) for global authentication state and user information.
    - [ ] Develop `CustomerProfileSettingsPage.vue` and `HandwerkerProfileSettingsPage.vue` for users to update profile information (name, contact details, password), interacting with the `profiles` table.
    - [ ] Implement basic UI for `CustomerDashboardPage.vue` and `HandwerkerDashboardPage.vue` as post-login landing pages.

**Phase 2: Handwerker Core Setup (Services & Availability)**
- **Goal:** Handwerkers can define the services they offer (initially without full custom forms) and set their availability.
- **Backend Tasks (Supabase):**
    - [ ] Ensure `services` (master list), `handwerker_services` (linking Handwerker to master services, storing price/duration), and `availability` tables are correctly structured.
    - [ ] Implement and test RLS policies for `services`, `handwerker_services`, and `availability` tables.
    - [ ] Create RPC: `add_handwerker_service` (Handwerker links a master service to their profile, sets initial price/duration).
    - [ ] Create RPC: `update_handwerker_service` (Modify existing `handwerker_services`).
    - [ ] Create RPC: `save_availability_schedule` (Batch save/update weekly recurring availability rules).
    - [ ] Create RPC: `add_availability_override` (For Handwerker to add specific date additions/removals for their calendar).
- **Frontend Tasks (Vue.js):**
    - [ ] Develop `HandwerkerServicesPage.vue`: UI to list, add, and edit basic service offerings (calling `add_handwerker_service`, `update_handwerker_service` RPCs).
    - [ ] Finalize UI for `HandwerkerAvailabilityPage.vue` (building on the started component) and connect it to the `save_availability_schedule` RPC.
    - [ ] Develop `HandwerkerCalendarPage.vue`: UI to display the Handwerker's base availability and allow adding ad-hoc blocks/unavailability (calling `add_availability_override` RPC).
    - [ ] Create `handwerkerServiceStore.js` and `handwerkerAvailabilityStore.js` (Pinia) for state management.

**Phase 3: Customer Service Discovery & Basic Booking (No Payments Yet)**
- **Goal:** Customers can find Handwerkers and initiate a booking request (without payment).
- **Backend Tasks (Supabase):**
    - [ ] Ensure `bookings` table is correctly structured (status, customer_id, handwerker_id, service_id, job_details, booking_time, etc.).
    - [ ] Implement and test RLS policies for the `bookings` table.
    - [ ] Create RPC: `search_handwerkers` (Complex function to filter Handwerkers by service, availability, location, possibly ratings).
    - [ ] Create RPC: `create_booking_request` (Creates a new booking with 'pending' status).
    - [ ] Implement validation for `job_details_customer_input` fields, even in the basic form version.
    - [ ] Ensure booking creation process creates appropriate notifications for both parties.
- **Frontend Tasks (Vue.js):**
    - [ ] Develop `ServicesPage.vue` (public): UI to display service categories (from `services` table).
    - [ ] Develop `FindHandwerkerPage.vue`: UI with search/filter controls; calls the `search_handwerkers` backend RPC and displays results.
    - [ ] Implement the multi-step customer booking flow UI:
        - [ ] `CustomerBookingNewFlowParent.vue` (and children like `CustomerBookingServiceSelectionPage.vue`, `CustomerBookingSelectHandwerkerPage.vue`, `CustomerBookingJobDetailsPage.vue` (with a generic form initially), `CustomerBookingDateTimePage.vue`, `CustomerBookingReviewConfirmPage.vue`).
    - [ ] Frontend logic to call the `create_booking_request` RPC.
    - [ ] Create `bookingStore.js` (Pinia) for managing booking flow state.
    - [ ] Implement photo upload component for job details using Supabase Storage and the `booking_photos` table.

**Phase 4: Job Management & Basic Communication (Handwerker)**
- **Goal:** Handwerkers can see and manage booking requests.
- **Backend Tasks (Supabase):**
    - [ ] Create RPC: `update_booking_status` (e.g., Handwerker accepts, rejects, marks as in_progress).
    - [ ] *Optional (for very basic messaging):* Implement RLS for `messages` table. Create RPC `send_message`.
- **Frontend Tasks (Vue.js):**
    - [ ] Develop `HandwerkerJobsPage.vue`: UI to display incoming booking requests (from `bookings` table) and allow Handwerker to accept/reject (calling `update_booking_status` RPC).
    - [ ] *Optional:* Basic UI placeholder for messaging if `messages` table and `send_message` RPC are implemented.

**Phase 5: Payment Integration (Stripe)**
- **Goal:** Implement deposit and final payment flows.
- **Backend Tasks (Supabase):**
    - [ ] Implement the `stripe-webhook` Edge Function to handle Stripe webhook events:
        - Will securely listen for and verify asynchronous events from Stripe.
        - Will handle `payment_intent.succeeded`: Calling `update_payment_status` RPC (updates `payments` table). The `update_booking_on_payment` trigger will automatically update the booking status.
        - Will handle `payment_intent.payment_failed`: Calling `update_payment_status` RPC.
        - Will handle `charge.refunded`: Implement and call `create_refund_record` RPC to populate the `refunds` table.
    - [ ] Create RPC: `create_refund_record` to handle refund data storage and associated booking status updates.
    - [ ] Create RPC: `initiate_refund` for Handwerkers to initiate refunds through the Stripe API.
    - [ ] Thoroughly test existing `create-payment-intent` Edge Function and the newly implemented `stripe-webhook` Edge Function with various scenarios (deposit, final payment, error cases, refunds).
    - [ ] Ensure the Stripe account is fully configured (bank details, webhook endpoint pointing to Supabase `stripe-webhook` URL, listening for necessary events like `payment_intent.succeeded`, `payment_intent.payment_failed`).
    - [ ] Verify, extend, and test RLS policies for `payments` and `payment_splits` tables (building on initial RLS).
    - [ ] *Optional:* Create RPC `request_final_payment` (Handwerker triggers this, might update booking status or create a notification for the customer).
- **Frontend Tasks (Vue.js):**
    - [ ] Configure Stripe.js with the publishable key.
    - [ ] Integrate Stripe Elements into `CustomerBookingPaymentPage.vue` for secure input of card details.
    - [ ] Frontend logic to:
        - [ ] Call the `create-payment-intent` Edge Function.
        - [ ] Use the returned `client_secret` with Stripe.js to confirm the payment.
        - [ ] Handle payment success/failure UI updates.
    - [ ] UI for Handwerker to indicate a job is ready for final payment (potentially calling `request_final_payment` RPC).
    - [ ] UI for Customer to initiate and complete the final payment.

**Phase 6: Advanced Handwerker Service Configuration**
- **Goal:** Handwerkers can create custom forms for their services.
- **Backend Tasks (Supabase):**
    - [ ] Ensure `handwerker_services` table has a JSONB column for `custom_form_fields`.
    - [ ] Ensure `bookings` table has a JSONB column for `job_details_customer_input` (to store customer's answers to custom fields).
    - [ ] Update RLS for these tables/columns if necessary.
    - [ ] Create RPC: `save_handwerker_service_custom_fields` (Handwerker saves their form definition to `handwerker_services.custom_form_fields`).
- **Frontend Tasks (Vue.js):**
    - [ ] Enhance `HandwerkerServiceEditPage.vue`: UI for Handwerkers to define `custom_form_fields` (e.g., text input, dropdown, file upload specifications) for each of their services. This UI will call the `save_handwerker_service_custom_fields` RPC.
    - [ ] Modify `CustomerBookingJobDetailsPage.vue`: Dynamically render input fields based on the `custom_form_fields` JSON of the selected Handwerker's service.
    - [ ] Frontend logic to collect and save customer input from these dynamic forms into `bookings.job_details_customer_input` (likely as part of the `create_booking_request` RPC or a subsequent update RPC).

**Phase 7: Reviews & Ratings**
- **Goal:** Customers can review completed jobs.
- **Backend Tasks (Supabase):**
    - [ ] Implement and test RLS policies for the `reviews` table.
    - [ ] Create RPC: `submit_review` (Customer submits a review for a completed job).
    - [ ] *Optional:* Create RPC `get_handwerker_reviews` (To fetch all reviews for a specific Handwerker).
- **Frontend Tasks (Vue.js):**
    - [ ] Develop `CustomerReviewsPage.vue`: UI for customers to submit ratings and comments for completed jobs (calling `submit_review` RPC).
    - [ ] Develop `HandwerkerReviewsPage.vue`: UI for Handwerkers to view reviews they've received (calling `get_handwerker_reviews` RPC or fetching directly if RLS allows).
    - [ ] Display ratings/reviews on public Handwerker profiles and/or service detail pages.

**Phase 8: Real-time Features (Messaging & Notifications)**
- **Goal:** Implement real-time communication and notifications.
- **Backend Tasks (Supabase):**
    - [ ] Enable Supabase Realtime on the `messages` and `notifications` tables via the Supabase dashboard.
    - [ ] Implement/Verify RLS policies for `messages` and `notifications` tables are compatible with real-time subscriptions (users should only subscribe to their own data).
    - [ ] Create RPC: `create_notification` (Generic function to insert notifications for various events like new booking, new message, payment confirmation).
    - [ ] *If not done in Phase 4:* Create RPC `send_message` for the messaging system.
- **Frontend Tasks (Vue.js):**
    - [ ] Integrate Supabase Realtime client: Set up subscriptions for `messages` and `notifications` tables.
    - [ ] Develop UI components:
        - [ ] `CustomerMessagesPage.vue` / `HandwerkerMessagesPage.vue` (or a unified messaging interface) for sending/receiving messages in real-time.
        - [ ] A notification indicator/dropdown (e.g., `NotificationsBell.vue` in `AppLayout.vue`) to display new notifications.

**Phase 9: Refinements, Testing & Deployment Prep**
- **Goal:** Polish UI/UX, comprehensive testing, prepare for deployment.
- **Backend Tasks (Supabase):**
    - [ ] Conduct database indexing and optimization based on query performance testing.
    - [ ] Perform a final RLS policy review and security audit.
    - [ ] Prepare/finalize database migration scripts if any schema changes occurred outside of initial setup or if managing schema changes through migrations.
    - [ ] Stress test Edge Functions.
- **Frontend Tasks (Vue.js):**
    - [ ] Implement role-based navigation and dynamic component visibility in `AppLayout.vue` and throughout the application (e.g., show "Handwerker Dashboard" link only to Handwerkers).
    - [ ] Add advanced client-side filtering, sorting, and pagination to relevant views (e.g., job lists, Handwerker lists).
    - [ ] Implement comprehensive frontend form validation and user-friendly error handling.
    - [ ] Write unit tests (e.g., using Vitest/Jest) for components, Pinia stores, and utility functions.
    - [ ] Write integration tests (e.g., using Cypress or Playwright) for key user flows (registration, booking, payment).
    - [ ] Optimize frontend performance (code splitting, lazy loading, image optimization, bundle size analysis).
    - [ ] Prepare build scripts and research/set up a CI/CD pipeline for deployment (e.g., to Netlify, Vercel).

**Phase 10: Automated Reminder System**
- **Goal:** Implement a comprehensive reminder system to reduce no-shows and improve communication.
- **Backend Tasks (Supabase):**
    - [ ] Create scheduled function or external service integration for processing the `reminders` table.
    - [ ] Create RPC: `schedule_reminder` (Creates reminder records with appropriate timing).
    - [ ] Create RPC: `process_due_reminders` (Finds reminders due to be sent and processes them).
    - [ ] Implement integration with email service (e.g., SendGrid, AWS SES) for email reminders.
    - [ ] Implement integration with SMS service (e.g., Twilio) for text message reminders.
    - [ ] Set up monitoring for reminder delivery status.
- **Frontend Tasks (Vue.js):**
    - [ ] Develop reminder preference settings in user profile pages.
    - [ ] Add reminder status visibility in booking details pages for both customers and handwerkers.
    - [ ] Implement reminder templates management interface (optional, for admin users).

**Phase 11: Calendar Integration**
- **Goal:** Enable two-way synchronization with external calendar services (Google Calendar, iCal, etc.).
- **Backend Tasks (Supabase):**
    - [ ] Create Edge Function: `calendar-oauth` to handle authentication with calendar providers.
    - [ ] Create Edge Function: `calendar-sync` to handle two-way synchronization of events.
    - [ ] Create RPC: `connect_external_calendar` (Stores OAuth tokens and calendar preferences).
    - [ ] Create RPC: `handle_calendar_conflicts` (Manages conflicts between platform and external calendars).
    - [ ] Implement periodic sync process for keeping calendars up-to-date.
- **Frontend Tasks (Vue.js):**
    - [ ] Develop `HandwerkerCalendarIntegrationPage.vue` for connecting and managing external calendars.
    - [ ] Enhance `HandwerkerCalendarPage.vue` to display combined events from platform and external sources.
    - [ ] Add UI indicators for events from different sources.
    - [ ] Implement conflict resolution interface for overlapping appointments.

**Phase 12: Admin Interface & Reporting**
- **Goal:** Provide platform administration, analytics, and dispute resolution tools.
- **Backend Tasks (Supabase):**
    - [ ] Create admin-specific tables and views as needed.
    - [ ] Implement RLS policies for admin access.
    - [ ] Create RPCs for admin functions (user management, content moderation, payment oversight).
    - [ ] Create analytics queries for platform metrics.
    - [ ] Implement reporting infrastructure for financial and operational reporting.
- **Frontend Tasks (Vue.js):**
    - [ ] Develop admin dashboard with overview of platform metrics.
    - [ ] Implement user management interface (search, view, edit, suspend accounts).
    - [ ] Create dispute resolution interface for handling conflicts between users.
    - [ ] Build reporting tools for financial performance and transaction history.
    - [ ] Implement content moderation tools for reviews and messages if needed.

## 12. Key Challenges & Considerations

*   **Dynamic Form Builder (Handwerker Services):** This is a complex UI/UX and data modeling challenge.
*   **Availability Logic:** Handling recurring schedules, overrides, and querying for available slots can be intricate.
*   **Stripe Integration:** Ensuring secure and robust payment flows, including webhook handling and fee calculation.
*   **Real-time Updates:** Managing real-time subscriptions efficiently.
*   **RLS Policies:** Designing comprehensive RLS policies for data security is critical.
*   **Scalability:** While Supabase handles much of this, efficient querying and data structures are important.

This expanded README aims to be a living document. It should be regularly updated as development progresses, decisions are made, and new features are planned.

## 13. Future Considerations & Enhancements

- Advanced search filters (location radius, specific skills, Handwerker ratings).
- Real-time chat between Customer and Handwerker.
- In-app notification system.
- Admin dashboard for platform management.
- Multi-language support.
- Integration with mapping services for location visualization.
- More detailed Handwerker profiles (portfolios, certifications).
- Tiered subscription plans for Handwerkers (optional).

## 14. Contribution Guidelines

(If applicable, for open source or team projects)
- How to set up the development environment.
- Coding standards and style guides.
- Branching strategy (e.g., Gitflow).
- Pull request process.
- Testing requirements.

## 15. License

Specify the project license (e.g., MIT, GPL).

---

*This README aims to be a living document. It should be regularly updated as development progresses, decisions are made, and new features are planned.*
