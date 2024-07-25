import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddUserComponent } from "../add-user/add-user.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ssi-sx-manage-user',
  standalone: true,
  imports: [RouterLink, AddUserComponent,CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

  users = [
    { name: 'user 1', email: 'user1@gmail.com', role: 'Administration' },
    { name: 'user 2', email: 'user2@gmail.com', role: 'Accounting' },
    { name: 'user 3', email: 'user3@gmail.com', role: 'Admin' },
    { name: 'user 4', email: 'user4@gmail.com', role: 'Administration' },
    { name: 'user 5', email: 'user5@gmail.com', role: 'Accounting' }
  ];

}
