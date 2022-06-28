import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ReferenceService } from '../../componenets/references/reference.service';
import { SuperDomainService } from '../../services/super-domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-share-with-collections',
  templateUrl: './share-with-collections.component.html',
  styleUrls: ['./share-with-collections.component.css']
})
export class ShareWithCollectionsComponent extends EntityModal implements OnInit {

  data
  searchValue

  constructor(private domains:SuperDomainService, modalrRef: NzModalRef, private service: ReferenceService) {
    super(modalrRef);
  }

  ngOnInit() {
    super.ngOnInit()

    this.domains.getHierarchy().subscribe((hierarchy:any[])=>{
      this.defaultCheckedKeys = this.data.domain_ids
      this.nodes = hierarchy.map(domain=>({
        title: domain.name,
        key: domain.id,
        expanded: true,
        icon: 'folder',
        selectable: false,
        checkable: false,
        children: domain.domains.map(collection=>({
          title: collection.name,
          key: collection.id,
          isleaf: true,
          icon: 'block',
          checkable: true,
          selectable: false,
        }))
      }))
    })
  }

  defaultCheckedKeys = [];

  nodes:any[] = [];

  nzEvent(event): void {
    const checkedKeys = []
    for (const node of event.checkedKeys) {
      if (node._children.length){
        for (const child of node._children){
          checkedKeys.push(child.key)
        }
      }else{
        checkedKeys.push(node.key)
      }
    }
    this.defaultCheckedKeys = checkedKeys;
  }

  save(){
    this.service.shareReferenceType(this.data.id, this.defaultCheckedKeys).subscribe(
      res=>{
        this.modalrRef.close(this.defaultCheckedKeys)
      }
    )
  }
}
