import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {
    public authenticated;
    constructor(
      private authService: AuthService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.user$.pipe(
            first()
          ).subscribe(user => {
            if(!user){
              this.authenticated = true;
            } else {
              this.authenticated = false;
            }
          })
          return this.authenticated;
    }
}