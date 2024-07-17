import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'ssi-sx-add-user',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
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


}

