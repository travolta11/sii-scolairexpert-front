import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private refreshTimer: any;

  constructor() { }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  get keycloakInstance() {
    if (!this.keycloak) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'sii-scolairexpert',
        clientId: 'sii_dev'
      
      });
    }
    return this.keycloak;
  }

  async init(): Promise<void> {
    try {
      const authenticated: boolean = await this.keycloakInstance.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      });

      console.log('Keycloak initialized');

      if (authenticated) {
        this._profile = await this.keycloak?.loadUserProfile() as UserProfile;
        this.storeToken();
        this.startTokenRefresh();
      }
    } catch (error) {
      console.error('Keycloak initialization error:', error);
    }
  }

  private storeToken() {
    const token = this.keycloak?.token;
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token stored in local storage');
    }
  }

  private startTokenRefresh() {
    this.clearRefreshTimer(); // Clear  timer

    const tokenParsed = this.keycloak?.tokenParsed;
    if (tokenParsed && tokenParsed.exp) {
      const expiresIn = tokenParsed.exp - Math.floor(Date.now() / 1000); // Get token expiration time

      const refreshTime = Math.max(0, (expiresIn - 30) * 1000); // Refresh 30 seconds before expiration
      this.refreshTimer = setTimeout(async () => {
        try {
          const refreshed = await this.keycloak?.updateToken(30);
          if (refreshed) {
            this.storeToken(); // Update local storage with the new token
            console.log('Token refreshed and updated in local storage');
          }
          this.startTokenRefresh(); // Restart the timer
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      }, refreshTime);
    }
  }

  private clearRefreshTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    this.clearRefreshTimer(); // Clear timer on logout
    return this.keycloak?.logout({ redirectUri: 'http://localhost:4200' });
  }
}