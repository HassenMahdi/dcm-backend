import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { TRANSFORMATIONS } from '../../transformations/transformers';
import { shortcutString } from '@app/shared/utils/strings.utils';
import { TransformationHotKeysService } from '../../services/transformation-hot-keys.service';

@Component({
  selector: 'app-transformation-preview-help',
  templateUrl: './transformation-preview-help.component.html',
  styleUrls: ['./transformation-preview-help.component.css']
})
export class TransformationPreviewHelpComponent implements OnInit {

  shortcuts

  @ViewChild('modalFooter',{static:true}) public modalFooter: TemplateRef<any>;
  @ViewChild('modalTitle',{static:true}) public modalTitle: TemplateRef<any>;

  constructor(private modalrRef: NzModalRef) { }

  ngOnInit() {
    this.modalrRef['nzTitle'] = null
    this.modalrRef['nzFooter'] = null
  }


}
