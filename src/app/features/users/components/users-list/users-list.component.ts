import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../auth/models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-list',
  imports: [MatIconModule, MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  public loading: boolean = false;
  public httpSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  public getUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
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
  deleteUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }

}
