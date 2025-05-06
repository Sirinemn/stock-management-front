import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { StockMovement } from '../../../models/stockmovement';

@Component({
  selector: 'app-stock-movement-list',
  imports: [MatIconModule, MatTableModule, MatButtonModule, RouterLink, MatFormFieldModule, MatOptionModule, MatSelectModule, CommonModule],
  templateUrl: './stock-movement-list.component.html',
  styleUrl: './stock-movement-list.component.scss'
})
export class StockMovementListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public errorMessage: string = '';
  public movements: StockMovement[] = [];
  public isAdmin: boolean = false;
  public displayedColumns: string[] = ['product', 'quantity', 'createdBy', 'createdAt', 'actions'];
  public isLoading = false;
  public groupId: number = 0;
  public filters = {userId: null, productId: null, groupId: null, startDate: null, endDate: null}

  ngOnInit(): void {
      
  }

  public deleteProduct(_t77: any) {
  }
  public editProduct(arg0: any) {
  }
  public viewProduct(arg0: any) {
  }

  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
