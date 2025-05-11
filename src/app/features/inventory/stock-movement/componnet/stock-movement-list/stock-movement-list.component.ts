import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StockMovement } from '../../../models/stockmovement';
import { SessionService } from '../../../../../core/services/session.service';
import { StockMovementService } from '../../service/stock-movement.service';
import { AuthStateService } from '../../../../../core/services/auth-state.service';
import { User } from '../../../../../auth/models/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../../mat-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-movement-list',
  imports: [MatIconModule, MatTableModule, MatProgressSpinnerModule, MatButtonModule, RouterLink, MatFormFieldModule, MatOptionModule, MatSelectModule, CommonModule],
  templateUrl: './stock-movement-list.component.html',
  styleUrl: './stock-movement-list.component.scss'
})
export class StockMovementListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public errorMessage: string = '';
  public movements: StockMovement[] = [];
  public isAdmin: boolean = false;
  private user!: User;
  public displayedColumns: string[] = [];
  public isLoading = false;
  public isDischarged: boolean = false;
  public groupId: number = 0;
  public filters = {userId: null, productId: null, groupId: null, startDate: null, endDate: null}

  constructor(
    private sessionService: SessionService,
    private authStateService: AuthStateService,
    private stockMovementService: StockMovementService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDisplayedcolumns();
    this.getUser();
    this.loadStockMovements();
  }

  public deleteProduct(stockId: number) {
    this.isLoading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir supprimer ?',
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.stockMovementService.deleteStockMovement(stockId).pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
            this.loadStockMovements();
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message || 'Une erreur est survenue lors de la suppression du produit.';
            this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
          }
        });
      } else {
        this.isLoading = false;
      }
    });
  
  }
  public editProduct(arg0: any) {
  }
  public viewProduct(arg0: any) {
  }
  public loadDisplayedcolumns() {
    this.authStateService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      if (isAdmin) {
        this.displayedColumns = ['productName', 'quantity', 'createdBy', 'createdAt', 'actions'];
      } else {
        this.displayedColumns = ['productName', 'quantity', 'createdAt', 'createdBy'];
      }
    });
  }
  public getUser() {
    this.sessionService.getUser$().pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user!;
      this.groupId = user!.groupId;
      
    });
  }
  public loadStockMovements() {
    this.isLoading = true;
    this.stockMovementService.getStockMovementsByGroup(this.groupId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.movements = response;
        this.isLoading = false;
        response.forEach((movement) => {
          if (movement.type === 'SORTIE') {
            this.isDischarged = true;
          }
        });
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
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
