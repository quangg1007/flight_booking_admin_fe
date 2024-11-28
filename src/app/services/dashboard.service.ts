import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/metrics`);
  }

  getDashboardBookingTrends(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/trends`);
  }

  getDashboardDestination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/destinations`);
  }
}
