import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ExplorerService } from '../services/explorer.service';

@Component({
  selector: 'app-upload-flow',
  templateUrl: './upload-flow.component.html',
  styleUrls: ['./upload-flow.component.css']
})
export class UploadFlowComponent implements OnInit {
  collection$: any;

  constructor(public service: ExplorerService) {
    this.collection$ = this.service.collectionId$.pipe(map(id => (id)? {id}: null))
   }

  ngOnInit() {
  }

}
