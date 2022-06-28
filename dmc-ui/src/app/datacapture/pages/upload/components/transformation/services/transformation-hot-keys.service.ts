import { Injectable, Inject } from '@angular/core';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { TransformationPreviewHelpComponent } from '../modals/transformation-preview-help/transformation-preview-help.component';
import { take, withLatestFrom } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformationHotKeysService  extends Hotkeys {
  helpModal = null;
  helpModalDelay = null;
  release$: any;
  press$: any;
  helpHotkey = 'alt.h';
  helpHoldTime = 0;
  closeListener$: any;


  constructor(private _eventManager: EventManager,
              @Inject(DOCUMENT) private _document: Document, private msg: NzModalService) {
    super(_eventManager, _document);
   }

   openHelpModal() {
    if (!this.helpModal && !this.helpModalDelay) {
      this.helpModalDelay = interval(this.helpHoldTime).pipe(take(1), withLatestFrom(this.registeredHostkeys$))
        .subscribe(([timeout , registered]) => {
        this.helpModal = this.msg.create({
          nzContent: TransformationPreviewHelpComponent,
          nzWidth: 'fit-content',
          nzComponentParams: {
            shortcuts: registered
          },
          nzClosable: false,
          nzWrapClassName: 'modal-bottom-left'
        });
        const modal = this.helpModal;
        const modalClose = this.addShortcut({keys: null}).subscribe((e) => {modal.close(); modalClose.unsubscribe(); });
        modal.nzAfterClose.subscribe(() => this.afterHelpModalClosed());
      });
    }
  }

  closeHelpModal() {
    if (this.helpModalDelay) { this.helpModalDelay.unsubscribe(); }
    if (this.closeListener$) { this.closeListener$.unsubscribe(); }
    if (this.helpModal) {      this.helpModal.close(); }
    this.afterHelpModalClosed();
  }

  afterHelpModalClosed() {
    this.helpModal = null;
    this.closeListener$ = null;
    this.helpModalDelay = null;
  }

  register(toRegister = []) {
    this.press$ = this.addShortcut({ keys: this.helpHotkey }).subscribe(() => {
      this.openHelpModal();
    });

    if (this.helpHoldTime) {
      this.release$ = this.addShortcut({ keys: this.helpHotkey }, 'keyup').subscribe(() => {
          this.closeHelpModal();
        });

      }

    super.register(toRegister);
  }

  unregister() {
    this.closeHelpModal();
    if (this.press$) { this.press$.unsubscribe(); }
    if (this.release$) { this.release$.unsubscribe(); }
    super.unregister();
  }
}
