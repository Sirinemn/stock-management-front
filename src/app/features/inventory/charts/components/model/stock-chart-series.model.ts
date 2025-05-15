import { ChartPoint } from './chart-point.model';

export interface StockChartSeries {
  productName: string;
  data: ChartPoint[];
}
