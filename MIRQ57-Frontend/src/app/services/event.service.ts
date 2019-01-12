import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Event } from '../models/event';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction } from 'angular-calendar';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private baseUrl: string;
    constructor(private http: HttpClient,
        config: ConfigService) {
        this.baseUrl = config.baseUrl + '/' + config.eventUrl
    }

    getEventByDate(startDate: Date, endDate: Date) {
        return this.http.get<Event>(this.baseUrl + '?startDate='+startDate+'&endDate='+endDate);
    }

    getEventById(id: number) {
        return this.http.get<Event>(this.baseUrl + '?id=' + id);
    }

    getAllEvents() {
        return this.http.get<Event[]>(this.baseUrl);
    }

    createEvent(eventParam: Event) {
        return this.http.post(this.baseUrl, JSON.stringify(eventParam));
    }

    updateEvent(eventParam: Event) {
        return this.http.put<Event>(this.baseUrl, JSON.stringify(eventParam));
    }

    deleteEvent(eventId: number) {
        return this.http.delete(this.baseUrl + '?id=' + eventId);
    }

    public toCalendar(event: Event): CalendarEvent<Event>{
        return {
            id: event.EventID,
            start: new Date(event.EventStart),
            end: new Date(event.EventEnd),
            allDay: event.IsAllDay,
            title: event.EventDescription,
            meta: event,
        }
    }
}