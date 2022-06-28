import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '@app/core';
import { ArrayLast } from '@app/shared/utils/arrays.utils';
import { NzModalRef } from 'ng-zorro-antd';
import { MappingService } from '../../../services/mapping.service';

@Component({
  selector: 'app-previous-mappings',
  templateUrl: './previous-mappings.component.html',
  styleUrls: ['./previous-mappings.component.css']
})
export class PreviousMappingsComponent implements OnInit {
  @Input() mappings: any[];
  @Input() domain: string;
  @Input() mappingId: string;
  @Input() selectedVersion: string;
  constructor(private modal: NzModalRef, private service: MappingService, private notification: NotificationService) {}

  ngOnInit(): void {}

  apply(item: any): void {
    item.version = this.selectedVersion;
    this.modal.close(item);
  }

  checkVersion(item: any): boolean {
    return item.versions.map((e) => e.id).includes(this.selectedVersion);
  }

  deleteMapping(id: any): void {
    this.service.deleteMappingById(id).subscribe((res) => {
      this.refresh();
      this.notification.success('The mapping was deleted successfully');
    });
  }

  refresh() {
    this.service.getPreviouslyMappings(this.domain).subscribe((res: any[]) => {
      this.mappings = res;
    });
  }

  applyLatest(mapping){
    this.selectedVersion = ArrayLast(mapping.versions).id
    this.apply(mapping)
  }
}
