import { OnInit, OnDestroy, Directive } from '@angular/core';
import { TransformationHotKeysService } from '../../transformation/services/transformation-hot-keys.service';
import { TranformationService } from '../../transformation/services/tranformation.service';
import { shortcutString } from '@app/shared/utils/strings.utils';
import { TRANSFORMATIONS } from '../../transformation/transformations/transformers';


@Directive()
export class PreviewGridComponent implements OnInit, OnDestroy {
  gridApi: any;

  constructor(protected transformService: TranformationService, private hotkeys: TransformationHotKeysService) {}
  ngOnInit(): void {
    this.registerHotKey();
  }

  ngOnDestroy(): void {
    this.unregisterHotKey();
  }

  registerHotKey() {
    this.hotkeys.register([
      ...this.getViewModes(),
      ...this.getTransformationsMenu(),
      ...this.getExtraMenuItems(),
      ...this.getGridPredifinedItems()
    ]);
  }

  unregisterHotKey() {
    this.hotkeys.unregister();
  }

  addTransformer = (transformer, params) => {
    const rule = transformer.getRuleFromGrid(params);
    this.transformService.addTransformaion(rule);
  }

  getTransformationsMenu = () => {
    const that = this;
    return TRANSFORMATIONS.map(t => ({
      name: t.label,
      tooltip: t.description,
      action: () => {
        that.addTransformer(t, this.gridApi);
      },
      shortcut: shortcutString(t.shortcut),
      key: t.shortcut,
      icon: t.icon,
    }));
  }

  getGridPredifinedItems() {
    const HKcopy = 'control.c';
    return [
      {
        name: 'Copy',
        tooltip: 'Copy Selected Range',
        action: null,
        shortcut: shortcutString(HKcopy),
        key: HKcopy,
        icon: 'copy',
        alwaysShow: true
      }
    ];
  }

  getExtraMenuItems = (params?) => {
    const that = this;
    const HKSave = 'control.s';
    const HKSaveNew = 'control.shift.s';
    const HLFlip = 'alt.e';
    const HDesc = 'alt.d';
    return [
      {
        name: 'Save',
        tooltip: 'Save and Apply pipe modification',
        action: () => that.transformService.saveEdited(),
        shortcut: shortcutString(HKSave),
        key: HKSave,
        icon: 'save',
        alwaysShow: true
      },
      {
        name: 'Save As New',
        tooltip: 'Save and Apply a new pipe modification',
        action: () => that.transformService.saveEdited(true),
        shortcut: shortcutString(HKSaveNew),
        key: HKSaveNew,
        icon: 'saveAs',
        alwaysShow: true
      },
      {
        name: 'Fold/Unfold Menu',
        tooltip: 'Fold or Unfold Pipe Menu',
        action: () => that.transformService.flipCollapse(),
        shortcut: shortcutString(HLFlip),
        key: HLFlip,
        icon: 'menu-fold',
        alwaysShow: true
      },
      {
        name: 'View Description',
        tooltip: 'View the header\'s description',
        action: () => that.transformService.viewDescription(params),
        shortcut: shortcutString(HDesc),
        key: HDesc,
        icon: 'solution',
        alwaysShow: true
      }
    ];
  }

  getContextMenuItems = (params) => {
  return this.getMainContextMenuItems(params);
}

getMainContextMenuItems = (params) => {
  const result = [
    {
      name: 'Add Transformation',
      subMenu: this.getTransformationsMenu().map(e => ({...e, icon: null}))
    },
    {
      name: 'View Mode',
      subMenu: this.getViewModes().map(e => ({...e, icon: null}))
    },
    ...this.getExtraMenuItems(params).map(e => ({...e, icon: null})),
    // 'separator',
    // {
    //   name: 'Dataset Configuration',
    //   subMenu: this.headerSelectionMenu(),
    // },
    'separator',
    'copy',
    'copyWithHeaders',
    'autoSizeAll',
    // 'export'
  ];
  return result;
  }

  headerSelectionMenu() {
    const that = this;
    return [
    {
      name: 'Selected Row As Header',
      action: (params) => {
        that.transformService.selectHeader(that.gridApi.api);
      },
    },
    {
      name: 'Clear Range Limits',
      action: (params) => {
        that.transformService.clearRangeSelection();
      },
    }];
  }

  getViewModes() {
    const that = this;
    const HLTarget = 'alt.t';
    const HLSource = 'alt.s';
    return [
      {
        name: 'Source',
        tooltip: 'View Source',
        action: () => that.transformService.upadatePreviewMode('SOURCE'),
        shortcut: shortcutString(HLSource),
        key: HLSource,
        icon: 'file',
      },
      {
        name: 'Target',
        tooltip: 'View Target',
        action: () => that.transformService.upadatePreviewMode('TARGET'),
        shortcut: shortcutString(HLTarget),
        key: HLTarget,
        icon: 'thunderbolt',
      }
    ];
  }

}
