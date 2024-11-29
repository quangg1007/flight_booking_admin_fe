import { Component, OnInit, signal } from '@angular/core';
import { FilterStats } from 'src/app/models/cardFilter.model';
import { FlightSearchService } from 'src/app/services/flightSearch.service';

export interface Flight {
  flight_id: string;
  airline: string;
  departure: string;
  destination: string;
  departure_time: Date;
  arrival_time: Date;
  capacity: number;
  available_seats: number;
  status: 'on_time' | 'delayed' | 'canceled';
  price: number;
}

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = [];
  searchTerm: string = '';
  selectedAirline: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';

  filterStats = signal<FilterStats>({} as FilterStats);
  isLoadingFlight: boolean = false;
  filteredFlights: any[] = [];
  allFlights: any[] = [];

  currentPage = 1;
  flightListResult = signal<any[]>([]);
  pageSize = 10;

  airlines: string[] = [
    'Emirates',
    'Qatar Airways',
    'Singapore Airlines',
    'Lufthansa',
  ];

  constructor(private _flightSearchService: FlightSearchService) {
    // Mock data - replace with actual API call
    this.flights = [
      {
        flight_id: 'FL001',
        airline: 'Emirates',
        departure: 'New York',
        destination: 'London',
        departure_time: new Date('2024-01-20 10:00'),
        arrival_time: new Date('2024-01-20 22:00'),
        capacity: 200,
        available_seats: 45,
        status: 'on_time',
        price: 850,
      },
      // Add more mock flights
    ];
  }

  filterFlights() {
    return this.flights.filter(
      (flight) =>
        (this.selectedAirline
          ? flight.airline === this.selectedAirline
          : true) &&
        (this.selectedStatus ? flight.status === this.selectedStatus : true) &&
        (this.selectedDate
          ? this.isSameDate(flight.departure_time, new Date(this.selectedDate))
          : true) &&
        (this.searchTerm
          ? flight.departure
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            flight.destination
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          : true)
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  addFlight() {
    // Implement add flight logic
  }

  editFlight(flight: Flight) {
    // Implement edit flight logic
  }

  deleteFlight(flightId: string) {
    // Implement delete flight logic
  }

  updateFlightStatus(
    flightId: string,
    newStatus: 'on_time' | 'delayed' | 'canceled'
  ) {
    // Implement status update logic
  }

  ngOnInit() {}

  filterStatsChange(filterStats: FilterStats) {
    this.isLoadingFlight = true;
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      this.filteredFlights = this._flightSearchService.filterFlights(
        this.allFlights,
        filterStats
      );

      this.currentPage = 1;
      this.flightListResult.set(this.filteredFlights.slice(0, this.pageSize));
      this.isLoadingFlight = false;
    }, 1000);
  }
}
