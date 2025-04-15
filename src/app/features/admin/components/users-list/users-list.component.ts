import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../admin/services/users.service';
import { User } from '../../../../auth/models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';


@Component({
  selector: 'app-users-list',
  imports: [MatIconModule, MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'actions'];
  public loading: boolean = false;
  public httpSubscription: Subscription = new Subscription();
  private userId: number = 0;

  constructor(
    private userService: UsersService,
    private router:Router,
    private session:SessionService,
  ) {}

  ngOnInit(): void {
    this.userId = this.session.user?.id || 0;
    this.getUsers();
  }
  public getUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.userId).subscribe({
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
