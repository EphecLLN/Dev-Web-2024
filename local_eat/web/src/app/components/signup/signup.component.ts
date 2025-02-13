import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  username: string = '';
  password: string = '';
  email: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      usernameValid: new FormControl(this.username, [Validators.required]),
      passwordValid: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      emailValid: new FormControl(this.email, [Validators.required, Validators.email])
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signup(this.email, this.password, this.username).subscribe(
      (sign: HttpResponse<any>) => {
        if (sign.ok) {
          this.authService.login(this.email, this.password).subscribe(
            (login: HttpResponse<any>) => {
              if (login.ok) {
                this.router.navigate(['/']);
              } else {
                this.router.navigate(['/login']);
              }
            }
          );
        }
      },
    );
  }
}