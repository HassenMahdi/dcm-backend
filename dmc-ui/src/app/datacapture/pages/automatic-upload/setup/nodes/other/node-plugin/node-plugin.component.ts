import { PluginService } from './../../../../../admin/services/plugin.service';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-node-plugin',
  templateUrl: './node-plugin.component.html',
  styleUrls: ['./node-plugin.component.css']
})
export class NodePluginComponent extends PipelineNodeComponent {

  isLoading = false;

  domains$: Observable<any>;
  plugins$: Observable<any>;

  constructor(private superDomainService: SuperDomainService,
    private pluginService: PluginService,
    private not: NotificationService) {
    super();
    this.domains$ = this.superDomainService.get()
  }

  ngOnInit() {
    if (this.data.domain_id) this.selectDomain(this.data.domain_id)
  }

  save() {
    this.onSave.emit(this.data)
  }

  selectDomain(domain) {
    console.log('domain', domain);
    this.data.domain_id = domain;
    this.plugins$ = this.pluginService.getAll(domain)
    if (!domain) {
      this.data.plugin_id = null
      this.plugins$ = of([])
    }
  }

  selectPlugin(plugin) {
    this.data.plugin_id = plugin
  }

}

