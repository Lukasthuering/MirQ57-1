import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction } from 'angular-calendar';

export class Event{
    EventID: number;
    EventDescription: string;
    EventPLZ: string;
    EventStart: Date;
    EventEnd: Date;
    IsAllDay: boolean;
    fk_UserEventHost: number;

    ToCalendar(): CalendarEvent<Event>{
        return {
            id: this.EventID,
            start: this.EventStart,
            end: this.EventEnd,
            allDay: this.IsAllDay,
            title: this.EventDescription,
            meta: this,
        }
    }
}