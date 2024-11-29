import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Airlines,
  FilterStats,
  Location,
  Stop,
} from 'src/app/models/cardFilter.model';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { DateSliderComponent } from 'src/app/component/common/date-slider/date-slider.component';
import { SliderComponent } from 'src/app/component/common/slider/slider.component';
import { convertTimestampToISOString } from 'src/app/utils/time';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, DateSliderComponent, SliderComponent],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.css',
})
export class CardFilterComponent {
  // filterStats = input.required<FilterStats>();
  filterStats: FilterStats = {
    duration: {
      min: 230,
      max: 2080,
      multiCityMin: 230,
      multiCityMax: 2080,
    },
    airports: [
      {
        city: 'Hanoi',
        airports: [
          {
            id: 'HAN',
            entityId: '128668079',
            name: 'Hanoi',
            isActive: true,
          },
        ],
      },
      {
        city: 'Seoul',
        airports: [
          {
            id: 'ICN',
            entityId: '95673659',
            name: 'Incheon International Airport',
            isActive: true,
          },
        ],
      },
    ],
    carriers: [
      {
        id: -32690,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/CA.png',
        name: 'Air China',
        isActive: true,
      },
      {
        id: -32659,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/NX.png',
        name: 'Air Macau',
        isActive: true,
      },
      {
        id: -32611,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/AK.png',
        name: 'AirAsia',
        isActive: true,
      },
      {
        id: -32709,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/D7.png',
        name: 'AirAsia X',
        isActive: true,
      },
      {
        id: -32571,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/NH.png',
        name: 'ANA (All Nippon Airways)',
        isActive: true,
      },
      {
        id: -32558,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/OZ.png',
        name: 'Asiana Airlines',
        isActive: true,
      },
      {
        id: -32076,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/MR.png',
        name: 'BatikAir Malaysia',
        isActive: true,
      },
      {
        id: -32456,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/CX.png',
        name: 'Cathay Pacific',
        isActive: true,
      },
      {
        id: -32444,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/CI.png',
        name: 'China Airlines',
        isActive: true,
      },
      {
        id: -32442,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/MU.png',
        name: 'China Eastern',
        isActive: true,
      },
      {
        id: -32439,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/CZ.png',
        name: 'China Southern',
        isActive: true,
      },
      {
        id: -32331,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/BR.png',
        name: 'EVA Air',
        isActive: true,
      },
      {
        id: -32179,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/78.png',
        name: 'Jeju Air',
        isActive: true,
      },
      {
        id: -32128,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/KE.png',
        name: 'Korean Air',
        isActive: true,
      },
      {
        id: -32109,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/QV.png',
        name: 'Lao Airlines',
        isActive: true,
      },
      {
        id: -32080,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/MH.png',
        name: 'Malaysia Airlines',
        isActive: true,
      },
      {
        id: -31757,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/TR.png',
        name: 'Scoot',
        isActive: true,
      },
      {
        id: -31882,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/FM.png',
        name: 'Shanghai Airlines',
        isActive: true,
      },
      {
        id: -31880,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/ZH.png',
        name: 'Shenzhen Airlines',
        isActive: true,
      },
      {
        id: -31878,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/3U.png',
        name: 'Sichuan Airlines',
        isActive: true,
      },
      {
        id: -31876,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/SQ.png',
        name: 'Singapore Airlines',
        isActive: true,
      },
      {
        id: -30859,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/S%21.png',
        name: 'STARLUX Airlines',
        isActive: true,
      },
      {
        id: -31767,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/TG.png',
        name: 'Thai Airways',
        isActive: true,
      },
      {
        id: -31734,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/TK.png',
        name: 'Turkish Airlines',
        isActive: true,
      },
      {
        id: -31705,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/4V.png',
        name: 'VietJet Air',
        isActive: true,
      },
      {
        id: -31703,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/VN.png',
        name: 'Vietnam Airlines',
        isActive: true,
      },
      {
        id: -30775,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/I9.png',
        name: 'Vietravel Airlines',
        isActive: true,
      },
      {
        id: -31664,
        logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/MF.png',
        name: 'Xiamen Airlines',
        isActive: true,
      },
    ],
    stopPrices: {
      direct: {
        isPresent: true,
        formattedPrice: '$115',
        isActive: true,
      },
      one: {
        isPresent: true,
        formattedPrice: '$103',
        isActive: true,
      },
      twoOrMore: {
        isPresent: true,
        formattedPrice: '$178',
        isActive: true,
      },
    },
    timeRange: {
      minTimeDeparture: '2024-10-30T00:15:00',
      maxTimeDeparture: '2024-10-30T23:50:00',
      minTimeLanding: '2024-10-30T00:15:00',
      maxTimeLanding: '2024-10-30T23:50:00',
    },
    priceRange: {
      minPrice: 103,
      maxPrice: 2790,
    },
  };

