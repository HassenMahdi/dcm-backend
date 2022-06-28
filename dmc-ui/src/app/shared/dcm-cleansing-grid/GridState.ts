import { take } from 'rxjs/operators';
import { CheckService } from '../services/check.service';
import { GAPIAllFilterParams, GAPIFilterComponenet, INDEX_HEADER, SELECTABLE_INDEX_HEADER } from '../utils/grid-api.utils';
import { DcmCleansingGridComponent } from './dcm-cleansing-grid.component';

export class Dataset
{
  file_id
  sheet_id
  folder
  result_id
}

export class GridParams
{
  filters = []
  sort = []
}

export class GridState {
  component: DcmCleansingGridComponent = null;
  selectionMode = 'multiple'

  defaultColDef:any = {
    editable: false,
    resizable: true,
    cellRenderer: 'autoTypeRenderer',
    filter: GAPIFilterComponenet('string'),
    filterParams: GAPIAllFilterParams(),
  }

  constructor(component: DcmCleansingGridComponent) {
    this.component = component;

    this.defaultColDef.cellClass = (params)=>{
        const f = params.colDef.field;
        const i = params.rowIndex;
    
        if (!this.component.results){
          return ""
        }
    
        if (!this.component.results[i])
        {
          return ""
        }
        
        if (!this.component.results[i][f])
        {
          return ""
        }
        
    
        const checks = this.component.results[i][f]
        if (checks.ERROR && checks.ERROR.length > 0 )
          return 'error-cell';
    
        if (checks.WARNING && checks.WARNING.length > 0 )
          return 'warning-cell';
    
        return ""
      }
  }

  public getFooterText() {return ""}
  public getToolbarButtons() { return []; }

  public OnBegin() { 
    this.component.selectionMode = this.selectionMode
    this.component.toolbarButtons$.next(this.getToolbarButtons())
    this.component.footerText$.next(this.getFooterText())
    this.component.headers$.pipe(take(1)).subscribe(prevColdDefs=>{
        const prevfileds = prevColdDefs.map(cd=>cd.colId).filter(cd=>cd!=INDEX_HEADER.colId)
        this.component.headers$.next(this.GetColDefs(prevfileds))
    })
  }

  public OnEnd() {}

  public GetColDefs(headers)
  {
    const colDefs = headers.map(h=>({
        field: h,
        colId: h,
        headerName: h,
        ...this.defaultColDef
    }))

    colDefs.unshift(INDEX_HEADER)

    return colDefs
  }
} 

export class DefaultGridState extends GridState {

    selectionMode = 'single'; 
  public getToolbarButtons() {
    return [
      { type:'button', icon: 'edit', text: 'Edit Cells', onClicked: () => { this.component.LoadState(EditCelldState); }, shape: 'default' },
      { type:'button', icon: 'delete-row', text: 'Delete Rows', onClicked: () => { this.component.LoadState(DeleteRowsState); }, shape: 'default' },
      { type:'button', icon: 'unordered-list', text: 'Select Rows', onClicked: () => { this.component.LoadState(SelectRowsState); }, shape: 'default' },
    ];
  }
}

class EditGridState extends GridState {
    checkService: CheckService = null

    constructor(component){
        super(component);
        this.checkService = this.component.injector.get<CheckService>(CheckService);
    }

    public getToolbarButtons() {
        return [
          { type:'button', icon: 'save', text: 'Save', onClicked: () => {this.SaveEdits()}, shape: 'default' },
          { type:'button', icon: 'close', text: 'Cancel', onClicked: () => { this.component.LoadState(DefaultGridState); }, shape: 'default' },
        ];
      }

    public SaveEdits()
    {
        const modifications = this.GetModifications();
        if (modifications.length > 0)
        {
            this.checkService.ApplyModificationAndRerun(this.component.result_id, modifications).subscribe(((result:any)=>{
                this.component.UpdateDataset(
                  result.folder, result.file_id, result.sheet_id, result.result_id)
                this.component.LoadState(DefaultGridState)
                this.component.Reload()
            }))
        }
        else {
            this.component.LoadState(DefaultGridState)
        }
    }

    public CancelEdits()
    {

    }

    public GetModifications()
    {
        return []
    }

    public getFooterText() {return "Edit Grid Base Class"}
}

class DeleteRowsState extends EditGridState {

    selectionMode = 'multiple'


  public GetColDefs(headers)
  {
    const colDefs = headers.map(h=>({
        field: h,
        colId: h,
        headerName: h,
        ...this.defaultColDef
    }))

    colDefs.unshift(SELECTABLE_INDEX_HEADER)

    return colDefs
  }

  public GetModifications() {
      const type = 'delete_rows'
      const rows = this.component.gridApi.getSelectedNodes().map(n=>n.rowIndex)
      return [{rows, type}]
  }

  public getFooterText() {return "Select Rows to Delete"}
}
class SelectRowsState extends EditGridState {
    selectionMode = 'multiple'

  public GetColDefs(headers)
  {
    const colDefs = headers.map(h=>({
        field: h,
        colId: h,
        headerName: h,
        ...this.defaultColDef
    }))
    colDefs.unshift(SELECTABLE_INDEX_HEADER)
    return colDefs
  }

  public GetModifications() {
    const type = 'select_rows'
    const rows = this.component.gridApi.getSelectedNodes().map(n=>n.rowIndex)
    return [{rows, type}]
}

public getFooterText() {return "Select Rows to Keep"}

}

class EditCelldState extends EditGridState {

    selectionMode = 'single'

    cellEdits = []

    public GetColDefs(headers)
    {
        const colDefs = headers.map(h=>({
            field: h,
            colId: h,
            headerName: h,
            ...this.defaultColDef,
            editable:true,
            onCellValueChanged: 
            (params)=>{
                this.OnCellValueChanged(params.newValue, params.oldValue, params.colDef.colId, params.node.rowIndex)
            }
        }))
        colDefs.unshift(INDEX_HEADER)
        return colDefs
    }

    public OnCellValueChanged(value, oldValue, column, row)
    {
        const type = 'edit_cell'
        
        this.cellEdits.push({
            value, oldValue, column, type, row
        })
    }

    public GetModifications()
    {
        return this.cellEdits
    }

    public CancelEdits()
    {
        // TODO
        // UNDO MODIFICATIONS
    }

    public getFooterText() {return "Edit Cells"}
}
