import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { ToMap } from '@app/shared/utils/arrays.utils';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CONNECTOR_TYPES } from '../../models/connectors.model';
import { ConnectorsUtilsService } from '../../services/connectors-utils.service';
import { ConnectorsService } from '../../services/connectors.service';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {

  constructor(
    private service:ConnectorsService,
    public utils: ConnectorsUtilsService,
    public not: NotificationService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    const loader = this.not.loading('Loading connectors...');
    this.list$ = this.service.getAll().pipe(take(1), tap({
      next: x => { this.not.close(loader); },
      error: err => { this.not.close(loader); },
    }))
  }
  
  searchTerm = ''

  list$ 

  addConnector(){
    this.utils.addConnector().subscribe(()=>{
      this.loadData()
    })
  }

  editConnector(conn){
    this.utils.editConnector(conn).subscribe(()=>{
      this.loadData()
    })
  }

  deleteConnector(conn){
    this.utils.tryToDelete(conn).subscribe(()=>{
      this.loadData()
    })
  }

  types = ToMap(CONNECTOR_TYPES, (e)=>e.type, (e)=>e)
}
