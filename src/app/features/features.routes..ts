import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterUserComponent } from "./users/components/register-user/register-user.component";
import { UserFormComponent } from "./users/components/user-form/user-form.component";

export const features_routes: Routes = [
    {title: 'Dashboard', path: 'dashboard', component: DashboardComponent},
    {title: 'AddUser', path: 'adduser', component: RegisterUserComponent},
    {title: 'EditUser', path: 'edituser/:id', component: UserFormComponent},
]