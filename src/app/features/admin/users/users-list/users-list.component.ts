import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../auth/models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-users-list',
  imports: [MatIconModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'actions'];
  public loading: boolean = false;
  private destroy$ = new Subject<void>();
  private userId: number = 0;

  constructor(
    private adminService: AdminService,
    private router:Router,
    private session:SessionService,
  ) {}

  ngOnInit(): void {
    this.userId = this.session.user?.id || 0;
    this.getUsers();
    console.log(this.users.data);
  }
  public getUsers(): void {
    this.loading = true;
    this.adminService.getUsers(this.userId).pipe(takeUntil(this.destroy$)).subscribe({
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
    this.adminService.deleteUser(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getUsers();
      },
      error: () => {
        this.getUsers();
      }
    });
  }
  editUser(userId: number) {
    this.router.navigate([`/admin/user/edit/${userId}`]);
  }
  viewUser(userId: number) {
    this.router.navigate([`/admin/user/view/${userId}`]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
