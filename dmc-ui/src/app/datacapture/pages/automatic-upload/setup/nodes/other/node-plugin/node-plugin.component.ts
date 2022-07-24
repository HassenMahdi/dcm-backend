import { PluginService } from './../../../../../admin/services/plugin.service';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { Observable, of } from 'rxjs';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';


@Component({
  selector: 'app-node-plugin',
  templateUrl: './node-plugin.component.html',
  styleUrls: ['./node-plugin.component.css']
})
export class NodePluginComponent extends PipelineNodeComponent {

  isLoading = false;

  domains$: Observable<any>;
  plugins$: Observable<any>;

  keys = Object.keys;
  domains = [];
  domain;

  constructor(private superDomainService: SuperDomainService,
    private pluginService: PluginService,
    private not: NotificationService,
    private service: FileImportService) {
    super();
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
      this.fetchDomainData();
    });
    // this.domains$ = this.superDomainService.get()
  }

  ngOnInit() {
    if (this.data.domain_id) this.selectDomain(this.data.domain_id)
  }

  save() {
    this.onSave.emit(this.data)
  }

  selectDomain(domain) {
    console.log('domain', domain);
    this.data.domain_id = domain.identifier;
    this.plugins$ = this.pluginService.getAll(domain.identifier)
    if (!domain) {
      this.data.plugin_id = null
      this.plugins$ = of([])
    }
  }

  selectPlugin(plugin) {
    this.data.plugin_id = plugin
  }


  fetchDomainData() {
    if (this.data.domain_id) {
      const domainList = Object.keys(this.domains);
      for (var i = 0; i < domainList.length; i++) {
        const collection = this.domains[domainList[i]];
        for (var j = 0; j < collection.length; j++) {
          if (collection[j].identifier === this.data.domain_id) {
            this.domain = collection[j];
            return;
          }
        };
      }
    }
  }

}

