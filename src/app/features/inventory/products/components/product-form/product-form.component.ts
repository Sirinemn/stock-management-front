import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../../../auth/models/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionService } from '../../../../../core/services/session.service';
import { Category } from '../../../../admin/models/category';
import { Product } from '../../../models/product';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../../../../admin/services/admin.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatProgressSpinnerModule, MatOptionModule, MatInputModule, MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit , OnDestroy {

  public isEditMode = false;
  public formGroup!: FormGroup;
  public isLoading = false;
  private destroy$ = new Subject<void>();
  public errorMessage: string = '';
  public user!: User ;
  private userFullName: string = '';
  private userId: number = 0;
  private categoryId?: number = 0;
  public categories: Category[] = [];
  public groupName: string = '';
  public groupId: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private routers: Router,
    private sessionService: SessionService,
    private adminService: AdminService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      threshold: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', [Validators.required]],
    });
  }
 
  ngOnInit(): void {
    this.initializeUserData();
    this.loadCategories();
  }
  private loadCategories(): void {
    this.adminService.getCategories(this.groupId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Erreur lors du chargement des catégories.';
      },
    });
  }
  private initializeUserData(): void {
    this.user = this.sessionService.getUser() as User;
    this.userFullName = `${this.user.firstname} ${this.user.lastname}`;
    this.userId = this.user.id;
    this.groupId = this.user.groupId;
    this.groupName = this.user.groupName;
  }
  public addProduct() {
    if (this.formGroup.valid && !this.isLoading) {
      this.isLoading = true;
      const productData = {
        ...this.formGroup.value,
        userId: this.userId,
        userName: this.userFullName,
        groupId: this.groupId,
        groupName: this.groupName,
      } as Product;
      this.productService.addProduct(productData).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.routers.navigate(['/features/products/list']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.eroor.message || 'Une erreur est survenue.';
        }
      });
    }
  }
  public updateProduct() {
    throw new Error('Method not implemented.');
  }
  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
