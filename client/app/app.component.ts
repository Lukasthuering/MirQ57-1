import { Component } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/index.html',
  providers: [LocationService]
})
export class AppComponent {
    title = 'Trainingsplaner';
}