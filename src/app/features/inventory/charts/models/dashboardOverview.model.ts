import { StockMovement } from "../../models/stockmovement";
import { ProductQuantity } from "./product-quantity.model";
import { StockChartSeries } from "./stock-chart-series.model";

export interface DashboardOverview {
  totalProducts: number;
  lowStockProducts: number;
  recentMovements: StockMovement[];
  productQuantities: ProductQuantity[];
  stockChart: StockChartSeries[];
  groupId: number;
}