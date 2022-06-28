import { Component, OnInit, Input } from '@angular/core';
import { TranformationService } from '../services/tranformation.service';

@Component({
  selector: 'app-transformation-side-bar',
  templateUrl: './transformation-side-bar.component.html',
  styleUrls: ['./transformation-side-bar.component.css']
})
export class TransformationSideBarComponent implements OnInit {
  pipeInfo = null;
  saved = true;
  @Input() profile: any;
  @Input() superDomain: any;
  constructor(private pipes: TranformationService) {
    this.pipes.edited$.subscribe((info) => {
      this.pipeInfo = {};
      if (info) {
        this.pipeInfo = {...info};
      }
    });
  }

  ngOnInit() {}

  onChanged() {
    this.pipes.updateEdited(this.pipeInfo);
  }

  enableAddbtn(profile): boolean {
    if (profile) {
      if ( profile.admin ) {
        return true;
      } else {
        const roles = profile.roles;

        let i;
        if (roles) {
          i = roles.map((e) => e.domain_id).indexOf(this.superDomain);
        }
        if (i >= 0) {
          if (roles[i].role === 'domainAdmin') {
            return true;
          }
        }
      }
    }
    return false;
  }

}
