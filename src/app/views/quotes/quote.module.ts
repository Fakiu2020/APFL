import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteCreateComponent } from './quote-create/quote-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteEditComponent } from './quote-edit/quote-edit.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [QuoteListComponent, QuoteCreateComponent, QuoteEditComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class QuoteModule { }
