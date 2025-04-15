import { Routes } from "@angular/router";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

export const admin : Routes = [
    {title: 'AddUser', path: 'adduser', component: RegisterUserComponent},
    {title: 'EditUser', path: 'edituser/:id', component: UserFormComponent},
]