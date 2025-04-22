import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../auth/models/user';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit , OnDestroy {
  public loading: boolean = false;
  public user!: User;
  public userId: number = 0;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.router.parseUrl(this.router.url).queryParams['id'] || 0;
  }

  public back() {
    window.history.back();
  }
  public getUser(): void {
    this.loading = true;
    this.userService.getUser(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  ngOnDestroy(): void {
    // Cleanup logic if needed
  }

}
