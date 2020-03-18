import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DisplayComponent } from './search/display/display.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReporterComponent } from './reporter/reporter.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import {FormsModule} from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component'; 

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    SearchComponent,
    DisplayComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ReporterComponent,
    UserComponent,
    LogoutComponent,
    HeaderComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
