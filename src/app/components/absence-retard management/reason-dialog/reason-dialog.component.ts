import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsenceService } from '../../../services/absence/absence.service';
import { RetardService } from '../../../services/retard/retard.service';

@Component({
  selector: 'ssi-sx-reason-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.scss']
})
export class ReasonDialogComponent {
  reasonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number, date: string, absenceChecked: boolean, retardChecked: boolean },
    private absenceService: AbsenceService,
    private retardService: RetardService
  ) {
    this.reasonForm = this.fb.group({
      absenceReason: [''],
      tardinessReason: ['']
    });

    this.loadReasons();
  }

  loadReasons(): void {
    const { studentId, date } = this.data;

    if (this.data.absenceChecked) {
      this.absenceService.getAbsenceByStudentIdAndDate(studentId, date).subscribe(absence => {
        this.reasonForm.patchValue({ absenceReason: absence?.reason || '' });
      });
    }

    if (this.data.retardChecked) {
      this.retardService.getRetardByStudentIdAndDate(studentId, date).subscribe(retard => {
        this.reasonForm.patchValue({ tardinessReason: retard?.reason || '' });
      });
    }
  }

  saveReasons(): void {
    const { studentId, date } = this.data;
    const formValues = this.reasonForm.value;

    if (this.data.absenceChecked) {
      const absenceData = { studentId, date, reason: formValues.absenceReason };
      this.absenceService.updateAbsenceReason(absenceData);
    }

    if (this.data.retardChecked) {
      const retardData = { studentId, date, reason: formValues.tardinessReason };
      this.retardService.updateRetardReason(retardData);
    }

    this.dialogRef.close();
  }
}
