import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Producer } from 'src/app/models/producer.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent {
  public producer: Producer | undefined;
  public showAddProductForm : boolean = false;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.getProducer();
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
  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm ;
  }
  addNewProduct() {

  }
}
