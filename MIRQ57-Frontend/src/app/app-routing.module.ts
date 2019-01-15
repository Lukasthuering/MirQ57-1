import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventParticipateComponent } from './event-participate/event-participate.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventEditComponent } from './event-edit/event-edit.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: CalendarOverviewComponent },
  { path: 'event/participate', component: EventParticipateComponent },
  { path: 'event/view/:id', component: EventViewComponent },
  { path: 'event/edit/:id', component: EventEditComponent  },
  { path: 'event/create', component: EventEditComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }