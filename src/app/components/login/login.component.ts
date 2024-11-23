import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ssi-sx-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})  
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private keycloakService: KeycloakService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      emailUsername: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est déjà authentifié
    if (this.keycloakService.keycloakInstance.authenticated) {
      this.router.navigate(['/dashboard']); // Redirection vers la page d'accueil ou tableau de bord
    }
  }

  async onSubmit(): Promise<void> {
    if (this.authForm.valid) {
      try {
        // Initialisez Keycloak sans forcer la redirection
        await this.keycloakService.init();

        // Passez les informations d'identification utilisateur à Keycloak
        const loginOptions = {
          redirectUri: window.location.origin, // Redirigez vers l'origine après la connexion
          loginHint: this.authForm.value.emailUsername
        };

        // Redirection vers la page de connexion Keycloak
        await this.keycloakService.keycloakInstance.login(loginOptions);
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
}
