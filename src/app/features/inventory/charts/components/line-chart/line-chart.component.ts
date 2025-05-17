import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StockChartSeries } from '../../models/stock-chart-series.model';
import { ChartBuilderService } from '../../services/chart-builder.service';


@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit {
  @Input() chartData: StockChartSeries[] = [];
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private chartBuilder: ChartBuilderService) {}

  ngAfterViewInit(): void {
    if (this.chartData.length > 0 && this.lineCanvas) {
      this.chartBuilder.createLineChart(this.lineCanvas.nativeElement, this.chartData);
    }
  }
}
