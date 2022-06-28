import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treeFilter'
})
export class TreePipe implements PipeTransform {

  transform(tree, value: any,): any {
    const result = this.filterBranches(tree, value)
    return result
  }

  filterBranches(branches, value){
    if (value && branches){
      let filtered = [];
      for (let branch of branches){
        const found = this.filterOneTree(branch, value);
        if (found) { 
          filtered.push(found) 
        }
      }
      return filtered;
    } else {
      return branches;
    }
  }

  filterOneTree(branch, value: string){
    if (String(branch.title).toLowerCase().match(String(value).toLowerCase())){
      return branch;
    } else if (branch.children) {
      const children = this.filterBranches(branch.children, value)
      if (children && children.length){
        return {...branch, children}
      }
    }
    
    return null;
    
  }
}
