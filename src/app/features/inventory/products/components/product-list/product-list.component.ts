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
import { CommonModule } from '@angular/common';
import { Category } from '../../../../admin/models/category';
import { SessionService } from '../../../../../core/services/session.service';
import { User } from '../../../../../auth/models/user';

@Component({
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, RouterLink, MatFormFieldModule, MatOptionModule, MatSelectModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = []; 
  public displayedColumns: string[] = ['name','quantity', 'price', 'createdBy', 'actions'];
  public isLoading = false;
  public categories: Category[] = [];
  private groupId: number = 0;
  private User?: User |null;
  

  constructor(
    private router: Router,
    private productService: ProductService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.sessionService.getUser$().subscribe({
      next: (user) => {
        this.User = user;
        this.groupId = user?.groupId ? user.groupId : 0;
        this.getProducts(this.groupId);
      }
      , error: (error) => {
        console.error('Error fetching user', error);
      }
    });
  }
  public getProducts(groupId:number) {
    this.isLoading = true;
    this.productService.getProducts(groupId).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      }
      , error: (error) => {
        this.isLoading = false;
        console.error('Error fetching products', error);
      }
    });
  }

  public deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.getProducts(this.groupId);
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
