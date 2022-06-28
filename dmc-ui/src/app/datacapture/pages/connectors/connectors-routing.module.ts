import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectorsComponent } from './containers/connectors/connectors.component';

const routes: Routes = [{
  path:'',
  component: ConnectorsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectorsRoutingModule { }
