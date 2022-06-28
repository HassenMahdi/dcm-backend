import { Component, Input, OnInit } from '@angular/core';
import { DataCheckFactory, DATE_DEAFULT_CHECKS, DEFAULT_CHECKS, DOUBLE_DEAFULT_CHECKS, INT_DEAFULT_CHECKS, STRING_DEAFULT_CHECKS, TYPE_CHECK } from '../../../models/datachecks.model';

@Component({
  selector: 'app-default-checks',
  templateUrl: './default-checks.component.html',
  styleUrls: ['./default-checks.component.css']
})
export class DefaultChecksComponent implements OnInit {

  @Input() set type(value){
    this.displayed_check = DataCheckFactory.getChecksByType(value)
  }

  @Input() model = {}

  displayed_check = DEFAULT_CHECKS

  selected_checks = []

  constructor() { }

  ngOnInit() {
  }
}
