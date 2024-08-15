import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../../services/parent/parent.service';
import { Parent } from '../../../models/parent/parent';
import { ParentEditComponent } from '../parent-edit/parent-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ParentFormComponent } from '../parent-form/parent-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ssi-sx-parent',
  templateUrl: './parent.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  parents: Parent[] = [];
  selectedParent?: Parent;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  searchTerm: string = '';
  filteredParent: Parent[] = [];

  constructor(private parentService: ParentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadParents(this.currentPage);
  }

  loadParents(page: number): void {
    this.parentService.getParents(page, this.pageSize).subscribe(response => {
      if (response && response.content) {
        this.parents = response.content;
        this.filteredParent = this.parents;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      }
    });
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadParents(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadParents(this.currentPage + 1);
    }
  }

  deleteParent(id: number): void {
    if (confirm('Are you sure you want to delete this parent?')) {
      this.parentService.deleteParent(id).subscribe(() => {
        this.loadParents(this.currentPage);
      });
    }
  }

  openInscriptionModal(): void {
    const dialogRef = this.dialog.open(ParentFormComponent);
    dialogRef.componentInstance.parentAdded.subscribe(() => {
      this.loadParents(this.currentPage);
    });
  }

  editParent(parent: Parent): void {
    this.dialog.open(ParentEditComponent, {
      data: parent
    }).afterClosed().subscribe(() => {
      this.loadParents(this.currentPage);
    });
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredParent = this.parents.filter(parentItem =>
        parentItem.cin.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredParent = this.parents;
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
