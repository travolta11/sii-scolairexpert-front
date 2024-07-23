import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak | undefined;

  constructor() { }

  get keycloakInstance() {
    if (!this.keycloak) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'sii-scolairexpert',
        clientId: 'sii'
      });
    }
    return this.keycloak;
  }

  async init(): Promise<void> {
    if (typeof window !== 'undefined') {  // Ensure this runs in the browser context
      try {
        await this.keycloakInstance.init({
          onLoad: 'login-required', // Force login if not authenticated
          checkLoginIframe: false // Disable the login iframe to avoid issues
        });
        console.log('Keycloak initialized');
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      }
    }
  }
}
