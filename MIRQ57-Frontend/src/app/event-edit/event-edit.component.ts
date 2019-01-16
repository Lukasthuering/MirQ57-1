import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCookie, userCookieName } from '../utilities/cookie.utils';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  event: Event = new Event();
  eventDescriptionError: boolean = false;
  eventPlzRequiredError: boolean = false;
  eventPlzMaxLengthError: boolean = false;
  eventStartRequiredError: boolean = false;
  eventEndRequiredError: boolean = false;
  action: string;

  constructor(private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute) {
    console.log("recieved")
    this.sub = route.params.subscribe(params => {
      var id = +params['id'];
      if (id) {
        this.eventService.getEventById(id).subscribe(event => {
          // Only event hoster can edit an event
          if(event.fk_UserEventHost !== getCookie(userCookieName)){
            this.router.navigate(['calendar']);
          }

          this.event = event;
          this.action = "editing";
        });
      }
      else {
        this.action = "creation";
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.event);
    var isValid = this.isFormValid();
    console.log("valid", isValid);
    if (isValid) {
      this.event.fk_UserEventHost = getCookie(userCookieName);
      this.eventService.updateEvent(this.event).subscribe(e => this.router.navigate(['calendar']));
    }
  }

  isFormValid(): boolean {
    this.eventDescriptionError = !this.event.EventDescription;
    this.eventPlzRequiredError = !this.event.EventPLZ;
    this.eventStartRequiredError = !this.event.EventStart;
    this.eventEndRequiredError = !this.event.EventEnd;

    this.eventPlzMaxLengthError = false;
    if (this.event.EventPLZ) {
      this.eventPlzMaxLengthError = this.event.EventPLZ.length > 11;
    }

    return !(this.eventDescriptionError || this.eventPlzRequiredError || this.eventPlzMaxLengthError || this.eventStartRequiredError || this.eventEndRequiredError);
  }
}
