import { Injectable } from '@angular/core';
import { FilterStats } from '../models/cardFilter.model';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  filterFlights(flights: any[], filterStats: FilterStats): any[] {
    return [];
  }
}
