import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user.model';
import { Company } from 'src/app/models/company.model';
import { Producer } from 'src/app/models/producer.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User | undefined;
  public company: Company | undefined;
  public producer: Producer | undefined;
  public showCreateCompanyForm: boolean = false;
  public showJoinCompanyForm: boolean = false;

  public fileToUpload: File | null = null;

  constructor(private profileService: ProfileService, private router: Router) { }
  CompanyName: string = '';
  Password: string = '';
  Alias: string = '';
  Address: string = '';
  Mail: string = '';
  PhoneNum: string = '';
  VATNum: string = '';
  Description: string = '';

  ngOnInit(): void {
    this.getUser();
    this.getCompany();
    this.getProducer();
  }

  getUser() {
    this.profileService.getUser().subscribe(
      (dataUser) => {
        this.user = dataUser;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProducer() {
    this.profileService.getProducer().subscribe(
      (dataProducer) => {
        this.producer = dataProducer;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getCompany(){
    this.profileService.getCompany().subscribe(
      (dataCompany) => {
        this.company = dataCompany;
        console.log(dataCompany)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  createCompany(){
    this.profileService.CreateCompany(this.CompanyName, this.Password, this.Alias, 
    this.Address, this.Mail, this.PhoneNum, this.VATNum, this.Description).subscribe(
      (res: HttpResponse<any>) => {
        if (res.ok) {
          window.location.reload();
        } else {
          window.location.reload();
          window.alert("Erreur lors de la création de la compagnie");
        }
      }
    )
  }
  joinCompany(){
    this.profileService.JoinCompany(this.CompanyName, this.Password).subscribe(
        (res: HttpResponse<any>) => {
          if (res.ok) {
            window.location.reload();
          } else {
            window.location.reload();
            window.alert("Erreur pour rejoindre la compagnie");
          }
        }
      )
  }
  quitCompany(){
    console.log(this.producer?.id)
    this.profileService.QuitCompany(this.producer?.id).subscribe(
      (res: HttpResponse<any>) => {
        if (res.ok) {
          window.location.reload();
        } else {
          window.location.reload();
          window.alert("Erreur pour quitter la compagnie");
        }
      }
    )
  }
  toggleCreateCompanyForm() {
    this.showCreateCompanyForm = !this.showCreateCompanyForm;
  }
  toggleJoinCompanyForm() {
    this.showJoinCompanyForm = !this.showJoinCompanyForm;
  }
}
