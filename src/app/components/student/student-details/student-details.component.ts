
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ParentService } from '../../../services/parent/parent.service';
import { ClassServiceService } from '../../../services/class/class-service.service';

@Component({
  selector: 'ssi-sx-student-details',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {
  parentName: string = 'N/A';
  className: string = 'N/A';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StudentDetailsComponent>,
    private parentService: ParentService,
    private classService: ClassServiceService
  ) {}

  ngOnInit(): void {
    this.getParentDetails();
    this.getClassDetails(); 
  }

  getParentDetails(): void {
    this.parentService.getParentById(this.data.parentId).subscribe(
      (parent) => {
        if (parent) {
          this.parentName = `${parent.firstName} ${parent.lastName}`;
        } else {
          console.error('Parent not found');
        }
      },
      (error) => {
        console.error('Error fetching parent details:', error);
      }
    );
  }
  getClassDetails(): void {
    this.classService.getClassById(this.data.classId).subscribe(
      (classData) => {
        if (classData) {
          this.className = classData.name; 
        } else {
          console.error('Class not found');
        }
      },
      (error) => {
        console.error('Error fetching class details:', error);
      }
    );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
