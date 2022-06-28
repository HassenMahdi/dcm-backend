import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { TranformationService } from '../components/transformation/services/tranformation.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PipeChangesAlertComponent } from '../components/preview/pipe-changes-alert/pipe-changes-alert.component';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class DeactivateUploadGuard<T> implements CanDeactivate<T> {

  constructor(private pipe: TranformationService, private modal: NzModalService) {}

  canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {

    switch (currentRoute.data.route) {
        case 'TRANSFORM': {
          return new Observable<boolean>((obesever) => {
            this.pipe.modified$.pipe(take(1)).subscribe(modified => {
              if (!modified) {
                return obesever.next(true);
              }
              const modal = this.modal.create({nzContent: PipeChangesAlertComponent , nzClosable: false, nzCloseIcon: null});
              modal.afterClose.pipe(take(1)).subscribe((action) => {
                if (action === 'continue') {
                  return obesever.next(true);
                } else {
                  return obesever.next(false);
                }
              });
            });
          });
        }
        default:
          return true;
    }
  }
}
