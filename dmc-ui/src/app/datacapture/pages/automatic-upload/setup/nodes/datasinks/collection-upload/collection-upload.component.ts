import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { PreviousMappingsComponent } from '@app/datacapture/pages/upload/components/mapping/previous-mappings/previous-mappings.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { MappingService } from '@app/datacapture/pages/upload/services/mapping.service';
import { UploadService } from '@app/datacapture/pages/upload/services/upload.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-collection-upload',
  templateUrl: './collection-upload.component.html',
  styleUrls: ['./collection-upload.component.css']
})
export class CollectionUploadComponent extends PipelineNodeComponent {
  keys = Object.keys;
  domains = [];
  domain: any;
  mapping: any;
  isLoading = false;
  tags = [];
  constructor(private service: FileImportService,
              private upload: UploadService,
              private mappingS: MappingService,
              private modalService: NzModalService,
              private not: NotificationService) {
    super();
    
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
      this.fetchDomainData();
    });
  }

  save() {
    this.onSave.emit(this.data)
  }

  selectDomain(domain) {
    this.data.domain_id = domain.identifier;
    this.domain = domain;

    this.data.label = domain.name
  }

  fetchDomainData() {
    if (this.data.domain_id) {
      const domainList = Object.keys(this.domains);
      for(var i =0; i < domainList.length; i++) {
        const collection = this.domains[domainList[i]];
        for(var j=0; j < collection.length; j++) {
          if (collection[j].identifier === this.data.domain_id) {
            this.domain = collection[j];
            return;
          }
        };
      }
    }
  }

  loadTags(event: any): void {
    if (this.data.domain_id) {
      if (event) {
        this.isLoading = true;
        this.upload.getTags(this.data.domain_id).subscribe((tags: string[]) => {
          this.isLoading = false;
          this.tags = tags;
        });
      }
    } else {
      this.not.error('Please select a collection first.')
    }
  }

  getPreviousMappings() {
    if (this.data.domain_id) {
      this.mappingS.getPreviouslyMappings(this.data.domain_id).subscribe((mappings: any[]) => {
        const modal: NzModalRef = this.modalService.create({
          nzTitle: 'Previously Saved Mappings',
          nzClosable: false,
          nzWrapClassName: 'vertical-center-modal',
          nzWidth: 'xXL',
          nzContent: PreviousMappingsComponent,
          nzOkText: null,
          nzComponentParams: {
            mappings,
            domain: this.data.domain_id
          },
        });
        modal.afterClose.subscribe((map) => {
          if (map && map.version) {
            this.mapping = map;
            this.data.mapping_id = map.version;
            this.data.mapping_name = map.name;
            this.not.success('The mapping was applied successfully.');
          }
        });
      });
    } else {
      this.not.error('Please select a collection first.')
    }
  } 
}
