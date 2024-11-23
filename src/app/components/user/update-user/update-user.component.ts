import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user/user.service';
import { UserRole } from '../../../enum/user-role';

@Component({
  selector: 'ssi-sx-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnChanges {
  @Input() userId?: number;
  @Output() userUpdated = new EventEmitter<User>();

  Roles = UserRole;
  isPasswordHidden = true;
  userForm: FormGroup;

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      role: new FormControl("", [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && this.userId) {
      this.loadUserDetails(this.userId);
    }
  }

  togglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.isPasswordHidden ? 'password' : 'text';
    }
  }

  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        password: '',
        role: user.role
      });
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userId,
        ...this.userForm.value
      };
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.userForm.reset();
        this.userUpdated.emit(updatedUser);
        
        const modal = document.getElementById('updateModal') as any;
        if (modal) {
          modal.classList.remove('show');
          document.body.classList.remove('modal-open');
          modal.style.display = 'none';
          const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
          if (backdrop) {
            backdrop.remove();
          }
        }
      });
    }
  }
}
