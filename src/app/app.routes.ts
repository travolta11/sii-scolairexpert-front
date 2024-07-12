import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized';

export const routes: Routes = [
    { path: '', title: 'DashBoard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {'path': 'manage-user', 'title': 'User Management', component: ManageUserComponent}
    // Route example: { path: 'add-student', title: 'Add', component: AddStudentComponent },
    
];

