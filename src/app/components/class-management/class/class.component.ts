import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {DialogModule} from '@angular/cdk/dialog';
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
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private classService: ClassServiceService) {}

  ngOnInit(): void {
    this.getClasses();
  }

  // Get all classes
  getClasses(): void {
    this.classService.getAllClasses().subscribe(
      (data) => {
        this.classes = data;
        this.filteredClasses = data;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  get totalItems(): number {
    return this.classes.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }
  
  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }  

  // Delete class
  deleteClass(classId: number): void {
    this.classService.deleteClass(classId).subscribe(
      () => {
        this.getClasses(); 
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
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  highlightSearch(text: string): string {
    if (!this.searchTerm) {
      return text;
    }
    const searchTermRegex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(searchTermRegex, '<span class="highlight">$1</span>');
  }
  
}
