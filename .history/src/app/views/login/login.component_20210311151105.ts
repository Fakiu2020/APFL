import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;

  /**
   *
   */
   constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
  }



  private createForm() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login (){
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.router.navigate(['quotes']);
      },
      (error) => {}
    );
  }
}

