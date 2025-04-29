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
import { AdminService } from '../../../../admin/services/admin.service';
import { Subject, takeUntil } from 'rxjs';

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
  private user?: User |null;
  private destroy$ = new Subject<void>();

  

  constructor(
    private router: Router,
    private productService: ProductService,
    private sessionService: SessionService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.sessionService.getUser$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.user = user;
        this.groupId = user?.groupId || 0;
        this.getCategories(this.groupId);
        this.getProducts(this.groupId);
      },
      error: (error) => {
        console.error('Error fetching user', error);
      }
    });
  }
  public getCategories(groupId: number): void {
    this.adminService.getCategories(groupId).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
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
    this.productService.deleteProduct(productId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getProducts(this.groupId);
      }
      , error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }
  public editProduct(productId: number) {
    this.router.navigate([`/inventory/products/edit/${productId}`]);
  }
  public viewProduct(productId: number) {
    this.router.navigate([`/inventory/products/view/${productId}`]);
  }

  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
