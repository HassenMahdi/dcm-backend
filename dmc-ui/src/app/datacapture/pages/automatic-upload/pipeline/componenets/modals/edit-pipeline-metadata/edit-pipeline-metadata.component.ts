import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@app/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { PipelineMetadata } from '../../../models/metadata.model';

@Component({
  selector: 'app-edit-pipeline-metadata',
  templateUrl: './edit-pipeline-metadata.component.html',
  styleUrls: ['./edit-pipeline-metadata.component.css']
})
export class EditPipelineMetadataComponent implements OnInit {
  metaData: PipelineMetadata;
  validateForm: FormGroup;
  constructor(private fb: FormBuilder, private drawerRef: NzDrawerRef<string>) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.metaData ? this.metaData.name : null, [Validators.required]],
      description: [this.metaData ? this.metaData.description : null, [Validators.required]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if ( this.validateForm.valid) {
      this.metaData.name = this.validateForm.controls.name.value;
      this.metaData.description = this.validateForm.controls.description.value;
      this.drawerRef.close(this.metaData);
    }
  }

  cancel(): void {
    this.drawerRef.close();
  }

}
