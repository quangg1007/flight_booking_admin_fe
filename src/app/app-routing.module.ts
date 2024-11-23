import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { AdminComponent } from './component/admin/admin.component';
import { FlightsComponent } from './component/flights/flights.component';
import { BookingComponent } from './component/booking-page/booking/booking.component';
import { NotificationComponent } from './component/notification/notification.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'flight',
    component: FlightsComponent,
  },
  {
    path: 'bookings',
    component: BookingComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
