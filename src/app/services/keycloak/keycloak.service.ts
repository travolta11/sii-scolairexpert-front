import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  constructor() { }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  get keycloakInstance() {
    if (!this.keycloak) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: ' sii-scolairexpert',
        clientId: 'sii_dev'
      });
    }
    return this.keycloak;
  }

  async init(): Promise<void> {
     
      try {
      const authenticated: boolean =  await this.keycloakInstance.init({
          onLoad: 'login-required', 
          checkLoginIframe: false 
        });
        console.log('Keycloak initialized');
        if(authenticated){
          this._profile= (await this.keycloak?.loadUserProfile()) as UserProfile;
          this._profile.token = this.keycloak?.token;
        }
        console.log(this._profile?.token);
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      }
    
  }

  login(){
    return this.keycloak?.login();
  }
  
  logout(){
    return this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
  }

}
