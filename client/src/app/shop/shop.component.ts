import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';
import { asyncScheduler, scheduled } from 'rxjs';
import { IBrand } from '../shared/model/brands';
import { IType } from '../shared/model/productTypes';
import { ShopParams } from '../shared/model/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService) {}

  @ViewChild('search', { static: true }) searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  productTypes: IType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    scheduled(
      this.shopService.getProducts(this.shopParams),
      asyncScheduler
    ).subscribe({
      next: (response) => (
        (this.products = response.data),
        (this.shopParams.pageNumber = response.pageIndex),
        (this.shopParams.pageSize = response.pageSize),
        (this.totalCount = response.count)
      ),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  getBrands() {
    scheduled(this.shopService.getBrands(), asyncScheduler).subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  getProductTypes() {
    scheduled(this.shopService.getProductTypes(), asyncScheduler).subscribe({
      next: (response) =>
        (this.productTypes = [{ id: 0, name: 'All' }, ...response]),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  onBrandIdSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeIdSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
