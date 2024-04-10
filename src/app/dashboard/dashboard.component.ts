import { Component } from '@angular/core';
import { DiettrackerService } from '../diettracker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private diettracker: DiettrackerService){}
  logout(){
    this.diettracker.logout();
  }
}
