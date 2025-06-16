import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GlobalService } from '../app/service/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }


    constructor(
        private readonly router: Router,
        private readonly globalService: GlobalService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const accesToken = this.globalService.getAccessToken();
        const roleId = this.globalService.getuserRole();

        if (accesToken) {
            return true; // Allow navigation for other roles
        }

        this.router.navigate(['/auth/login'] );
        return false;
    }
}
