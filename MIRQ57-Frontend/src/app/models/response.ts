import { User } from './user';

export class Response{
    ParticipationID:number;
    fk_EventID: number;
    fk_UserID: number;
    Participates: boolean;
}

export class UserResponse{
    Key: User;
    Value?: boolean;
}