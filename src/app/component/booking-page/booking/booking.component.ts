import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { BookingSearchData } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  isLoading = signal<boolean>(true);

  modifyButtonArray = viewChildren<ElementRef>('.booking-detail-drawer');

  bookings = signal<any[]>([]); // Array to store bookings
  upcomingBookings = signal<any[]>([]);
  pastBookings = signal<any[]>([]);

  pageSize = signal<number>(10);

  currentPageUpcoming = signal<number>(1);
  totalPageUpcomming = signal<number>(1);

  currentPagePast = signal<number>(1);
  totalPagePast = signal<number>(1);

  user_id: number = 0;

  activeTab = signal<'upcoming' | 'past'>('upcoming');
  ticketUrl =
    'https://c8.alamy.com/comp/2AFH8GT/vector-boarding-pass-modern-airline-ticket-for-a-flight-2AFH8GT.jpg'; // or image URL

  searchBookingForm!: FormGroup;

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.setUpUpcomingPastBookings();
  }

  setUpUpcomingPastBookings() {
    this.isLoading.set(true);

    this.bookingService
      .getUpcomingBookings(0, this.currentPageUpcoming(), this.pageSize())
      .subscribe((bookingData) => {
        console.log('bookingData', bookingData);
        this.upcomingBookings.set(bookingData.bookings);
        this.totalPageUpcomming.set(
          Math.ceil(bookingData.total / this.pageSize())
        );
        this.isLoading.set(false);

        // this.setUpSearch();
      });
    this.bookingService
      .getPastBookings(0, this.currentPagePast(), this.pageSize())
      .subscribe((bookingData) => {
        this.pastBookings.set(bookingData.bookings);
        this.totalPagePast.set(Math.ceil(bookingData.total / this.pageSize()));
        this.isLoading.set(false);
      });
  }

  setUpSearch() {
    this.setUpSearchByCriteria('search');
    this.setUpSearchByCriteria('specificDate');
    this.setUpSearchByCriteria('startDate');
    this.setUpSearchByCriteria('endDate');
    this.setUpSearchByCriteria('sortBy');
    this.setUpSearchByCriteria('sortOrder');
  }

  setUpSearchByCriteria(field: string) {
    this.searchBookingForm
      .get(field)!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          this.isLoading.set(true);

          console.log('change');
          let search = this.searchBookingForm.get('search')!.value;
          let specificDate = this.searchBookingForm.get('specificDate')!.value;
          let startDate = this.searchBookingForm.get('startDate')!.value;
          let endDate = this.searchBookingForm.get('endDate')!.value;
          let sortBy = this.searchBookingForm.get('sortBy')!.value;
          let sortOrder = this.searchBookingForm.get('sortOrder')!.value;
          if (this.activeTab() === 'upcoming') {
            console.log('upcomming');
            return this.bookingService.getBookingByField(
              {
                search,
                specificDate,
                startDate,
                endDate,
                sortBy,
                activeTab: this.activeTab(),
                sortOrder,
              },
              this.currentPageUpcoming(),
              this.pageSize()
            );
          } else {
            console.log('past');
            return this.bookingService.getBookingByField(
              {
                search,
                specificDate,
                startDate,
                endDate,
                sortBy,
                activeTab: this.activeTab(),
                sortOrder,
              },
              this.currentPagePast(),
              this.pageSize()
            );
          }
        })
      )
      .subscribe((booking_data) => {
        console.log('booking_data', booking_data);
        if (this.activeTab() === 'upcoming') {
          this.upcomingBookings.update(() => {
            console.log('booking_data.bookings', booking_data.bookings);
            return booking_data.bookings;
          });
          this.totalPageUpcomming.update(() =>
            Math.ceil(booking_data.total / this.pageSize())
          );
          this.isLoading.set(false);
        } else {
          this.pastBookings.update(() => booking_data.bookings);
          this.totalPagePast.update(() =>
            Math.ceil(booking_data.total / this.pageSize())
          );
          this.isLoading.set(false);
        }
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
      .getPastBookings(0, this.currentPagePast(), this.pageSize())
      .subscribe((bookingData) => {
        console.log('bookingData', bookingData);
        this.pastBookings.set(bookingData.bookings);
      });
  }

  changeUpcomingBookingPage(page: number) {
    this.currentPageUpcoming.set(page);
    console.log('page', page);
    this.bookingService
      .getUpcomingBookings(0, this.currentPageUpcoming(), this.pageSize())
      .subscribe((bookingData) => {
        console.log('bookingData', bookingData);
        this.upcomingBookings.set(bookingData.bookings);
      });
  }

  changeActiveTab(tab: 'upcoming' | 'past') {
    this.searchBookingForm.reset({
      search: '',
      activeTab: 'upcoming',
      dateFilterType: 'specific',
      specificDate: '',
      startDate: '',
      endDate: '',
      sortBy: '',
      sortOrder: '',
    });
    this.activeTab.set(tab);
  }

  upcomingBookingsChange(upcomingBookingsData: BookingSearchData) {
    this.upcomingBookings.set(upcomingBookingsData.bookings);
    this.totalPageUpcomming.set(upcomingBookingsData.total);
    this.isLoading.set(upcomingBookingsData.isLoading);
  }
  pastBookingsChange(pastBookingData: BookingSearchData) {
    this.pastBookings.set(pastBookingData.bookings);
    this.totalPagePast.set(pastBookingData.total);
    this.isLoading.set(pastBookingData.isLoading);
  }
}
