import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { query } from '@angular/animations';
import { User } from '../component/dashboard-page/user/user.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getAllUsers(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`, {
      params: { page, limit },
    });
  }

  searchUsers(
    criteria: Record<string, string | number>
  ): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users/search`, {
      params: criteria,
    });
  }

  searchUserByEmailOrFullname(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/search/users`, {
      params: { query, page, limit },
    });
  }

  searchUserByRole(
    role: string,
    page: number = 1,
    limit: number = 10
  ): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/search/role`, {
      params: { role, page, limit },
    });
  }

  getUserById(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/users/${userId}`);
  }

  createUser(userData: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/users`, userData);
  }

  updateUserByEmail(
    email: string,
    userData: Partial<UserModel>
  ): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.apiUrl}/users`, userData, {
      params: { email },
    });
  }

  updateUserTimezone(timezone: string): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.apiUrl}/users/timezone`, {
      timezone,
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  login(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, user, {
      withCredentials: true,
    });
  }

  logout(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, email, {
      withCredentials: true,
    });
  }
}
