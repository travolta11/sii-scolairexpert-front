import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/user/manage-user/manage-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized';

export const routes: Routes = [
    { path: '', title: 'DashBoard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {'path': 'manage-users', 'title': 'User Management', component: ManageUserComponent},
    {'path': 'add-user', 'title': 'Add User', component: AddUserComponent}
    // Route example: { path: 'add-student', title: 'Add', component: AddStudentComponent },
    
];

