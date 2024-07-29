import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized';

export const routes: Routes = [
    { path: '', title: 'DashBoard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'unauthorized', component: UnauthorizedComponent },
    // Route example: { path: 'add-student', title: 'Add', component: AddStudentComponent },
    
];

