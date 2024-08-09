import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ssi-sx-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})  
export class LoginComponent implements OnInit {
  authForm: FormGroup = this.fb.group({}); 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailUsername: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      console.log('Form Submitted!', this.authForm.value);
    }
  }
}
