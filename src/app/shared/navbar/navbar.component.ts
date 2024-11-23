import { Component, OnInit} from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
@Component({
  selector: 'ssi-sx-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(
    private keycloakService: KeycloakService
  ) {
  }
  ngOnInit(): void {
    
  }
  async logout() {
    await this.keycloakService.logout();
  }
}
