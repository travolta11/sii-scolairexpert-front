import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'];

    if (!this.keycloakService.keycloakInstance.authenticated) {
      this.keycloakService.login();
      return false;
    }

    const hasRole = requiredRoles.some((role: string) =>
      this.keycloakService.keycloakInstance.hasResourceRole(role, 'sii_dev')
    );

    if (!hasRole) {
      this.router.navigate(['unauthorized']);
      return false;
    }

    return true;
  }
}
