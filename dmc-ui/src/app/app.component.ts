import browser from 'browser-detect';
import { Component, Injector, OnInit } from '@angular/core';
import { routeAnimations,LocalStorageService, AppState, NotificationService} from '@app/core';
import { Store } from '@ngrx/store';
import { LoginService } from './core/login/service/login.service';
import { ServiceLocator } from './shared/utils/injector.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent{
  isCollapsed = false;
  constructor(private storageService: LocalStorageService,
              private store: Store<AppState>,
              private service: LoginService,
              private not: NotificationService,
              private injector: Injector
              ){    // Create global Service Injector.
                ServiceLocator.injector = this.injector;
            }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
}


