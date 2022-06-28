import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import { INDEX_NAME, GAPIGridSelectionOverride } from '../utils/grid-api.utils';
import { TagsCellRendererComponent } from '../tags-cell-renderer/tags-cell-renderer.component';
import { GridCellAutoTypeComponent } from '../grid-cell-auto-type/grid-cell-auto-type.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input() columnDefs:any;
  @Input() totalRecords;
  @Input() rowData: [];
  @Input() defaultColDef;
  @Input() paginationPageSize = 50;
  @Input() contextMenu = null;
  @Input() mainContextMenu = null;
  @Input() rangeSelection = false;
  @Input() floatingFilter = true;
  @Input() rowSelection = false;

  @Input() gridOptions = {
    onRangeSelectionChanged: GAPIGridSelectionOverride,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      editable: true,
      suppressAndOrCondition: true
    }
  };
  // @Input() fillOperation: (args: any) => void;

  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellValueChanged: EventEmitter<any> = new EventEmitter<any>();

  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllEnterpriseModules;
  public frameworkComponents = {
    customTooltip: CustomTooltipComponent,
    tagsRenderer: TagsCellRendererComponent,
    autoTypeRenderer: GridCellAutoTypeComponent
  };

  gridApi = null

  ngOnInit() {
  }

  constructor() {
    this.rowData = [];
  }

  onGridReady(params) {
    // REMOVE TOOLTIP DELAY
    try {
      (params.api as any).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 500;
    } catch (e) {
      // console.error(e);
    }
    this.gridApi = params.api
    this.gridReady.emit(params);
  }

}
