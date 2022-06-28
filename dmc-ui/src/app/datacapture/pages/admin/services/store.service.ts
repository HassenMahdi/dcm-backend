import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectProfile } from '@app/core';
import { selectDisplayList, selectDisplaySize } from '../store/admin.selectors';
import { AdminChangeDisplayType, AdminChangeDisplaySize } from '../store/admin.actions';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  displayList$;
  displaySize$;
  constructor(private store: Store<AppState>) {
    this.displayList$ = this.store.select(selectDisplayList);
    this.displaySize$ = this.store.select(selectDisplaySize);
  }

  changeDisplayList = (type) => this.store.dispatch(new AdminChangeDisplayType(type));
  changeDisplaySize = (size) => this.store.dispatch(new AdminChangeDisplaySize(size));
  getProfile = () => this.store.pipe(select(selectProfile), take(1));
}
