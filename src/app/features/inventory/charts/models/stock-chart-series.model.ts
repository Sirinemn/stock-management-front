import { ChartPoint } from './chart-point.model';

export interface StockChartSeries {
  name: string;
  series: ChartPoint[];
}
