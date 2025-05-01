import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit , OnDestroy{
  public isLoading: boolean = false;
  public product: Product | undefined;
  public productId: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
      this.productId = this.route.snapshot.params['id'] || 0;
      this.getProduct(this.productId);
  }
  private getProduct(id: number) {
    this.isLoading = true;
    this.productService.getProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (product) =>{
        this.product = product;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false
      }
    });
  }

  public back() {
    window.history.back();
  }
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
