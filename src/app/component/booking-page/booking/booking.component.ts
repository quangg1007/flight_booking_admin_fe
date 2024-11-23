import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  cancelButtons = viewChildren<ElementRef<HTMLButtonElement>>('cancelBtn');
  // bookings = input.required<any[]>();
  bookings = signal<any[]>([
    {
      booking_id: 98,
      booking_date: '2024-11-16T09:01:18.000Z',
      status: 'complete',
      total_price: "'$'112",
      noPassengers: 1,
      passengers: [],
      itinerary: {
        itinerary_id: '12071-2410300140--32179-0-12409-2410300820',
        raw_price: '112.90',
        formatted_price: "'$'112",
        is_self_transfer: false,
        is_protected_self_transfer: false,
        is_change_allowed: false,
        is_cancellation_allowed: false,
        score: '0.888000',
        legs: [
          {
            leg_id: '12071-2410300140--32179-0-12409-2410300820',
            duration_in_minutes: 280,
            stop_count: 0,
            is_smallest_stops: false,
            departure_time: '2024-10-29T18:40:00.000Z',
            arrival_time: '2024-10-30T01:20:00.000Z',
            time_delta_in_days: 0,
            origin_iata: 'HAN',
            origin_name: 'Hanoi',
            destination_iata: 'ICN',
            destination_name: 'Incheon International Airport',
            day_change: 0,
            segments: [
              {
                flight_id: '12071-12409-2410300140-2410300820--32179',
                flight_number: '7C2804',
                depature_time: '2024-10-29T18:40:00.000Z',
                arrival_time: '2024-10-30T01:20:00.000Z',
                origin_name: 'Hanoi',
                destination_name: 'Incheon International Airport',
                duration_in_minutes: 280,
                aircraft: {
                  aircraft_id: -32179,
                  name: 'Jeju Air',
                  alternateId: '78',
                  displayCode: '7C',
                  logoUrl:
                    'https://content.skyscnr.com/097ed926a23c8d50d0ce5fe27d62cb3c/ai-template-jeju-air-thumb-1-xxxhdpi.png',
                },
                departureAirport: {
                  iata: 'HAN',
                  name: 'Noi Bai International Airport',
                },
                arrivalAirport: {
                  iata: 'ICN',
                  name: 'Incheon International Airport',
                },
              },
            ],
          },
        ],
      },
      user: {
        user_id: 13,
        first_name: 'Quang',
        last_name: 'Minh',
        email: 'quangphammrr19@gmail.com',
        phone_number: '0911348859',
      },
    },
  ]);
  selectedBookingId: string | null = null;
  selectedBooking: any;
  selectedFormatedDepDes: any;

  bookingsChanged = output<string>();
  BookingDetailChange = output<any>();

  formatedDepDes = computed(() => {
    return this.bookings().map((booking: any) => {
      if (booking?.itinerary?.legs[0]?.segments[0]) {
        const legs = booking?.itinerary.legs;
        if (legs.length > 1) {
          let depDesTemp: string = '';
          legs.forEach((leg: any, index: number) => {
            depDesTemp +=
              `${leg.origin_iata} - ${leg.destination_iata}` +
              `${index < legs.length - 1 ? ' | ' : ''}`;
          });
          return depDesTemp;
        } else {
          return `${booking?.itinerary?.legs[0]?.origin_iata} - ${booking?.itinerary?.legs[0]?.destination_iata}`;
        }
      }
      return '';
    });
  });

  activeTab = input<'upcoming' | 'past'>();

  expandedIndex: number = -1;

  constructor() {
    effect(() => {
      const buttons = this.cancelButtons();
      buttons.forEach((button, index) => {
        // Work with each button element
        const booking_id = button.nativeElement.getAttribute('booking-id');
        button.nativeElement.addEventListener(
          'click',
          () => this.showModal(booking_id)
          // this.cancelBtn(booking_id)
        );
      });
    });
  }

  showModal(booking_id: string | null) {
    this.selectedBookingId = booking_id;
    const modal = document.getElementById('cancel_modal') as HTMLDialogElement;
    modal.showModal();
  }

  confirmCancel() {
    if (this.selectedBookingId) {
      this.bookingsChanged.emit(this.selectedBookingId);
    }
  }

  toggleFlightDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  setSelectedBooking(booking: any, booking_id: string | null, index: number) {
    this.selectedBooking = booking;
    this.selectedBookingId = booking_id;
    this.selectedFormatedDepDes = this.formatedDepDes()[index];
  }

  bookingDetailChange(bookingData: any) {
    this.BookingDetailChange.emit({
      booking_data: {
        passengers: bookingData,
      },
      booking_id: this.selectedBookingId,
    });
  }
}
