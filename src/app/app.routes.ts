import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
      path: '' , 
      component: HomeComponent
    },
    {
      path: 'auth', 
      canActivate: [], 
      loadChildren: ()=> 
        import('./auth/auth.routes').then((route)=> route.auth_routes)
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
