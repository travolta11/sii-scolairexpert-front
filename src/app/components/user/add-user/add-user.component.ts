import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ssi-sx-add-user',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  isPasswordHidden = true;

  togglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.isPasswordHidden ? 'password' : 'text';
    }
  }

  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      role: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
