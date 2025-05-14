import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../admin/models/category';
import { SessionService } from '../../../../../core/services/session.service';
import { User } from '../../../../../auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../mat-dialog/confirm-dialog/confirm-dialog.component';
import { CategorieService } from '../../services/categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public groupId: number = 0;
  private user?: User |null;
  public destroy$ = new Subject<void>();
  public errorMessage: string = '';
  @Output() categorySelected = new EventEmitter<number>();

  
  constructor(
    private router: Router,
    private productService: ProductService,
    private sessionService: SessionService,
    private dialog: MatDialog,
    private categoryService: CategorieService,
    private snackBar: MatSnackBar
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
    this.categoryService.getCategories(groupId).pipe(takeUntil(this.destroy$)).subscribe({
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
    this.productService.getProducts(groupId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      }
      , error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || "un erreur est survenu lors de la récupération des produits"
        console.error('Error fetching products', error);
      }
    });
  }
  public onCategoryChange(categoryId: number): void {
    if (categoryId) {
      this.getProductsByCategory(categoryId);
    } else {
      this.getProducts(this.groupId); // si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  public getProductsByCategory(categoryId: number): void {
    this.isLoading = true;
    this.productService.getProductsByCategory(categoryId, this.groupId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching products by category', error);
      }
    });
  }
  public deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler'
      }
    }
    );
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id, this.groupId).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.getProducts(this.groupId);
          },
          error: (error) => {
            console.error('Error deleting product', error);
            this.errorMessage = error.error.message || "un erreur est survenu lors de la suppression"
            this.snackBar.open(this.errorMessage, 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
  public editProduct(productId: number) {
    this.router.navigate([`/features/products/edit/${productId}`]);
  }
  public viewProduct(productId: number) {
    this.router.navigate([`/features/products/view/${productId}`]);
  }

  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
