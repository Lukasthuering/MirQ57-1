import { Component } from '@angular/core';
import { Field } from './field';
import { FieldService } from './field.service';
import { LocationObject } from './location';
import { LocationService } from './location.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-fields',
  templateUrl: 'app/fields.component.html',
  providers: [FieldService]
})
export class FieldsComponent implements OnInit { 
  fields: Field[];
  locationObjects: LocationObject[];

  constructor(
    private fieldService: FieldService,
    private router: Router,
    private locationService: LocationService
  ) {};

  ngOnInit(): void {
    this.getFields();
    this.locationService.getLocations().then(locationObjects => this.locationObjects = locationObjects);
  }

  getFields(): void {
    this.fieldService.getFields().then(fields => this.fields = fields);
  }

  gotoDetail(field: Field): void {
    if (field) {
      this.router.navigate(['/fieldDetail', field._id]);
    } else {
      this.router.navigate(['/fieldDetail', ""]);
    }
  }

  getLocationName(locationID: string): string {
    var loc = this.locationObjects.find(locationObject => locationObject._id === locationID);
    var name = "Nicht gefunden";
    if (loc) {
      name = loc.name;
    }
    return name;
  }

  getDays(dayOfTheWeek: string): string {
    var array = JSON.parse("[" + dayOfTheWeek + "]");
    var result = "";
    for (var i = 0; i < array.length; i++) { 
      var day = array[i];
      if (day == 1) {
        result = result + "Montag, ";
      }
      if (day == 2) {
        result = result + "Dienstag, ";
      }
      if (day == 3) {
        result = result + "Mittwoch, ";
      }
      if (day == 4) {
        result = result + "Donnerstag, ";
      }
      if (day == 5) {
        result = result + "Freitag, ";
      }
      if (day == 6) {
        result = result + "Samstag, ";
      }
      if (day == 7) {
        result = result + "Sonntag, ";
      }
    }
    return result.substring(0, result.length-2);
  }
  
}