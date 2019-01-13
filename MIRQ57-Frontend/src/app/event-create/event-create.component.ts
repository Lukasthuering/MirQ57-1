import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event:Event = new Event();
  eventDescriptionError: boolean = false;
  eventPlzRequiredError: boolean = false;
  eventPlzMaxLengthError: boolean = false;
  eventStartRequiredError: boolean = false;
  eventEndRequiredError: boolean = false;

  constructor(private eventService: EventService,
    private router: Router) { }

  ngOnInit() {      
    
  }

  onSubmit(){
    console.log(this.event);
    var isValid = this.isFormValid();
    console.log("valid", isValid);
    if(isValid){
      this.eventService.createEvent(this.event).subscribe(e => this.router.navigate(['calendar']));
    }
  }

  isFormValid():boolean{
   this.eventDescriptionError = !this.event.EventDescription;
   this.eventPlzRequiredError = !this.event.EventPLZ;
   this.eventStartRequiredError = !this.event.EventStart;
   this.eventEndRequiredError = !this.event.EventEnd;
   
   this.eventPlzMaxLengthError = false;
   if(this.event.EventPLZ){
     this.eventPlzMaxLengthError = this.event.EventPLZ.length > 11;
   }

    return !(this.eventDescriptionError || this.eventPlzRequiredError || this.eventPlzMaxLengthError || this.eventStartRequiredError || this.eventEndRequiredError);
  }
}
