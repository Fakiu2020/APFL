import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuoteService } from '../service/quote.service';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss'],
})
export class QuoteEditComponent implements OnInit {
  quoteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private quoteService: QuoteService,
     private router: Router,
    private toastr: ToastrService
  ) {}

  

  ngOnInit() {
    this.quoteService.getById(this.route.snapshot.params['id']).subscribe(
      (data) => {
       
        this.quoteForm = this.formBuilder.group({
          id: [data.Id, Validators.required], 
          description: [data.Description, Validators.required],
          author: [data.Author, Validators.required],
        });
      },
      (error) => {}
    );
    
  }

  update() {
    if (this.quoteForm.invalid) {return; }
    this.quoteService.update(this.quoteForm.value).subscribe(data => {
      
      this.toastr.success('Updated Successfully');
      this.router.navigate(['quotes']);
    }, error => {

    });

  }
}
