import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';

@Component({
  selector: 'app-collection-import',
  templateUrl: './collection-import.component.html',
  styleUrls: ['./collection-import.component.css']
})
export class CollectionImportComponent extends PipelineNodeComponent {
  keys = Object.keys;
  domains = [];
  domain;
  constructor(private service: FileImportService) {
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

}
