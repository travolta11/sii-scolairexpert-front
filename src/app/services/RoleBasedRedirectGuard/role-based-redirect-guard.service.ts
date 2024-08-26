import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedRedirectGuardService implements CanActivate{
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.keycloakService.keycloakInstance.resourceAccess?.['sii_dev']?.roles || [];

    if (roles.includes('admin')) {
      this.router.navigate(['/dashboard']);
    } else if (roles.includes('parent')) {
      this.router.navigate(['/descriptionEcole']);
    } else {
      this.router.navigate(['/unauthorized']);
    }

    return false;
  }
}
