import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentService } from '../../../services/parent/parent.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Parent } from '../../../models/parent/parent';

@Component({
  selector: 'ssi-sx-parent-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, MatDialogModule],
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.scss'
})
export class ParentFormComponent implements OnInit{
  @Output() parentAdded = new EventEmitter<string>();
  parentForm!: FormGroup;
  cinExistsMessage: string = '';
  emailExistsMessage: string = '';
  phoneExistsMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<ParentFormComponent>
  ) {}

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]]
    });
  }

  onSubmit(): void {
    if (this.parentForm.valid) {
      const cin = this.parentForm.get('cin')?.value;
      const email = this.parentForm.get('email')?.value;
      const phone = this.parentForm.get('phone')?.value;

      this.checkCinExists(cin, () => {
        this.checkEmailExists(email, () => {
          this.checkPhoneExists(phone, () => {
            const parentData: Parent = this.parentForm.value;
            this.parentService.addParent(parentData).subscribe(response => {
              this.parentAdded.emit(parentData.cin);
              this.dialogRef.close();
            });
          });
        });
      });
    } else {
      this.parentForm.markAllAsTouched();
    }
  }

  private checkCinExists(cin: string, onSuccess: () => void): void {
    this.parentService.checkCinExists(cin).subscribe(exists => {
      if (exists) {
        this.cinExistsMessage = 'CIN already exists.';
      } else {
        this.cinExistsMessage = '';
        onSuccess();
      }
    });
  }

  private checkEmailExists(email: string, onSuccess: () => void): void {
    this.parentService.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        this.emailExistsMessage = 'Email already exists.';
      } else {
        this.emailExistsMessage = '';
        onSuccess();
      }
    });
  }

  private checkPhoneExists(phone: string, onSuccess: () => void): void {
    this.parentService.checkPhoneExists(phone).subscribe(exists => {
      if (exists) {
        this.phoneExistsMessage = 'Phone number already exists.';
      } else {
        this.phoneExistsMessage = '';
        onSuccess();
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
