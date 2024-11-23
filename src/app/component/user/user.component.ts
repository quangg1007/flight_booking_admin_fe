import { Component, OnInit } from '@angular/core';

export interface User {
  user_id: string;
  name: string;
  gender: string;
  email: string;
  nationality: string;
  role: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  selectedStatus: string = '';

  constructor() {
    // Mock data - replace with actual API call
    this.users = [
      {
        user_id: 'USR001',
        name: 'John Doe',
        gender: 'Male',
        email: 'john@example.com',
        nationality: 'USA',
        role: 'user',
        status: 'active',
      },
      {
        user_id: 'USR001',
        name: 'John Doe',
        gender: 'Male',
        email: 'john@example.com',
        nationality: 'USA',
        role: 'user',
        status: 'active',
      },
      {
        user_id: 'USR001',
        name: 'John Doe',
        gender: 'Male',
        email: 'john@example.com',
        nationality: 'USA',
        role: 'user',
        status: 'active',
      },
      // Add more mock users
    ];
  }

  filterUsers() {
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetPassword(userId: string) {
    // Implement password reset logic
  }

  updateUserRole(userId: string, newRole: string) {
    // Implement role update logic
  }

  editUser(user: User) {
    // Implement edit user logic
  }

  viewUserDetails(user: User) {
    // Implement view details logic
  }

  ngOnInit() {}
}
