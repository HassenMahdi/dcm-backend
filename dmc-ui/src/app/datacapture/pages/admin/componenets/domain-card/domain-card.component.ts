import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuperDomain } from '../../models/super-domain';
import { StoreService } from '../../services/store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-domain-card',
  templateUrl: './domain-card.component.html',
  styleUrls: ['./domain-card.component.css']
})
export class DomainCardComponent implements OnInit {

  small = false 

  constructor(public s : StoreService) { 
    s.displaySize$.subscribe((size)=> this.small = (size == 'small'))
  }

  @Input() data: SuperDomain
  @Input() loading: boolean
  @Input() class = ''

  @Output() collections = new EventEmitter<any>()
  @Output() edit = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()
  @Output() createChildDomain = new EventEmitter<any>()


  ngOnInit() {
  }

  getAvatar(d:any){
    return (d.name || ' ')[0]
  }
}
