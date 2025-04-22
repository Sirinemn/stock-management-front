import { Routes } from "@angular/router";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";

export const admin : Routes = [
    {title: 'Users', path: 'users', component: UsersListComponent},
    {title: 'AddUser', path: 'adduser', component: UserFormComponent},
    {title: 'UserDetail', path: 'user/view/:id', component: UserDetailComponent},
    {title: 'EditUser', path: 'user/edit/:id', component: UserFormComponent},
]