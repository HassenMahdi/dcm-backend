import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState, selectRouterState } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSettingsService } from '@app/datacapture/settings/app-settings.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  // variable used for stepper
  pageList: string[];
  // Store Router State
  router$: Observable<any>;

  navType$
  navClass$

  constructor(private notification: NotificationService, private store: Store<AppState>, private setting: AppSettingsService) {
    this.router$ = this.store.select(selectRouterState);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        // this.notification.error(error.message);
      }
    });

    this.navType$ = this.setting.appSize$
    // this.navClass$ = this.setting.appSize$.pipe(map((size)=> (size=='compact')? 'p-2':''))
  }

  ngOnInit() {
  }

  onStepChangeStatus(step: string): string {
    try {
      switch (step) {
        case 'import': {
          if ( this.pageList.length > 0 ) {
            if (this.pageList.includes('import')) {
              return 'process';
            }
            if (this.pageList.includes('transform') ||
                this.pageList.includes('mapping') ||
                this.pageList.includes('cleansing') ||
                this.pageList.includes('uploading')) {
              return 'finish';
            }
          }
          break;
        }
        case 'transform': {
          if ( this.pageList.length > 0 ) {
            if (this.pageList.includes('transform')) {
              return 'process';
            }
            if (this.pageList.includes('mapping') ||
                this.pageList.includes('cleansing') ||
                this.pageList.includes('uploading')) {
              return 'finish';
            }
            if (this.pageList.includes('import')) {
              return 'wait';
            }
          }
          break;
        }
        case 'mapping': {
          if ( this.pageList.length > 0 ) {
            if (this.pageList.includes('mapping')) {
              return 'process';
            }
            if (this.pageList.includes('cleansing') ||
                this.pageList.includes('uploading')) {
              return 'finish';
            }
            if (this.pageList.includes('import') || this.pageList.includes('transform')) {
              return 'wait';
            }
          }
          break;
        }
        case 'cleansing': {
          if ( this.pageList.length > 0 ) {
            if (this.pageList.includes('cleansing')) {
              return 'process';
            }
            if (this.pageList.includes('uploading')) {
              return 'finish';
            }
            if (this.pageList.includes('import') || this.pageList.includes('transform') || this.pageList.includes('mapping')) {
              return 'wait';
            }
          }
          break;
        }
        case 'uploading': {
          if ( this.pageList.length > 0 ) {
            if (this.pageList.includes('uploading')) {
              return 'process';
            }
            if (this.pageList.includes('import') || this.pageList.includes('transform') ||
                this.pageList.includes('mapping') || this.pageList.includes('cleansing')) {
              return 'wait';
            }
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      // this.notification.error(error.message);
    }
  }

  getStepIndex(): number {
    try {
      if (this.pageList.length > 0) {
        if (this.pageList.includes('import')) {
          return 0;
        }
        if (this.pageList.includes('transform')) {
          return 1;
        }
        if (this.pageList.includes('mapping')) {
          return 2;
        }
        if (this.pageList.includes('cleansing')) {
          return 3;
        }
        if (this.pageList.includes('uploading')) {
          return 4;
        }
      }
    } catch (error) {
      // this.notification.error(error.message);
    }
  }
}
