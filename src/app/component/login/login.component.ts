import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _toastr: ToastrService) {

  }
  user_form!: FormGroup
  ngOnInit(): void {
    this.user_form = this._fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }
  submited() {
    if (!this.user_form.get('email')?.valid) {
      this._toastr.error('enter the correct email address')
      return
    } if (!this.user_form.get('password')?.valid) {
      this._toastr.error('enter the correct password it should atleast 6 characters')
      return
    }
   this._toastr.success('save','login successful')

  }
}
