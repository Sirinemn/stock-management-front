import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../models/category';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../../../../core/services/session.service';
import { User } from '../../../../auth/models/user';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  imports: [MatIconModule, MatTableModule, MatButtonModule, NgIf, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public newCategoryName: string = '';
  public user: User | null = null;
  private userId: number = 0;
  public isAddingCategory: boolean = false;
  public errorMessage: string = '';
  public loading: boolean = false;
  private destroy$ = new Subject<void>();
  public displayedColumns: string[] = ['index', 'name', 'actions'];

  constructor(
    private adminService: AdminService,
    private sessionService: SessionService,
  ) { }
  
  ngOnInit(): void {
    this.sessionService.getUser$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.user = user ?? null;
        this.userId = this.user ? this.user.id : 0;
        if (this.userId) {
          this.getCategories();
        } else {
          this.errorMessage = "Utilisateur non authentifié.";
        }
      },
      error: () => {
        this.errorMessage = "Erreur lors de la récupération de l'utilisateur.";
      }
    });
  }
  public toggleAddCategory() {
    this.isAddingCategory = !this.isAddingCategory;
  }
  public addCategory() {
    if (this.newCategoryName.trim() === '') return;
    this.loading = true;
    console.log(this.userId);
    this.adminService.addCategory(this.newCategoryName, this.userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getCategories();
        this.isAddingCategory = false;
        this.newCategoryName = '';
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'An error occurred while adding the category.';       
      }
    });
  }  
  private getCategories(): void {
    if (!this.userId) {
      this.errorMessage = "Aucun utilisateur connecté.";
      return;
    }
    this.loading = true;
    this.adminService.getCategories(this.userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.message || "Erreur lors du chargement des catégories.";
      },
    });
  }

  public deleteCategory(categoryId: number) {
    this.loading = true;
    this.adminService.deleteCategory(categoryId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getCategories();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
