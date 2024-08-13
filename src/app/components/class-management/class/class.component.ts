import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {Dialog,DialogModule} from '@angular/cdk/dialog';
import { AddClassComponent } from '../add-class/add-class.component';
import { FormsModule } from '@angular/forms';
import { EditClassComponent } from '../edit-class/edit-class.component';
import { CommonModule } from '@angular/common';
import { Class } from '../../../model/class';
import { ClassServiceService } from '../../../services/class/class-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'ssi-sx-classe',
  standalone: true,
  imports: [FormsModule,DialogModule,CommonModule,MatPaginatorModule],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClasseComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  classes: Class[] = [];
  filteredClasses: Class[] = [];
  paginatedClasses: Class[] = [];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private classService: ClassServiceService) {}

  ngOnInit(): void {
    this.getClasses();
  }

  paginateClasses(): void {
    const startIndex = this.paginator!.pageIndex * this.paginator!.pageSize;
    this.paginatedClasses = this.filteredClasses.slice(startIndex, startIndex + this.paginator!.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.paginateClasses();
  }

  // Get all classes
  getClasses(): void {
    this.classService.getAllClasses().subscribe(
      (data) => {
        this.classes = data;
        this.filteredClasses = data;
        this.paginateClasses(); // Apply pagination after fetching classes
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  // Delete class
  deleteClass(classId: number): void {
    this.classService.deleteClass(classId).subscribe(
      () => {
        this.getClasses(); // Refresh the classes list after deletion
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: {
            title: "Delete",
            message: "The class was deleted successfully"
          }
        });
      },
      (error) => {
        this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          data: {
            title: "Error",
            message: error.message
          }
        });
      }
    );
  }

  // Method to handle the opening of a dialog to add a new class
  openAddClassDialog(): void {
    const dialogRef = this.dialog.open(AddClassComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClasses(); // Refresh the classes list after the dialog is closed
    });
  }

  // Method to handle the opening of a dialog to edit an existing class
  openEditClassDialog(classItem: Class): void {
    const dialogRef = this.dialog.open(EditClassComponent, {
      width: '400px',
      data: classItem
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClasses(); // Refresh the classes list after the dialog is closed
    });
  }

  // Apply filter
  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredClasses = this.classes.filter(classItem =>
        classItem.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredClasses = this.classes;
    }
    this.paginateClasses(); // Apply pagination after filtering
  }

  highlightSearch(text: string): string {
    if (!this.searchTerm) {
      return text;
    }
    const searchTermRegex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(searchTermRegex, '<span class="highlight">$1</span>');
  }
}
