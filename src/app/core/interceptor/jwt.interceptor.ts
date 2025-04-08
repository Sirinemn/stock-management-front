import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const isApiUrl = request.url.startsWith('/api/');
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}