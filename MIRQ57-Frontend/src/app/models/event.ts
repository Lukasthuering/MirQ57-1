export class Event{
    EventID: number;
    EventDescription: string;
    EventPLZ: string;
    EventStart: Date;
    EventEnd: Date;
    IsAllDay: boolean;
    fk_UserEventHost: number;
}