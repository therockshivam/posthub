// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { GlobalService } from '../app/service/global.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private readonly globalService: GlobalService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.globalService.getAccessToken(); 
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { GlobalService } from '../app/service/global.service';
import { AuthService } from '../app/service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private readonly refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(private readonly globalService: GlobalService, private readonly authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.globalService.getAccessToken();

        // Attach access token to the request
        if (accessToken) {
            request = this.addToken(request, accessToken);
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                }
                return throwError(error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null); // Reset the subject

            const refreshToken = this.globalService.getRefreshToken();
            if (refreshToken) {
                return this.authService.refreshToken().pipe(
                    switchMap((response: any) => {
                        const newAccessToken = response.data.accessToken;
                        const newRefreshToken = response.data.refreshToken;
                
                        this.isRefreshing = false;
                
                        // Update stored tokens
                        this.globalService.setToken(newAccessToken);
                        this.globalService.setRefreshToken(newRefreshToken);
                
                        this.refreshTokenSubject.next(newAccessToken); // Notify waiting requests
                
                        // Retry the failed request with the new access token
                        return next.handle(this.addToken(request, newAccessToken));
                    }),
                    catchError(err => {
                        this.isRefreshing = false;
                        this.globalService.logout(); // Handle logout on refresh token failure
                        return throwError(err);
                    })
                );
                
            } else {
                // No refresh token available, log the user out
                this.globalService.logout();
                return throwError('Refresh token not available.');
            }
        }

        // Queue requests until the token refresh is complete
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((newAccessToken: string | null) => {
                if (newAccessToken) {
                    return next.handle(this.addToken(request, newAccessToken));
                }
                return throwError('Failed to refresh access token.');
            })
        );
    }
}
