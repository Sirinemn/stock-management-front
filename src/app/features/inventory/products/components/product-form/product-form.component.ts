import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public messageResponse: string = '';
  public user!: User ;
  private userFullName: string = '';
  private userId: number = 0;
  public categories: Category[] = [];
  public groupName: string = '';
  public groupId: number = 0;
  public productId: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
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
    this.productId = this.route.snapshot.paramMap.get('id') || null;
    this.initializeUserData();
    this.loadCategories();
    if(this.productId) {
      this.isEditMode = true;
      this.patchProductValue(this.productId);
    }
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
    const user = this.sessionService.getUser();
    if (user) {
      this.user = user as User;
      this.userFullName = `${this.user.firstname} ${this.user.lastname}`;
      this.userId = this.user.id;
      this.groupId = this.user.groupId;
      this.groupName = this.user.groupName;
    }
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
          this.router.navigate(['/features/products/list']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.eroor.message || 'Une erreur est survenue.';
        }
      });
    }
  }
  private patchProductValue(productId: string){
    this.productService.getProduct(+productId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (product) => {
        this.formGroup.patchValue({
          name: product.name,
          description: product.description,
          quantity: product.quantity,
          threshold: product.threshold,
          price: product.price,
          categoryId: product.categoryId
        });
      },
      error: (error) => {
        this.isLoading = false; 
        this.errorMessage = error.error.message;
      }
    });
  }
  public updateProduct() {
    if(this.formGroup.valid && !this.isLoading) {
      this.isLoading = true;
      const productData = {
        ...this.formGroup.value,
        userId: this.userId,
        userName: this.userFullName,
        groupId: this.groupId,
        groupName: this.groupName,
      } as Product;
      this.productService.updateProduct(+this.productId!, productData).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.messageResponse = response.message;
          const snackBarRef = this.snackBar.open(this.messageResponse, 'Fermer', {
            duration: 3000
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.formGroup.reset();
            this.router.navigate(['/features/products/list']);
          });
        },
        error: (error) => {
          this.isLoading = false; 
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
