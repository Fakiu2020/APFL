import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuoteService } from '../service/quote.service';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss'],
})
export class QuoteCreateComponent implements AfterViewInit, OnInit {
  quoteForm: FormGroup;
  @ViewChild('myinput') myInputField: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.quoteForm = this.formBuilder.group({
      description: [null, Validators.required],
      author: [null, Validators.required],
    });
  }

  create() {
    if (this.quoteForm.invalid) {
      return;
    }
    this.quoteService.create(this.quoteForm.value).subscribe(
      (data) => {
        this.toastr.success('Saved Successfully');
        this.router.navigate(['quotes']);
      },
      (error) => {}
    );
  }
}
