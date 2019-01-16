import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { Response } from '../models/response';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  event: Event = new Event();
  response: Response = new Response();
  sub: any;


  constructor(private eventService: EventService,
    private responseService: ResponseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.sub = route.params.subscribe(params => {
      var id = +params['id'];
      if (id) {
        this.eventService.getEventById(id).subscribe(event => {
          if(event.EventID){
            console.log("Event found", event);
            this.event = event;
          }
        });
        this.responseService.getResponseByEventAndUser(1, id).subscribe(resp => {
          console.log("Recieved", resp);
          if(resp){
            console.log("Response found", resp);
            this.response = resp;
          }
          else{
            this.response.fk_EventID = id;
            this.response.fk_UserID = 1;
            console.log("Response not found", this.response);
          }
        });
      }
    })
  }

  ngOnInit() {
  }


  sendResponse(response: boolean){
    console.log(response);
    this.response.Participates = response;
    this.responseService.updateResponse(this.response).subscribe();
    this.router.navigate(['calendar']);
  }

  setClassForYes(){
    return {
      selectedResponse: this.response.Participates
    }
  }

  setClassForNo(){
    return{
      selectedResponse: !this.response.Participates
    }
  }
}
