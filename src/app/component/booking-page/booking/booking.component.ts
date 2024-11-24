import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  modifyButtonArray = viewChildren<ElementRef>('.booking-detail-drawer');

  bookings = signal<any[]>([]); // Array to store bookings
  upcomingBookings = signal<any[]>([]);
  pastBookings = signal<any[]>([]);

  user_id: number = 0;

  activeTab: 'upcoming' | 'past' = 'upcoming';
  ticketUrl =
    'https://c8.alamy.com/comp/2AFH8GT/vector-boarding-pass-modern-airline-ticket-for-a-flight-2AFH8GT.jpg'; // or image URL

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    this.setUpUpcomingPastBookings();
  }

  setUpUpcomingPastBookings() {
    this.bookingService.getBookingByUserId(13).subscribe((bookingData) => {
      console.log(bookingData);
      const now = new Date();

      const filteredBookings = bookingData.reduce(
        (acc: any, booking: any) => {
          const legs = booking.itinerary.legs;
          const lastLeg = legs[legs.length - 1];
          const lastArrivalTime = new Date(lastLeg.arrival_time);

          if (lastArrivalTime > now) {
            acc.upcoming.push(booking);
          } else {
            acc.past.push(booking);
          }

          return acc;
        },
        { upcoming: [], past: [] }
      );

      console.log(JSON.stringify(filteredBookings.past[0]));

      this.upcomingBookings.set(filteredBookings.upcoming);
      this.pastBookings.set(filteredBookings.past);
    });
  }

  downloadTicket() {
    // Implementation for downloading the ticket
    window.open(this.ticketUrl, '_blank');
  }

  deleteBooking(bookingId: string) {
    console.log('bookingId', bookingId);
    this.bookingService
      .removeBookingByUserIdAndBookingId(13, bookingId)
      .subscribe((res) => {
        if (res.status == 200) {
          this.bookings.set(
            this.bookings().filter(
              (booking) => parseInt(booking.booking_id) !== parseInt(bookingId)
            )
          );
          console.log(this.bookings());
        }
      });
  }

  bookingDetailChange(bookingData: any) {
    console.log('bookingData', bookingData);
    this.bookingService
      .updateBooking(bookingData.booking_id, bookingData.booking_data)
      .subscribe((booking) => {
        console.log('booking', booking);
      });
  }
}
