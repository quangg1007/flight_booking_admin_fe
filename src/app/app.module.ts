import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/common/sidebar/sidebar.component';
import { AdminComponent } from './component/admin/admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FlightsComponent } from './component/flights/flights.component';
import { NotificationComponent } from './component/notification/notification.component';
import { UserComponent } from './component/user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { LegDetailComponent } from './component/common/leg-detail/leg-detail.component';
import { BookingComponent } from './component/booking-page/booking/booking.component';
import { BookingDetailComponent } from './component/booking-page/booking-detail/booking-detail.component';
import { NgOptimizedImage } from '@angular/common';
import { DurationFormatPipe } from './pipe/duration-format.pipe';
import { TimeFormatPipe } from './pipe/time-format.pipe';
import { ShortDatePipe } from './pipe/short-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    FlightsComponent,
    NotificationComponent,
    UserComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    BookingDetailComponent,
    AppRoutingModule,
    NgOptimizedImage,
    SidebarComponent,
    LegDetailComponent,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    DurationFormatPipe,
    TimeFormatPipe,
    ShortDatePipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
