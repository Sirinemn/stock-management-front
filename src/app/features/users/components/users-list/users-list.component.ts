import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../auth/models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  imports: [MatIconModule, MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  public loading: boolean = false;
  public httpSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, private router:Router) {}

  ngOnInit(): void {
    this.getUsers();
  }
  public getUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users.data = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  public back() {
    window.history.back();
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.getUsers();
      },
      error: () => {
        this.getUsers();
      }
    });
  }
  editUser(userId: number) {
    this.router.navigate(['/admin/users/edit', userId]);
  }
  viewUser(userId: number) {
    this.router.navigate(['/admin/users/view', userId]);
  }
  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }

}
