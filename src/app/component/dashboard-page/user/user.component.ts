import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface UserResponse {
  total: number;
  users: User[];
}

export interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  timezone: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userResponse = signal<UserResponse>({} as UserResponse);
  selectedRole: string = '';
  selectedStatus: string = '';

  searchUserForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,

    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initSearchUserForm();
    this.userService.getAllUsers().subscribe((users) => {
      this.userResponse.set(users);
      this.setUpSearchForm();
    });
  }

  initSearchUserForm() {
    this.searchUserForm = this._fb.group({
      search: [''],
    });
  }

  setUpSearchForm() {
    this.searchUserForm
      .get('search')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          if (!value || value.trim().length === 0) {
            return this.userService.getAllUsers();
          }
          if (value.length >= 3) {
            const formattedValue = value.replace(/\s+/g, '-').toLowerCase();
            return this.userService.searchUserByEmailOrFullname(formattedValue);
          }
          return [];
        })
      )
      .subscribe((users) => {
        this.userResponse.update(() => users);
        console.log('users: ', users);
      });
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
}
