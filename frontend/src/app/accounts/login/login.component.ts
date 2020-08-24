import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup;
  public error: string;

  constructor(private readonly router: Router, private readonly builder: FormBuilder, private readonly service: AuthenticationService) {
    this.form = this.builder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(60)])]
    });
  }
  getControl(name: string) {
    return this.form.get(name);
  }

  getControlErrors(name: string) {
    return this.form.get(name).errors;
  }
  login() {
    if (this.form.valid) {
      this.error = undefined;
      this.service.login(this.form.get('username').value, this.form.get('password').value).subscribe(() => {
        this.router.navigate(['/contacts']);
      },
        (error) => {
          this.error = "Try again";
        });
    } else {
      this.error = "Please fill the form"
    }
  }

}
