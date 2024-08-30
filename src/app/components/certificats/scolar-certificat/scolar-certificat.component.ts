import {Component, OnInit} from '@angular/core';
import {ClassServiceService} from "../../../services/class/class-service.service";
import {Class} from "../../../model/class";
import {CommonModule, DatePipe} from "@angular/common";
import {StudentService} from "../../../services/student/student.service";
import {Student} from "../../../models/student/student";
import {PdfService} from "../../../services/pdfGenerator/pdf.service";

@Component({
  selector: 'ssi-sx-scolar-certificat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scolar-certificat.component.html',
  styleUrl: './scolar-certificat.component.scss'
})
export class ScolarCertificatComponent implements  OnInit{
  classes: Class[] = [];
  allStudents: Student[]=[];
  filteredStudents : Student []=[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchValue: string ='';
  formattedDate: any;

  constructor(
    private classService :ClassServiceService,
    private studentService:StudentService,
    private pdfService: PdfService,
    private datePipe: DatePipe
  ) {
    const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(currentDate, 'MMMM d, yyyy');
  }
  ngOnInit(): void {
    this.loadClasses();
    this.loadStudents();
  }
  loadClasses(): void {
    this.classService.getAllClasses().subscribe(classes => {
      this.classes = classes;
    });
  }
  loadStudents(): void {
  this.studentService.getAllStudents().subscribe(students => {
    this.allStudents=students;
    this.filteredStudents=students;
  })
}

  get totalItems(): number {
    return this.allStudents.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, endIndex);
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

  updateVisibleData() {
    this.filteredStudents = this.allStudents.filter(student =>
      student.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      student.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) );

  }
  onSearchTermChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target?.value || '';
    this.searchValue = searchValue;
    this.currentPage = 1;
    this.updateVisibleData();
  }

  generateScolarCertificat(student:Student){
    this.pdfService.generatePDF(student.firstName+" "+student.lastName,student.id,student.dateOfBirth.toString(),student.level,this.formattedDate);
  }

  onClassSelected(event: any): void {
    this.studentService.getStudentsByClassId(event.target.value).subscribe((data) => {
      this.filteredStudents = data;
    });
  }
}
