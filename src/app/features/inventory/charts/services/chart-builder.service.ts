import { Injectable } from '@angular/core';
import { StockChartSeries } from '../models/stock-chart-series.model';
import { Chart } from 'chart.js/auto';
import { ProductQuantity } from '../models/product-quantity.model';


@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {
  public lineChart: Chart | null = null;
  public pieChart: Chart | null = null;

  createLineChart(canvas: HTMLCanvasElement, stockChartSeries: StockChartSeries[]): void {
    if (!stockChartSeries || stockChartSeries.length === 0) {
      console.error("❌ `stockChartSeries` est vide ou undefined !");
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 1. Extraire toutes les dates uniques
    const allDatesSet = new Set<string>();
    stockChartSeries.forEach(series => {
      series.series.forEach(point => allDatesSet.add(point.date));
    });
    const sortedDates = Array.from(allDatesSet).sort(); // triées 

    // 2. Préparer les datasets
    const datasets = stockChartSeries.map(series => {
      const dataMap = new Map(series.series.map(point => [point.date, point.value]));
      return {
        label: series.name,
        data: sortedDates.map(date => dataMap.get(date) ?? 0),
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.1
      };
    });

    // 3. Créer le graphique
    if (this.lineChart) {
      this.lineChart.destroy(); // détruire l'ancien graphe si nécessaire
    }

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedDates,
        datasets
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Évolution du stock par produit'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantité'
            }
          }
        }
      }
    });
  }

  private getRandomColor(): string {
    // Couleur aléatoire pour chaque série
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  createPieChart(canvas: HTMLCanvasElement, productQuantities: ProductQuantity[]): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const productNames = productQuantities.map(p => p.productName);
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Stock par produit',
            data: productQuantities.map(p => p.quantity),
            backgroundColor: productQuantities.map(() => this.getRandomColor())
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Répartition du stock par produit'
          },
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}
