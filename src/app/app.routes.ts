import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthGuard } from './core/guards/unauth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'auth',
    canActivate: [UnauthGuard],
    loadChildren: () =>
      import('./auth/auth.routes').then((route) => route.auth_routes),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then((route) => route.user_routes),
  },
  {
    path: 'features',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/inventory/features.routes.').then(
        (route) => route.features_routes
      ),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('../app/features/admin/admin.routes').then((route) => route.admin),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
