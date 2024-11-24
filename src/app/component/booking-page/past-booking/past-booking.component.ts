import { Component, computed, input } from '@angular/core';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { TimeFormatPipe } from 'src/app/pipe/time-format.pipe';
import { LegDetailComponent } from '../../common/leg-detail/leg-detail.component';
import {
  CommonModule,
  NgComponentOutlet,
  NgOptimizedImage,
} from '@angular/common';

@Component({
  selector: 'app-past-booking',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    ShortDatePipe,
    TimeFormatPipe,
    NgOptimizedImage,
    LegDetailComponent,
  ],
  templateUrl: './past-booking.component.html',
  styleUrl: './past-booking.component.css',
})
export class PastBookingComponent {
  activeTab = input<'upcoming' | 'past'>();
  bookings = input.required<any[]>();

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

  expandedIndex: number = -1;

  toggleFlightDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  ngOnInit() {
    console.log(JSON.parse(this.bookings()[0]));
  }
}
