import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../app/service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router, private readonly authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403 || error.status === 405) {
            
          this.router.navigate(['/auth/access']);
        }
        // Optional: show a message, log it, etc.
        return throwError(() => error);
      })
    );
  }
}
