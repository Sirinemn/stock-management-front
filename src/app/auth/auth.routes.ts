import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";

export const auth_routes: Routes = [
    {title: 'Login', path: 'login', component: LoginComponent},
    {title: 'Register', path: 'register', component: RegisterComponent},
    {title: 'Change Password', path: 'change-password', component: ChangePasswordComponent}, 
] 