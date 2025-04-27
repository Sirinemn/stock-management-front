import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, RouterLink, MatFormFieldModule, MatOptionModule, MatSelectModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = []; 
  public displayedColumns: string[] = ['name','quantity', 'price', 'createdBy', 'actions'];
  public isLoading = false;
  

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      }
      , error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  public deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.getProducts();
      }
      , error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }
  public editProduct(productId: number) {
    this.router.navigate(['/inventory/products/edit', productId]);
  }
  public viewProduct(productId: number) {
    this.router.navigate(['/inventory/products/view', productId]);
  }

  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
  }

}
