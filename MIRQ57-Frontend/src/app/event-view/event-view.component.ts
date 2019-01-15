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
          this.event = event;
        });
        this.responseService.getResponseByEventAndUser(1, id).subscribe(resp => {
          this.response = resp;
        });
      }
    })
  }

  ngOnInit() {
  }


  sendResponse(response: Response){
    this.responseService.updateResponse(response).subscribe();
  }
}
