import { NgModule } from '@angular/core';
import { BookingComponent } from '../booking-page/booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { FlightsComponent } from './flights/flights.component';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DurationFormatPipe } from 'src/app/pipe/duration-format.pipe';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { TimeFormatPipe } from 'src/app/pipe/time-format.pipe';
import { BookingDetailComponent } from '../booking-page/booking-detail/booking-detail.component';
import { PastBookingComponent } from '../booking-page/past-booking/past-booking.component';
import { UpcommingBookingComponent } from '../booking-page/upcomming-booking/upcomming-booking.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BookingDetailComponent,
    NgOptimizedImage,
    SidebarComponent,
    UpcommingBookingComponent,
    PastBookingComponent,
    NgxChartsModule,
    FormsModule,
    DurationFormatPipe,
    TimeFormatPipe,
    ShortDatePipe,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    AdminComponent,
    FlightsComponent,
    NotificationComponent,
    BookingComponent,
    DashboardPageComponent,
  ],
})
export class DashboardModule {}