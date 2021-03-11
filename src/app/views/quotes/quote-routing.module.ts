import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteCreateComponent } from './quote-create/quote-create.component';
import { QuoteEditComponent } from './quote-edit/quote-edit.component';
import { QuoteListComponent } from './quote-list/quote-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteListComponent,
  },
  {
    path: 'create',
    component: QuoteCreateComponent,
  },
  {
    path: 'edit/:id',
    component: QuoteEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
