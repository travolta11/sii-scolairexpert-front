import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student/student.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Category } from '../../enum/level.enum';
import { Color } from '@swimlane/ngx-charts';
import { StaffService } from '../../services/staff/staff.service';

// Interfaces pour typer les données
interface SeriesData {
  name: string;
  value: number;
}

interface ChartData {
  name: string;
  series: SeriesData[];
}

@Component({
  selector: 'ssi-sx-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;
  studentCategories: { [key: string]: number } = { Primaire: 0, College: 0, Lycee: 0 };
  chartData: any[] = [];
  view: [number, number] = [150, 150];
  colorScheme = [
    { name: 'Primaire', value: '#696cff' }, 
    { name: 'Collège', value: '#71dd37' },  
    { name: 'Lycée', value: '#03c3ec' }    
  ];
  primaryLevelStudents: number = 0;
  middleSchoolStudents: number = 0;
  highSchoolStudents: number = 0;
  currentYear: number = new Date().getFullYear();
  currentYearEnrollment: number = 0;
  increasePercentage: number = 0;
  lastTenYearsData: ChartData[] = []; 
  staffCountByDepartment: Map<string, number> = new Map();

  constructor(private studentService: StudentService,private staffService: StaffService) {}

  ngOnInit(): void {
    this.fetchTotalStudents();
    this.fetchStudentsByCategory();
    this.fetchEnrollmentData();
    this.staffService.getStaffCountByDepartment().subscribe(data => {
      this.staffCountByDepartment = new Map(Object.entries(data));
    });
    
  }

  fetchTotalStudents(): void {
    this.studentService.getTotalStudents().subscribe(total => {
      this.totalStudents = total;
    });
  }

  fetchStudentsByCategory(): void {
    this.studentService.getEtudiantsParNiveau().subscribe(data => {
      this.primaryLevelStudents = (data['1er année primaire'] || 0) + (data['2eme année primaire'] || 0) + (data['3eme année primaire'] || 0) +
                                  (data['4eme année primaire'] || 0) + (data['5eme année primaire'] || 0) + (data['6eme année primaire'] || 0);

      this.middleSchoolStudents = (data['1er année college'] || 0) + (data['2eme année college'] || 0) + (data['3eme année college'] || 0);

      this.highSchoolStudents = (data['1er année lycée'] || 0) + (data['2eme année lycée'] || 0) + (data['3eme année lycée'] || 0);

      this.chartData = [
        { name: Category.Primaire, value: this.primaryLevelStudents },
        { name: Category.College, value: this.middleSchoolStudents },
        { name: Category.Lycee, value: this.highSchoolStudents }
      ];

      console.log("Chart Data:", this.chartData);
    });
  }

  fetchEnrollmentData(): void {
    this.studentService.getCountByYear().subscribe((data: { [key: number]: number }) => {
      console.log('Data retrieved from getCountByYear:', data);
  
      const years = Object.keys(data).map(year => +year).sort((a, b) => a - b);
      this.lastTenYearsData = [
        {
          name: 'Enrollment', // Nom de la série, peut être quelconque
          series: years.slice(-10).map(year => ({
            name: year.toString(),
            value: data[year]
          }))
        }
      ];
  
      console.log('Transformed data for ngx-charts:', this.lastTenYearsData);
  
      if (this.lastTenYearsData[0].series.length > 1) {
        const lastYearCount = this.lastTenYearsData[0].series[this.lastTenYearsData[0].series.length - 2].value;
        this.currentYearEnrollment = this.lastTenYearsData[0].series[this.lastTenYearsData[0].series.length - 1].value;
        this.increasePercentage = ((this.currentYearEnrollment - lastYearCount) / lastYearCount) * 100;
      }
    });
  }

  get ngxChartColorScheme(): Color {
    return {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: this.colorScheme.map(scheme => scheme.value),
    };
  }
}
