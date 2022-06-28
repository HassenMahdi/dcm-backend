import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from './../../../services/upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-tags',
  templateUrl: './upload-tags.component.html',
  styleUrls: ['./upload-tags.component.css']
})
export class UploadTagsComponent implements OnInit {
  @Input() metaData: any;
  @Output() tagsChanged: EventEmitter<any> = new EventEmitter<any>();
  selectedTags = [];
  tags: string[] = [];
  isLoading = false;
  constructor(private service: UploadService) { }

  ngOnInit() {
  }

  onTagsChanged(): void {
    setTimeout(() => {
      this.tagsChanged.emit(this.selectedTags);
    }, 1);
  }

  loadTags(event: any): void {
    if (event) {
      this.isLoading = true;
      this.service.getTags(this.metaData.domainId).subscribe((tags: string[]) => {
        this.isLoading = false;
        this.tags = tags;
      });
    }
  }

}
