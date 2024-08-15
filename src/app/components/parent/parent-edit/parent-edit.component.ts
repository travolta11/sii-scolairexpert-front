import { Component, Inject } from '@angular/core';
import { Parent } from '../../../models/parent/parent';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentService } from '../../../services/parent/parent.service';
import { MatDialogModule,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ssi-sx-parent-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './parent-edit.component.html',
  styleUrl: './parent-edit.component.scss'
})
export class ParentEditComponent {
  parentForm: FormGroup;
  parent!: Parent;

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<ParentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.parentForm = this.fb.group({
      firstName: [data?.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [data?.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: [data?.email, [Validators.required, Validators.email]],
      phone: [data?.phone, [Validators.pattern('^[0-9]{10}$')]],
      cin: [data?.cin, [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]]
    });
  }

  onSubmit(): void {
    this.parentForm.markAllAsTouched();
    if (this.parentForm.valid) {
      const updatedParent: Parent = {
        ...this.data,
        ...this.parentForm.value
      };
      this.parentService.updateParent(updatedParent).subscribe(() => {
        this.dialogRef.close(updatedParent);
      });
    }   
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
