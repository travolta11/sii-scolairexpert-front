import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user/user.service';
import { UserRole } from '../../../enum/user-role';

@Component({
  selector: 'ssi-sx-add-user',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  isPasswordHidden = true;
  @Output() userAdded = new EventEmitter<User>();

  Roles= UserRole;


  togglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.isPasswordHidden ? 'password' : 'text';
    }
  }

  userForm: FormGroup;

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      role: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userService.addUser(newUser).subscribe(
        (user) => {
          this.userAdded.emit(user);
          this.userForm.reset();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('basicModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
      modalElement.style.display = 'none';

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
}
