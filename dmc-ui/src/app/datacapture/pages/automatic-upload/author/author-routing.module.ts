import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorContainer } from './container/author-container.component';

const routes: Routes = [
  {
      path: '',
      component: AuthorContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {}
