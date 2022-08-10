import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { asyncScheduler, scheduled } from 'rxjs';
import { IProduct } from 'src/app/shared/model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    return scheduled(
      this.shopService.getProduct(
        +this.activateRoute.snapshot.paramMap.get('id')
      ),
      asyncScheduler
    ).subscribe({
      next: (product) => (this.product = product),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
