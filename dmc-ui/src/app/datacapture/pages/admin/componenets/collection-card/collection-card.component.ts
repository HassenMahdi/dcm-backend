import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectionEditor } from '../../services/collection-editor.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {

  @Input() data;
  @Input() loading;
  @Input() class;
  small;

  @Output() edited = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<boolean>();
  @Output() copied = new EventEmitter<boolean>();

  constructor(private editor: CollectionEditor, public s: StoreService) {
    s.displaySize$.subscribe((size) => this.small = (size === 'small'));
  }

  ngOnInit() {
  }

  onEdit() {
    this.editor.openConfig(this.data, this.data.super_domain_id).subscribe(() => {
      this.edited.emit(true);
    });
  }

  onCopy() {
    this.editor.showCopyConfirm(this.data).subscribe(() => {
      this.copied.emit(true);
    });
  }

  onDelete() {
    this.editor.showDeleteConfirm(this.data).subscribe(() => {
      this.deleted.emit(true);
    });
  }
}
