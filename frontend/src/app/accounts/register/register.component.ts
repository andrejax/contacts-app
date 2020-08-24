import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form: FormGroup;
  public error: string;

  constructor(private readonly router: Router, private readonly builder: FormBuilder, private readonly service: AuthenticationService) {
    this.form = this.builder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(60)])]
    });
  }

  getControl(name: string) {
    return this.form.get(name);
  }

  getControlErrors(name: string) {
    return this.form.get(name).errors;
  }
  signUp() {
    if (this.form.valid) {
      this.error = undefined;
      this.service.register(this.form.get('username').value, this.form.get('password').value).subscribe(() => {
        this.router.navigate(['/accounts/login'], { replaceUrl: true });
      },
        (error) => {
          this.error = error.error.message;
        });
    }else{
      this.error = "Please fill the form"
    }
  }

}
