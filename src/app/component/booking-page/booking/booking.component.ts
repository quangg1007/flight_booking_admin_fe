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

  pageSize = 10;

  currentPageUpcoming = signal<number>(1);
  totalPageUpcomming = signal<number>(1);

  currentPagePast = signal<number>(1);
  totalPagePast = signal<number>(1);

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
    this.bookingService.getUpcomingBookings(0).subscribe((bookingData) => {
      this.upcomingBookings.set(bookingData.bookings);
      this.totalPageUpcomming.set(
        Math.round(bookingData.total / this.pageSize)
      );
    });
    this.bookingService
      .getPastBookings(0, this.currentPagePast(), this.pageSize)
      .subscribe((bookingData) => {
        this.pastBookings.set(bookingData.bookings);
        this.totalPagePast.set(Math.round(bookingData.total / this.pageSize));
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

  changePastBookingPage(page: number) {
    this.currentPagePast.update(() => page);
    console.log('page', page);
    this.bookingService
      .getPastBookings(0, this.currentPagePast(), this.pageSize)
      .subscribe((bookingData) => {
        console.log('bookingData', bookingData);
        this.pastBookings.set(bookingData.bookings);
      });
  }

  changeUpcomingBookingPage(page: number) {
    this.currentPageUpcoming.set(page);
    console.log('page', page);
    this.bookingService
      .getUpcomingBookings(0, this.currentPageUpcoming(), this.pageSize)
      .subscribe((bookingData) => {
        console.log('bookingData', bookingData);
        this.upcomingBookings.set(bookingData.bookings);
      });
  }
}
