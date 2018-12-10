import { Component, OnInit } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-teams',
  templateUrl: 'app/teams.component.html',
  providers: [TeamService]
})
export class TeamsComponent implements OnInit { 
  teams: Team[];

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().then(teams => this.teams = teams);
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

  gotoDetail(team: Team): void {
    if (team) {
      this.router.navigate(['/teamDetail', team._id]);
    } else {
      this.router.navigate(['/teamDetail', ""]);
    }
  }
  
}