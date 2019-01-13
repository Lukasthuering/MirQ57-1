import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.css']
})
export class CalendarOverviewComponent {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent<Event> }): void => {
        this.editEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent<Event> }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.deleteEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent<Event>[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private router: Router,
    private eventService: EventService) {
    eventService.getAllEvents().subscribe((events) => {
      events.forEach(e => {
        console.log("Event:", e);
        var calendarEvent = this.eventService.toCalendar(e);
        var completeEvent = this.configUISettings(calendarEvent);
        this.events.push(completeEvent);
      });
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent<Event>[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  editEvent(event: CalendarEvent<Event>): void {
    this.router.navigate(['event/edit', event]);
  }

  deleteEvent(event: CalendarEvent<Event>): void {
    console.log('EventId to delete', event.id);
    this.eventService.deleteEvent(event.id.toString()).subscribe();
  }

  configUISettings(event: CalendarEvent<Event>): CalendarEvent<Event> {
    event.color = colors.red;
    event.actions = this.actions;

    event.resizable = {
      beforeStart: false,
      afterEnd: false
    };
    event.draggable = false;
    return event;
  }
}
