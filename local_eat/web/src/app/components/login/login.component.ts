import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: string;
    password: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            usernameValid: new FormControl(this.username, [Validators.required]),
            passwordValid: new FormControl(this.password, [Validators.required, Validators.minLength(8)])
        });
    }

    login() {
        this.authService.login(this.username, this.password).subscribe(
            (res: HttpResponse<any>) => {
                if (res.ok) {
                    this.router.navigate(['/']);
                }
            }
        );
    }
}
