import { Component, OnInit } from '@angular/core';
import { Trainer } from './trainer';
import { TrainerService } from './trainer.service';
import { Team } from './team';
import { TeamService } from './team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-trainers',
  templateUrl: 'app/trainers.component.html',
  providers: [TrainerService]
})
export class TrainersComponent implements OnInit { 
  trainers: Trainer[];
  teams: Team[];

  constructor(
    private trainerService: TrainerService,
    private teamService: TeamService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getTrainers();
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  getTrainers(): void {
    this.trainerService.getTrainers().then(trainers => this.trainers = trainers);
  }

  gotoDetail(trainer: Trainer): void {
    if (trainer) {
      this.router.navigate(['/trainerDetail', trainer._id]);
    } else {
      this.router.navigate(['/trainerDetail', ""]);
    }
  }

  getTeamName(teamID: string) {
    var name = "Nicht gefunden";
    if (teamID!="-1") {
      var loc = this.teams.find(team => team._id === teamID);
      if (loc) {
        name = loc.name;
      }
    } else {
      name = "Spielt nicht"
    }
    return name;
  }

  getDays(dayOfTheWeek: string): string {
    var array = JSON.parse("[" + dayOfTheWeek + "]");
    var result = "";
    for (var i = 0; i < array.length; i++) { 
      var day = array[i];
      if (day == 1) {
        result = result + "MO, ";
      }
      if (day == 2) {
        result = result + "DI, ";
      }
      if (day == 3) {
        result = result + "MI, ";
      }
      if (day == 4) {
        result = result + "DO, ";
      }
      if (day == 5) {
        result = result + "FR, ";
      }
    }
    return result.substring(0, result.length-2);
  }

}