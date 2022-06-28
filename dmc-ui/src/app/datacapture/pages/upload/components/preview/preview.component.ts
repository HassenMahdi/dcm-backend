import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { selectPreviewMode, selectPipeExpanded } from '../transformation/store/transformation.selectors';
import { selectSuperDomain } from '../../store/selectors/import.selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  previewMode$: Observable<'SOURCE' | 'TARGET'>;
  expanded$: Observable<boolean>;
  profile$: Observable<any>;
  superDomain$: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.previewMode$ = this.store.select(selectPreviewMode);
    this.expanded$ = this.store.select(selectPipeExpanded);
    this.profile$ = this.store.select(selectProfile);
    this.superDomain$ = this.store.select(selectSuperDomain);
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToImport(): void {
    this.router.navigate(['/datacapture/upload/import']);
  }


  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }

  onNext() {
    return this.goToMapping();
  }

}
