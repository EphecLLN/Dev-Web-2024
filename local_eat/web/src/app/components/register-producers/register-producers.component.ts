import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
@Component({
  selector: 'app-register-producers',
  templateUrl: './register-producers.component.html',
  styleUrls: ['./register-producers.component.scss']
})
export class RegisterProducersComponent {
  Lastname: string = '';
  Firstname: string = '';
  PhoneNum: string = '';
  EmailPro: string = '';
  errorMessage: string = '';

  constructor(private ProducersService: ProducersService, private router: Router) { }
  
  registerProducers() {
    this.ProducersService.registerProducers(this.Lastname, this.Firstname, this.PhoneNum, this.EmailPro).subscribe(
      (res: HttpResponse<any>) => {
        console.log('response from server:', res);
        console.log('response headers', res.headers.keys());
        if (res.ok) {
          this.router.navigate(['/login']);
        } else {
          console.error('Error:', res.body.error);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}

