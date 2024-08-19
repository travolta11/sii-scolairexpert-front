import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Absence } from '../../../models/absence.model';
import { Retard } from '../../../models/retard.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ssi-sx-details-dialog-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  template: `
  <div class="card" style="max-height: 80vh; max-width: 80vh; overflow-y: auto;">
    <div class="card-header">
      <h4>Details</h4>
    </div>
    <div class="card-body">
    <h2>Absences</h2>
    <div class="table-responsive text-nowrap mb-4">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let absence of data.absences">
                <td>{{ absence.date }}</td>
                <td>{{ absence.reason }}</td>
              </tr>
            </tbody>
          </table>
    </div>
    <h2>Tardiness</h2>
    <div class="table-responsive text-nowrap mb-4">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let retard of data.retards">
                <td>{{ retard.date }}</td>
                <td>{{ retard.reason }}</td>
              </tr>
            </tbody>
          </table>
    </div> 
    <div class="card-footer">
          <button type="button" class="btn btn-outline-danger" (click)="onClose()">Close</button>
    </div>
    </div>
  `,
  styles: ``
})
export class DetailsDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { absences: Absence[], retards: Retard[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
