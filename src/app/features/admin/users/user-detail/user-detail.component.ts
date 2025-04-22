import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../auth/models/user';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-detail',
  imports: [MatIconModule, MatCardModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit , OnDestroy {
  public loading: boolean = false;
  public user!: User;
  public userId: number = 0;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'] || 0;
    this.getUser();
  }

  public back() {
    window.history.back();
  }
  public getUser(): void {
    this.loading = true;
    this.adminService.getUser(this.userId).subscribe({
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
  }

}
