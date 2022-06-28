import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { DashboardService } from '../service/dashboard.service';
import { ActionSavePage} from '../store/actions/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardComponent implements OnInit {
  selectedDomain: any;
  domains: any[];
  keys = Object.keys;
  constructor(private service: DashboardService,
              private store: Store<AppState>) {
    this.domains = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: any): void {
    this.store.dispatch(new ActionSavePage(1));
    this.selectedDomain = {id: event.identifier, name: event.name};
  }

}
