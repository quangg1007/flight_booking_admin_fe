import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getAllBookings(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/bookings?page=${page}&limit=${limit}`
    );
  }

  getUpcomingBookings(
    user_id: string | number,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/bookings/upcoming/${user_id}?page=${page}&limit=${limit}`
    );
  }

  getPastBookings(
    user_id: string | number,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/bookings/past/${user_id}?page=${page}&limit=${limit}`
    );
  }

  getBookingById(bookingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  getBookingByField(
    criteria: Record<string, string | number>,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings/search`, {
      params: criteria,
    });
  }

  getBookingByUserId(userId: string | number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings/user/${userId}`);
  }

  checkAvailabilitySeat(itineraryId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/bookings/availability-seat/${itineraryId}`
    );
  }

  bookingPending(bookingData: {
    itinerary_id: string;
    user_id: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/bookings/booking-pending`,
      bookingData
    );
  }

  addNewPassenger(bookingId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/bookings/add-new-passenger`, {
      booking_id: bookingId,
    });
  }

  createBooking(bookingDetail: {
    itinerary_id: string;
    user_id: string;
    booking_id: string;
    passenger_data: any[];
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, bookingDetail);
  }

  removeBookingByUserIdAndBookingId(user_id: number, booking_id: string) {
    return this.http.delete<any>(`${this.apiUrl}/bookings/${booking_id}`);
  }

  updateBooking(bookingId: string, bookingData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/bookings/${bookingId}`,
      bookingData
    );
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  deleteBookingPending(bookingId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/bookings/pending/${bookingId}`
    );
  }

  deletePassengerPendingBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/bookings/remove-passenger/${bookingId}`
    );
  }
}
