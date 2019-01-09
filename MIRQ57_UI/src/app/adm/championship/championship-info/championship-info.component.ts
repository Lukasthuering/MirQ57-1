import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ChampionshipsService } from '../../../services/adm/championships.service'
import { TeamsService } from '../../../services/adm/teams.service'

@Component({
  selector: 'app-championship-info',
  templateUrl: './championship-info.component.html',
  styleUrls: ['./championship-info.component.css']
})
export class ChampionshipInfoComponent implements OnInit {
  id: string;
  data: any;
  startDateLabel = "";
  endDateLabel = "";
  moment = moment;
  closeResult: string;
  availableTeams: Array<any>;

  constructor(private champSvc: ChampionshipsService, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private teamsSvc: TeamsService, ) {
    this.data = {};
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.id = id;
      this.champSvc.getByIdIncl(id).subscribe(data => {
        this.data = data;
        if (new Date(this.data.startDate).getTime() > Date.now()) {
          this.startDateLabel = "Start";
        } else {
          this.startDateLabel = "Begonnen";
        }

        if (new Date(this.data.endDate).getTime() > Date.now()) {
          this.endDateLabel = "Ende";
        } else {
          this.endDateLabel = "Beendet";
        }

      })

      this.teamsSvc.getAll().subscribe(data => this.availableTeams = data);
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Beendet mit: ${result}`;
      },
      reason => {
        this.closeResult = `abgewiesen ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "ESC drücken";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "auf den Hintergrund klicken";
    } else {
      return `mit: ${reason}`;
    }
  }

  private addTeam(team: any) {
    
    console.log(this.data);
    let data = {teamId: team.id, championshipId: this.id};
    this.champSvc.addTeam(data).subscribe(dataSvd => {
      console.log(dataSvd);
      console.log("Team gespeichert");
    });
  }
  private removeTeam(team: any) {
  }
}
