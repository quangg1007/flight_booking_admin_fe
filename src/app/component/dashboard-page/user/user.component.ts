import {
  Component,
  computed,
  effect,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  role: string;
  timezone: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userResponse = signal<UserResponse>({} as UserResponse);

  resetPasswordDrawer = viewChild<ElementRef>('drawerResetPassword');
  viewBookingsDrawer = viewChild<ElementRef>('drawerViewBookings');

  selectedRole: string = '';
  selectedStatus: string = '';

  searchUserForm!: FormGroup;

  resetPasswordForm!: FormGroup;
  selectedUserId: string = '';

  successMessages: string[] = [];
  errorMessages: string[] = [];

  userBookings: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.initResetPasswordForm();
  }

  ngOnInit(): void {
    this.initSearchUserForm();
    this.userService.getAllUsers().subscribe((users) => {
      this.userResponse.set(users);
      this.setUpSearch();
    });
  }

  initSearchUserForm() {
    this.searchUserForm = this._fb.group({
      search: [''],
      role: [''],
    });
  }

  setUpSearch() {
    this.setUpSearchByCriteria('search');
    this.setUpSearchByCriteria('role');
  }

  setUpSearchByCriteria(field: string) {
    this.searchUserForm
      .get(field)!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          let role: string = '';
          let fullNameOrEmail: string = '';
          if (field === 'role') {
            if (!value) {
              return this.userService.getAllUsers();
            } else {
              role = value;
              return this.userService.searchUserByRole(role);
            }
          } else if (field === 'search') {
            fullNameOrEmail = value;
            if (!fullNameOrEmail || fullNameOrEmail.trim().length === 0) {
              return this.userService.getAllUsers();
            }
            if (fullNameOrEmail.length >= 3) {
              const formattedValue = fullNameOrEmail
                .replace(/\s+/g, '-')
                .toLowerCase();
              return this.userService.searchUserByEmailOrFullname(
                formattedValue
              );
            }
          }
          return [];
        })
      )
      .subscribe((users) => {
        this.userResponse.update(() => users);
        console.log('users: ', users);
      });
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this._fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  resetPassword(userId: string) {
    console.log('Resetting password for user:', userId);
    this.selectedUserId = userId;
    this.resetPasswordForm.reset();
  }

  closeResetDrawer() {
    this.selectedUserId = '';
    this.resetPasswordForm.reset();
    this.resetPasswordDrawer()!.nativeElement.checked = false;
  }

  closeViewDrawer() {
    this.viewBookingsDrawer()!.nativeElement.checked = false;
  }

  confirmResetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('password')?.value;
      // Call your API to reset password
      console.log('Resetting password for user:', this.selectedUserId);
      console.log('New password:', newPassword);

      this.authService
        .updateUserPassword(newPassword, this.selectedUserId)
        .subscribe(
          (response) => {
            console.log('Password reset successful:', response);
            this.showSuccessToast('Password reset successfully');
          },
          (error) => {
            console.error('Password reset failed:', error);
            this.showErrorToast('Failed to reset password. Please try again.');
          }
        );
      this.closeResetDrawer();
    }
  }

  editRoleUser(user: User) {
    // Implement edit user logic
  }

  showSuccessToast(message: string) {
    this.successMessages.push(message);
    setTimeout(() => {
      this.successMessages.pop();
    }, 3000);
  }

  showErrorToast(message: string) {
    this.errorMessages.push(message);
    setTimeout(() => {
      this.errorMessages.pop();
    }, 3000);
  }

  viewUserBookings(user_id: string) {
    console.log('Viewing bookings for user:', user_id);
  }
}
