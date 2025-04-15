import { Routes } from "@angular/router";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

export const admin : Routes = [
    {title: 'Users', path: 'users', component: UsersListComponent},
    {title: 'AddUser', path: 'adduser', component: RegisterUserComponent},
    {title: 'EditUser', path: 'edituser/:id', component: UserFormComponent},
]