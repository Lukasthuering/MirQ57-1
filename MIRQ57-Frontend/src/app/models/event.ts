export class Event{
    EventID: number;
    EventDescription: string;
    EventLocation: string;
    EventStart: Date;
    EventEnd: Date;
    IsAllDay: boolean;
    fk_UserEventHost: string;
}