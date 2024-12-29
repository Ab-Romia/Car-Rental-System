import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// // Components for Cars Module
// import { CarListComponent } from './cars/car-list/car-list.component';
// import { CarDetailComponent } from './cars/car-detail/car-detail.component';
// import { AddCarComponent } from './cars/add-car/add-car.component';
// import { EditCarComponent } from './cars/edit-car/edit-car.component';

// // Components for Offices Module
// import { OfficeListComponent } from './offices/office-list/office-list.component';
// import { AddOfficeComponent } from './offices/add-office/add-office.component';

// Components for Auth Pages
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

// // Components for Payments Module
// import { PaymentListComponent } from './payments/payment-list/payment-list.component';
// import { PaymentDetailComponent } from './payments/payment-detail/payment-detail.component';
// import { AddPaymentComponent } from './payments/add-payment/add-payment.component';

// // Composnents for Reports Module
// import { ReportReservationsComponent } from './reports/report-reservations/report-reservations.component';
// import { ReportPaymentsComponent } from './reports/report-payments/report-payments.component';
// import { ReportCarStatusComponent } from './reports/report-car-status/report-car-status.component';

// // Components for Reservations Module
// import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
// import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
// import { ReservationDetailComponent } from './reservations/reservation-detail/reservation-detail.component';

// // Components for Search Module
// import { SearchCarsComponent } from './search/search-cars/search-cars.component';
// import { AdvancedSearchComponent } from './search/advanced-search/advanced-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default Home route

  // Auth Pages
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

//   // Cars Module
//   { path: 'cars', component: CarListComponent },
//   { path: 'cars/add', component: AddCarComponent },
//   { path: 'cars/:id', component: CarDetailComponent },
//   { path: 'cars/:id/edit', component: EditCarComponent },

//   // Offices Module
//   { path: 'offices', component: OfficeListComponent },
//   { path: 'offices/add', component: AddOfficeComponent },s

//   // Payments Module
//   { path: 'payments', component: PaymentListComponent },
//   { path: 'payments/add', component: AddPaymentComponent },
//   { path: 'payments/:id', component: PaymentDetailComponent },

//   // Reports Module
//   { path: 'reports/reservations', component: ReportReservationsComponent },
//   { path: 'reports/payments', component: ReportPaymentsComponent },
//   { path: 'reports/car-status', component: ReportCarStatusComponent },

//   // Reservations Module
//   { path: 'reservations', component: ReservationListComponent },
//   { path: 'reservations/add', component: AddReservationComponent },
//   { path: 'reservations/:id', component: ReservationDetailComponent },

//   // Search Module
//   { path: 'search/cars', component: SearchCarsComponent },
//   { path: 'search/advanced', component: AdvancedSearchComponent },

  // Wildcard route for 404 page
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
