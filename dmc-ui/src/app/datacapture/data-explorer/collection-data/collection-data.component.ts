import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ExplorerService } from '../services/explorer.service';

@Component({
  selector: 'app-collection-data',
  templateUrl: './collection-data.component.html',
  styleUrls: ['./collection-data.component.css']
})
export class CollectionDataComponent implements OnInit {
  collection$: any;

  constructor(public service: ExplorerService) {
    this.collection$ = this.service.collectionId$.pipe(map(id => (id)? {id}: null))
   }

  ngOnInit() {
  }

}
