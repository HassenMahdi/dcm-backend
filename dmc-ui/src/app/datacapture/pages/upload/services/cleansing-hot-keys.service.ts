import { Injectable, Inject } from '@angular/core';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class CleansingHotKeysService extends Hotkeys {

  constructor(private _eventManager: EventManager, @Inject(DOCUMENT) private _document: Document, private msg: NzModalService) {
    super(_eventManager, _document);
  }
}
