import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventParticipateComponent } from './event-participate/event-participate.component';
import { RegisterComponent } from './register/register.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './services/config.service';
import { EventService } from './services/event.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResponseService } from './services/response.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarOverviewComponent,
    EventViewComponent,
    EventEditComponent,
    EventParticipateComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    EventService,
    ResponseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
