import { Component } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app-component.html;',
  providers: [LocationService]
})
export class AppComponent {
    title = 'Trainingsplaner';
}