import { User } from './user';

export class Response{
    ParticipationID:number;
    fk_EventID: number;
    fk_UserID: string;
    Participates: boolean;
}

export class UserResponse{
    Key: User;
    Value?: boolean;
}