import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ssi-sx-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  isParent: boolean = false;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    const roles = this.keycloakService.keycloakInstance.resourceAccess?.['sii_dev']?.roles || [];

    this.isAdmin = roles.includes('admin');
    this.isParent = roles.includes('parent');
  }
}
