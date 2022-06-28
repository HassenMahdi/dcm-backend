import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-env-tag',
  templateUrl: './env-tag.component.html',
  styleUrls: ['./env-tag.component.css']
})
export class EnvTagComponent implements OnInit {

  constructor() { }
  env = null
  version = null
  color = null

  ngOnInit() {
    const env = String(environment.env).toUpperCase()
    this.version = environment.version
    this.env = this.getText(env)
    this.color = this.getColor(env)
  }

  getColor(env){
    switch(env){
      case 'TST': return '#87d068'
      case 'PRD': return '#108ee9'
      case 'DEV': return '#2db7f5'
      default: return '#f50'
    }
  }

  getText(env){
    switch(env){
      case 'TST': return 'TST'
      case 'PRD': return 'PRD'
      case 'DEV': return 'DEV'
      default: env
    }
  }
}
