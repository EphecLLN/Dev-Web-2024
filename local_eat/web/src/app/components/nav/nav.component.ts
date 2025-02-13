import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent {
  
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authenticate().subscribe(
      () => {
        this.isAuthenticated = true;
      },
      (error) => {
        console.error("Erreur lors de l'authentification:", error);
        this.isAuthenticated = false;
      }
    );
  }
  redirectToRegisterProducers() {
    this.router.navigate(['/register-producers']);
  }
}
