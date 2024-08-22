import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddUserComponent } from "../add-user/add-user.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../model/user';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { UserDetailComponent } from '../show-user/show-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'ssi-sx-manage-user',
  standalone: true,
  imports: [RouterLink, AddUserComponent, CommonModule, FormsModule, NgxPaginationModule, UpdateUserComponent],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showAlert: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedUserId?: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filterUsers();
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onUserAdded(user: User) {
    this.loadUsers();
  }

  onUserUpdated(user: User) {
    this.loadUsers();
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.filterUsers();
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 3000);
    }, error => {
      console.error('Error deleting user:', error);
    });
  }

  filterUsers() {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.username?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  updateUserDetails(userId: number) {
    this.selectedUserId = userId;
  }
}
