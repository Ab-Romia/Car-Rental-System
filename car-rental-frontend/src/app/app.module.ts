import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; // Your routing module
import { AppComponent } from './app.component';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent, // Root component
    HomeComponent, // Home page component
    LoginComponent, // Login page component
    RegisterComponent, // Register page component
  ],
  imports: [
    BrowserModule, // Required for browser support
    AppRoutingModule, // Routing configuration
    FormsModule, // For template-driven forms
    HttpClientModule, // For making HTTP requests
  ],
  providers: [
    ApiService, // Service for API communication
    AuthService, // Service for authentication
  ],
  bootstrap: [AppComponent], // Root component to bootstrap
})
export class AppModule {}
