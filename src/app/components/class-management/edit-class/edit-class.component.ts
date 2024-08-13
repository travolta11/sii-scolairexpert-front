import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from '../../../model/class';
import { ClassServiceService } from '../../../services/class/class-service.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'ssi-sx-edit-class',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']  // Corrected here
})
export class EditClassComponent implements OnInit {
  
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private classService: ClassServiceService,
    public dialogRef: MatDialogRef<EditClassComponent>,
    public dialog: MatDialog,  // Corrected dialog usage here
    @Inject(MAT_DIALOG_DATA) public data: Class // Inject the selected class data
  ) {
    this.editForm = this.fb.group({
      className: ['', [Validators.required]],
      nbOfStudents: ['', [Validators.required, Validators.max(30)]]
    });
  }

  ngOnInit(): void {
    // Pre-fill the form with the data passed in from the selected class
    if (this.data) {
      this.editForm.patchValue({
        className: this.data.name,
        nbOfStudents: this.data.nbOfStudents
      });
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedClass: Class = {
        id: this.data.id,  // keep the same id
        name: this.editForm.value.className,
        nbOfStudents: this.editForm.value.nbOfStudents
      };

      this.classService.updateClass(updatedClass).subscribe(
        () => {
          this.dialogRef.close();  // Close the dialog and pass back the updated class
          
          // Open success dialog
          this.dialog.open(SuccessDialogComponent, {
            width: '300px',
            data: { title: 'Success', message: 'The class was updated successfully!' }  // Pass appropriate data to the success dialog
          });
        },
        (error) => {
          console.error('Error updating class:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
