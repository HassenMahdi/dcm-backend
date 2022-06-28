import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-display-changer',
  templateUrl: './display-changer.component.html',
  styleUrls: ['./display-changer.component.css']
})
export class DisplayChangerComponent implements OnInit {

  s = null
  constructor(private service: StoreService) { 
    this.s = this.service
  }

  ngOnInit() {
  }

}
