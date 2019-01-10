import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventParticipateComponent } from './event-participate/event-participate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarOverviewComponent,
    EventCreateComponent,
    EventViewComponent,
    EventEditComponent,
    EventParticipateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
