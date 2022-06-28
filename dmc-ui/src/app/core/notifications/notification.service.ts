import { Injectable, NgZone } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: NzNotificationService,
    private notfication: NzMessageService,
    public zone: NgZone
  ) {
  }

  default(message: string) {
    this.show(message, 'DEFAULT', {
      nzDuration: 2000,
      nzAnimate: true,
      nzPlacement: 'topRight'
    });
  }

  close(id: any) {
    this.notfication.remove(id);
  }

  loading(message: string) {
    return this.show(message, 'LOADING', {
      nzDuration: 0,
      nzAnimate: true,
      nzPlacement: 'topRight'
    });
  }

  success(message: string, title?: string) {
    this.show(message, 'SUCCESS', {
      nzDuration: 2000,
      nzAnimate: true,
      nzPlacement: 'topRight'
    }, title);
  }

  warn(message: string, duration?: number) {
    if (!duration) { duration = 2500; }
    this.show(message, 'WARNING', {
      nzDuration: duration,
      nzAnimate: true,
      nzPlacement: 'topRight'
    });
  }

  error(message: string) {
    this.show(message, 'ERROR', {
      nzDuration: 4500,
      nzAnimate: true,
      nzPlacement: 'topRight'
    });
  }

  private show(message: string, type: string, configuration: any, title?: string) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    const finalConfig: any = {...configuration, nzPauseOnHover: true};
    this.zone.run(() => {
      switch (type) {
        case 'ERROR': {
          this.snackBar.error('Error', message, finalConfig);
          break;
        }
        case 'SUCCESS': {
          this.snackBar.success(title || 'Success', message, finalConfig);
          break;
        }
        case 'WARNING': {
          this.snackBar.warning('Warning', message, finalConfig);
          break;
        }
        case 'DEFAULT': {
          this.snackBar.info('Information', message, finalConfig);
          break;
        }
        case 'LOADING': {
          return this.notfication.loading(message, finalConfig);
        }
        default:
          break;
      }
    });
  }
}
