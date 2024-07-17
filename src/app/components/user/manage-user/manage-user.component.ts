import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: 'ssi-sx-manage-user',
  standalone: true,
  imports: [RouterLink, AddUserComponent],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

 

}
