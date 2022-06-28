import { shortcutString } from "../utils/strings.utils"

export class HotKey{
  name: string;
  tooltip: string;
  action: any;
  shortcut: string;
  key: string;
  icon: string;
  alwaysShow:boolean = false;

  constructor(hotkey: Partial<HotKey> = {} ) {
      this.shortcut = shortcutString(this.key);
  }

  setAction(func) {
    this.action = func;
    return this;
  }

}

export class HKPaste extends HotKey {
  name = 'paste';
  tooltip = 'paste';
  key = 'control.v';
  icon = 'paste';
  alwaysShow = true;

  constructor(hotkey: Partial<HotKey> = {} ) {
      super(hotkey);
  }
}

export class HKViewSource extends HotKey {
  name = 'Source';
  tooltip = 'View Source';
  key = 'alt.s';
  icon = 'file';

  constructor(hotkey: Partial<HotKey> = {} ) {
      super(hotkey);
  }
}

export class HKViewTarget extends HotKey {
    name = 'Target';
    tooltip = 'View Source';
    key = 'alt.t';
    icon = 'thunderbolt';

    constructor(hotkey: Partial<HotKey> = {} ) {
        super(hotkey);
    }
}
