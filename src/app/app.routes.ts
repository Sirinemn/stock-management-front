import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthGuard } from './core/guards/unauth.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: '' , 
      component: HomeComponent
    },
    {
      path: 'auth', 
      canActivate: [UnauthGuard], 
      loadChildren: ()=> 
        import('./auth/auth.routes').then((route)=> route.auth_routes)
    },
    {
      path: 'features',
      canActivate: [AuthGuard],
      loadChildren: ()=> 
        import('../app/features/features.routes.').then((route)=> route.features_routes)
    },
    {
      path: 'admin',
      canActivate: [AuthGuard],
      loadChildren: ()=> 
        import('../app/features/admin/admin.routes').then((route)=> route.admin)
    },
    { 
      path: '404',
      component: NotFoundComponent 
    },
    { 
      path: '**',
      redirectTo: '404' 
    },
];
