import { Component  } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PageContentComponent } from './shared/page-content/page-content.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, PageContentComponent,FooterComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SSI-Ecole-Front';
  
 
}
