import { Component, OnInit, Input } from '@angular/core';
import { ResponseService } from '../services/response.service';
import { UserResponse } from '../models/response';

@Component({
  selector: 'app-event-participate',
  templateUrl: './event-participate.component.html',
  styleUrls: ['./event-participate.component.css']
})
export class EventParticipateComponent implements OnInit {
@Input() eventId:  number;
participants: UserResponse[] = [];
absentees: UserResponse[] = [];
notResponded: UserResponse[] = [];

  constructor(private responseService: ResponseService) { }

  ngOnInit() {
    this.responseService.getResponsesByEvent(this.eventId).subscribe(userResponses => {
      if(userResponses && userResponses.length > 0){
        console.log("recieved all responses", userResponses);
        this.participants = userResponses.filter(r => r.Value === true);
        console.log("participants", this.participants);
        this.absentees = userResponses.filter(r => r.Value === false);
        console.log("absentees", this.absentees);
        this.notResponded = userResponses.filter(r => r.Value === null);
        console.log(this.notResponded);
      }
    });
  }

}
