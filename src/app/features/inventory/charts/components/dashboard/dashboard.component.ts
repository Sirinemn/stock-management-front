import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartHttpService } from '../../services/chart-http.service';
import { Subject, takeUntil } from 'rxjs';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ProductQuantity } from '../../models/product-quantity.model';
import { SessionService } from '../../../../../core/services/session.service';
import { User } from '../../../../../auth/models/user';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  imports: [PieChartComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public pieChartData: ProductQuantity[] = [];
  public destroy$ = new Subject<void>();
  public groupId: number = 0;
  public user: User | null = null;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private chartHttp: ChartHttpService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  public getUser() {
    this.sessionService.getUser$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.user = user;
        this.groupId = user?.groupId || 0;
        this.getPieChartData();
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Erreur lors de la récupération des données utilisateur.';
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
      
    });
  }
  public getPieChartData() {
    this.isLoading = true;
    this.chartHttp.getProductQuantities(this.groupId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.pieChartData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Erreur lors du chargement des données du graphique circulaire.';
        console.error("Erreur lors de la récupération des données du graphique circulaire:", error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
