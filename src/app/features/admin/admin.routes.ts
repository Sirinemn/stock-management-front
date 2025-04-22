import { Routes } from "@angular/router";
import { UserFormComponent } from "./users/user-form/user-form.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";

export const admin : Routes = [
    {title: 'Users', path: 'users', component: UsersListComponent},
    {title: 'AddUser', path: 'adduser', component: UserFormComponent},
    {title: 'UserDetail', path: 'user/view/:id', component: UserDetailComponent},
    {title: 'EditUser', path: 'user/edit/:id', component: UserFormComponent},
]