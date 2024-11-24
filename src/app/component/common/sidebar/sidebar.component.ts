import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  navItems = [
    {
      path: 'dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      path: 'user',
      icon: 'account_circle',
      label: 'User',
    },
    {
      path: 'admin',
      icon: 'shield_person',
      label: 'Admin',
    },
    {
      path: 'flight',
      icon: 'travel',
      label: 'Flight',
    },
    {
      path: 'notification',
      icon: 'notifications',
      label: 'Notification',
    },
    {
      path: 'bookings',
      icon: 'airplane_ticket',
      label: 'Bookings',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {}
}