  // Stop Data
  stopData = signal<Stop>({} as Stop);

  // Airport Data
  airportData = signal<Location[]>([]);

  // Airline Data

  airlineData = signal<Airlines[]>([]);

  // Price Change
  priceData = signal<number>(0);

  // State Departure Time Range
  minTimeDeparture = signal<string>('');
  maxTimeDeparture = signal<string>('');

  // State Landing Time Range
  minTimeLanding = signal<string>('');
  maxTimeLanding = signal<string>('');

  allState = signal([
    this.priceData,
    this.minTimeDeparture,
    this.maxTimeDeparture,
    this.minTimeLanding,
    this.maxTimeLanding,
    this.stopData,
    this.airportData,
    this.airlineData,
  ]);

  latestState = computed(() => this.allState().map((x) => x()));
  latestState$ = toObservable(this.latestState);

  filterChange = output<FilterStats>();

  ngOnInit(): void {
    this.minTimeDeparture.set(this.filterStats.timeRange.minTimeDeparture);
    this.maxTimeDeparture.set(this.filterStats.timeRange.maxTimeDeparture);

    this.minTimeLanding.set(this.filterStats.timeRange.minTimeLanding);
    this.maxTimeLanding.set(this.filterStats.timeRange.maxTimeLanding);

    this.stopData.set(this.filterStats.stopPrices);

    this.airlineData.set(this.filterStats.carriers);

    this.airportData.set(this.filterStats.airports);

    this.handleFilterChange();
  }

  handleFilterChange() {
    this.latestState$
      .pipe(skip(2), debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.FilterChange();
      });
  }

  FilterChange() {
    this.filterChange.emit({
      duration: {
        min: this.filterStats.duration.min,
        max: this.filterStats.duration.max,
        multiCityMin: this.filterStats.duration.multiCityMin,
        multiCityMax: this.filterStats.duration.multiCityMax,
      },
      airports: this.airportData(),
      carriers: this.airlineData(),
      stopPrices: this.stopData(),
      timeRange: {
        minTimeDeparture: this.minTimeDeparture(),
        maxTimeDeparture: this.maxTimeDeparture(),
        minTimeLanding: this.minTimeLanding(),
        maxTimeLanding: this.maxTimeLanding(),
      },
      priceRange: {
        minPrice: this.filterStats.priceRange.minPrice,
        maxPrice: this.priceData(),
      },
    });
  }
  handleMinTimeDepartureValueChange(valueTime: number) {
    this.minTimeDeparture.set(convertTimestampToISOString(valueTime));
  }

  handleMaxTimeDepartureValueChange(valueTime: number) {
    this.maxTimeDeparture.set(convertTimestampToISOString(valueTime));
  }

  handleMinTimeLandingValueChange(valueTime: number) {
    this.minTimeLanding.set(convertTimestampToISOString(valueTime));
  }

  handleMaxTimeLandingValueChange(valueTime: number) {
    this.maxTimeLanding.set(convertTimestampToISOString(valueTime));
  }

  handlePriceChange(value: number) {
    this.priceData.set(value);
  }

  onStopSelect(event: any) {
    const stopType = event.target.value as keyof Stop;

    this.stopData.set({
      ...this.stopData(),
      [stopType]: {
        ...this.stopData()[stopType],
        isActive: event.target.checked,
      },
    });
  }

  onAirlinesSelect(event: any) {
    console.log(parseInt(event.target.value) === -32690);
    console.log(event.target.checked);
    this.airlineData.set(
      this.airlineData().map((airline) =>
        airline.id === parseInt(event.target.value)
          ? { ...airline, isActive: event.target.checked }
          : airline
      )
    );
  }

  onAirportSelect(event: any) {
    console.log(event.target.value);
    console.log(event.target.checked);

    this.airportData.set(
      this.airportData().map((location: Location) => {
        const airportData = location.airports.map((airport) => {
          if (parseInt(airport.entityId) === parseInt(event.target.value)) {
            return {
              ...airport,
              isActive: event.target.checked,
            };
          }
          return airport;
        });

        return {
          ...location,
          airports: airportData,
        };
      })
    );

    console.log('airportData', this.airportData());
  }

  clearAirlineCheckboxes() {
    this.airlineData.set(
      this.airlineData().map((airline) => ({
        ...airline,
        isActive: false,
      }))
    );

    // Trigger filter change after clearing
    this.FilterChange();
  }

  clearAirportCheckboxes() {
    this.airportData.set(
      this.airportData().map((location: Location) => {
        const airportdata = location.airports.map((airport) => ({
          ...airport,
          isActive: false,
        }));
        return {
          ...location,
          airports: airportdata,
        };
      })
    );

    console.log(this.airportData());

    // Trigger filter change after clearing
    this.FilterChange();
  }
}
