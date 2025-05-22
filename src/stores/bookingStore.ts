import { defineStore } from 'pinia';
import { supabase } from '@/services/supabaseClient';

// Define interfaces for your state
interface BookingFormData {
  serviceId: string | null;
  handwerkerId: string | null;
  date: string | null;
  timeSlotId: string | null;
  jobDetails: Record<string, any>;
  customerNotes: string;
  photos: File[];
  locationDetails: Record<string, any>;
}

interface Booking {
  id: string;
  customer_id: string;
  handwerker_id: string;
  handwerker_service_id: string;
  booking_time_start: string;
  booking_time_end?: string;
  status: string;
  job_details_customer_input: Record<string, any>;
  total_price: number;
  deposit_amount_paid?: number;
  final_amount_paid?: number;
  platform_fee?: number;
  created_at: string;
  updated_at: string;
  customer?: any;
  handwerker?: any;
  service?: any;
}

interface BookingState {
  bookingForm: BookingFormData;
  currentStep: number;
  customerBookings: Booking[];
  handwerkerJobs: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
  availableTimeSlots: any[];
}

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    // Multi-step booking form data
    bookingForm: {
      serviceId: null,
      handwerkerId: null,
      date: null,
      timeSlotId: null,
      jobDetails: {},
      customerNotes: '',
      photos: [], // Will store file references
      locationDetails: {},
    },
    // Current active step in booking flow
    currentStep: 1,
    // For customer: their bookings
    customerBookings: [],
    // For handwerker: jobs assigned to them
    handwerkerJobs: [],
    // Currently selected booking details
    selectedBooking: null,
    // Loading state
    loading: false,
    // Error message
    error: null,
    // Available time slots for selected date/service
    availableTimeSlots: [],
  }),
  
  getters: {
    isFormValid: (state): boolean => {
      // Check required fields based on current step
      switch (state.currentStep) {
        case 1: // Service selection
          return !!state.bookingForm.serviceId;
        case 2: // Handwerker selection
          return !!state.bookingForm.handwerkerId;
        case 3: // Date & time selection
          return !!state.bookingForm.date && !!state.bookingForm.timeSlotId;
        case 4: // Job details
          // Logic to validate dynamic job details form
          // This will depend on the specific fields required for the service
          return true; // Simplified for now
        case 5: // Review & confirm
          return true; // All validations should have passed in previous steps
        default:
          return false;
      }
    },
    
    canProceedToNextStep(state): boolean {
      return this.isFormValid;
    },
    
    canSubmitBooking(state): boolean {
      // Check if all required info is present
      return !!state.bookingForm.serviceId &&
             !!state.bookingForm.handwerkerId &&
             !!state.bookingForm.date;
    },
    
    pendingBookings(state): Booking[] {
      return state.customerBookings.filter(b => b.status === 'pending_confirmation');
    },
    
    confirmedBookings(state): Booking[] {
      return state.customerBookings.filter(b => 
        ['confirmed', 'in_progress'].includes(b.status)
      );
    },
    
    completedBookings(state): Booking[] {
      return state.customerBookings.filter(b => b.status === 'completed');
    },
    
    // For handwerker
    pendingJobs(state): Booking[] {
      return state.handwerkerJobs.filter(j => 
        j.status === 'pending_confirmation'
      );
    },
    
    upcomingJobs(state): Booking[] {
      return state.handwerkerJobs.filter(j => j.status === 'confirmed');
    },
    
    inProgressJobs(state): Booking[] {
      return state.handwerkerJobs.filter(j => j.status === 'in_progress');
    },
    
    completedJobs(state): Booking[] {
      return state.handwerkerJobs.filter(j => j.status === 'completed');
    },
  },
  
  actions: {
    // Booking form navigation
    setStep(step: number): void {
      if (step >= 1 && step <= 5) {
        this.currentStep = step;
      }
    },
    
    nextStep(): void {
      if (this.currentStep < 5 && this.canProceedToNextStep) {
        this.currentStep++;
      }
    },
    
    prevStep(): void {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    
    // Form data updates
    updateBookingForm(data: Partial<BookingFormData>): void {
      this.bookingForm = { ...this.bookingForm, ...data };
    },
    
    resetBookingForm(): void {
      this.bookingForm = {
        serviceId: null,
        handwerkerId: null,
        date: null,
        timeSlotId: null,
        jobDetails: {},
        customerNotes: '',
        photos: [],
        locationDetails: {},
      };
      this.currentStep = 1;
    },
    
    // API calls
    async fetchCustomerBookings(): Promise<void> {
      this.loading = true;
      this.error = null;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            handwerker:handwerker_id(id, name, avatar_url),
            service:handwerker_service_id(id, custom_service_name, price_amount)
          `)
          .eq('customer_id', authUser.user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        this.customerBookings = data || [];
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch bookings';
        console.error('Error fetching customer bookings:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchHandwerkerJobs(): Promise<void> {
      this.loading = true;
      this.error = null;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            customer:customer_id(id, full_name, email, avatar_url),
            service:handwerker_service_id(id, custom_service_name, price_amount)
          `)
          .eq('handwerker_id', authUser.user.id)
          .order('booking_time_start', { ascending: true });
        
        if (error) throw error;
        
        this.handwerkerJobs = data || [];
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch jobs';
        console.error('Error fetching handwerker jobs:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchBookingDetails(bookingId: string): Promise<void> {
      this.loading = true;
      this.error = null;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            customer:customer_id(id, full_name, email, phone, address, avatar_url),
            handwerker:handwerker_id(id, name, email, phone, address, avatar_url),
            service:handwerker_service_id(*),
            payments(*)
          `)
          .eq('id', bookingId)
          .single();
        
        if (error) throw error;
        
        // Check if user has permission to view this booking
        if (data.customer_id !== authUser.user.id && data.handwerker_id !== authUser.user.id) {
          throw new Error('You do not have permission to view this booking');
        }
        
        this.selectedBooking = data;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch booking details';
        console.error('Error fetching booking details:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async createBooking(): Promise<{ success: boolean, bookingId?: string, error?: string }> {
      if (!this.canSubmitBooking) {
        return { success: false, error: 'Incomplete booking information' };
      }
      
      this.loading = true;
      this.error = null;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        // 1. Create the booking record
        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .insert({
            customer_id: authUser.user.id,
            handwerker_id: this.bookingForm.handwerkerId,
            handwerker_service_id: this.bookingForm.serviceId,
            booking_time_start: `${this.bookingForm.date}T${this.bookingForm.timeSlotId}`,
            status: 'pending_confirmation',
            job_details_customer_input: this.bookingForm.jobDetails,
            customer_notes: this.bookingForm.customerNotes,
          })
          .select()
          .single();
        
        if (bookingError) throw bookingError;
        
        // 2. Upload any photos if present
        if (this.bookingForm.photos.length > 0) {
          await this.uploadBookingPhotos(booking.id);
        }
        
        // Reset form after successful submission
        this.resetBookingForm();
        
        return { success: true, bookingId: booking.id };
      } catch (error: any) {
        this.error = error.message || 'Failed to create booking';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async uploadBookingPhotos(bookingId: string): Promise<void> {
      if (!this.bookingForm.photos.length) return;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        const uploadPromises = this.bookingForm.photos.map(async (file: File, index: number) => {
          const filePath = `bookings/${bookingId}/${Date.now()}_${index}_${file.name}`;
          
          const { error: uploadError } = await supabase.storage
            .from('booking-photos')
            .upload(filePath, file);
          
          if (uploadError) throw uploadError;
          
          // Add record to booking_photos table
          const { error: dbError } = await supabase
            .from('booking_photos')
            .insert({
              booking_id: bookingId,
              storage_path: filePath,
              uploaded_by: authUser.user.id,
              photo_type: 'job_details',
            });
          
          if (dbError) throw dbError;
        });
        
        await Promise.all(uploadPromises);
      } catch (error: any) {
        console.error('Error uploading booking photos:', error);
        // We don't throw here as photos are secondary - booking should still be considered created
      }
    },
    
    async updateBookingStatus(bookingId: string, status: string): Promise<{ success: boolean, error?: string }> {
      this.loading = true;
      this.error = null;
      
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (!authUser.user) throw new Error('Not authenticated');
        
        // First fetch the booking to check permissions
        const { data: booking, error: fetchError } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single();
        
        if (fetchError) throw fetchError;
        
        // Check if user has permission to update this booking
        if (booking.customer_id !== authUser.user.id && booking.handwerker_id !== authUser.user.id) {
          throw new Error('You do not have permission to update this booking');
        }
        
        // Update the booking status
        const { error: updateError } = await supabase
          .from('bookings')
          .update({ 
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', bookingId);
        
        if (updateError) throw updateError;
        
        // Refresh the appropriate bookings list
        if (booking.customer_id === authUser.user.id) {
          await this.fetchCustomerBookings();
        } else {
          await this.fetchHandwerkerJobs();
        }
        
        return { success: true };
      } catch (error: any) {
        this.error = error.message || 'Failed to update booking status';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async cancelBooking(bookingId: string, reason: string): Promise<{ success: boolean, error?: string }> {
      // Implementation placeholder for cancellation logic
      return await this.updateBookingStatus(bookingId, 'canceled_by_customer');
    }
  }
});