import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  stats=[
    {title:'Total Records', value:"20K", theme:"primary"},
    {title:'Total Domain', value:"423", theme:"success"},
    {title:'Total Files', value:"20K", theme:"danger"},
    {title:'Storage Used', value:"6GB", theme:"secondary"},
  ]

}
