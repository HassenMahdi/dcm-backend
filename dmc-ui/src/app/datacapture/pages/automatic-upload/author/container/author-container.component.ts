import { Component } from "@angular/core";
import { AppState, NotificationService } from "@app/core";
import { Store } from "@ngrx/store";
import { PipelineMetadata } from "../../pipeline/models/metadata.model";
import { PipelineEdit, PipelineReset } from "../../pipeline/store/pipeline.actions";
import { AuthorService } from "../service/author.service";

@Component({
    selector: 'app-author-container',
    templateUrl: './author-container.component.html',
    styleUrls: ['./author-container.component.css']
})
export class AuthorContainer {
    pipelines:any = [];
    searchPipeline = "";
    constructor(private service: AuthorService,
                private not: NotificationService,
                private store: Store<AppState>) {
        this.getData();
    }

    getData() {
        const loader = this.not.loading('Loading pipelines...');
        this.service.getAll().subscribe((pipelines) => {
            this.pipelines = pipelines;
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }

    addPipeline() {
        this.store.dispatch(new PipelineReset());
    }

    deletePipeline(id) {
        this.service.delete(id).subscribe((res) => {
            this.not.success('The pipeline was deleted successfully');
            this.getData();
        })
    }

    editPipeline(pipeline) {
        const meta: PipelineMetadata = {
            pipeline_id: pipeline.id,
            name: pipeline.name,
            description: pipeline.description
        };
        this.store.dispatch(new PipelineEdit(meta));
    }
}