import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  single!: any[];
  view: [number, number] = [500, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  bookingTrends = [
    {
      name: 'Bookings',
      series: [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 580 },
        { name: 'Mar', value: 620 },
        { name: 'Apr', value: 810 },
        { name: 'May', value: 950 },
      ],
    },
  ];

  revenueGrowth = [
    {
      name: 'Revenue',
      series: [
        { name: 'Jan', value: 25000 },
        { name: 'Feb', value: 35000 },
        { name: 'Mar', value: 42000 },
        { name: 'Apr', value: 55000 },
        { name: 'May', value: 68000 },
      ],
    },
  ];

  popularDestinations = [
    { name: 'New York', value: 8940 },
    { name: 'London', value: 7240 },
    { name: 'Paris', value: 6200 },
    { name: 'Tokyo', value: 5200 },
    { name: 'Dubai', value: 4900 },
  ];

  constructor() {}

  ngOnInit() {}
}
