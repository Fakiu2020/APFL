import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterBase } from '../../models/pagination';
import { ModalDeleteComponent } from '../../shared/modal-delete/modal-delete.component';
import { Quote } from '../models/quote';
import { QuoteService } from '../service/quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
 quotes = new Array<Quote>();
 filters = new FilterBase();
 modalRef: BsModalRef; 
 isLoading = false;
  constructor( private quoteService : QuoteService, private modalService: BsModalService) { }

  ngOnInit(): void {
  this.getAll();
  }


   // *********PAGINATIONS
   pageChanged(event: any): void {
    this.filters.page = event.page;
    this.getAll();
  }

  openRemoveModal(quoteId){
    const params = Object.assign({}, { class: 'modal-danger modal-md', title: 'Quote' } );
    this.modalRef = this.modalService.show(ModalDeleteComponent, params);
    this.modalRef.content.onClose.subscribe(result => {
      if (result) { this.deleteQuote(quoteId); }
    });
  }



  //#region private methods

  private deleteQuote(quoteId){
    this.quoteService.delete(quoteId).subscribe(data => {
      this.filters = new FilterBase();

      this.getAll();
    }, error => {
      console.error(error);
    });
  }

  private getAll(){
    this.isLoading  = true;
    this.quoteService.getAllPaged(this.filters).subscribe(data => {
      this.quotes = data.entity;
      this.filters = data.filters;
      this.isLoading  = false;
     }, error => {
      this.isLoading  = false;
       console.error(error);
     });
  }

  //#endregion

}
