import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const features_routes: Routes = [
  { title: 'Dashboard', path: 'dashboard', component: DashboardComponent },
  { path: 'products', loadChildren: () => import('./products/products.routes').then((route) => route.products_routes) },
  { path: 'stock', loadChildren: () => import('./stock-movement/stock-movement.routes').then((route) => route.stock_routes)}
];
