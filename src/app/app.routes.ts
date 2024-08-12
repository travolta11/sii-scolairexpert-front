import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { ManageUserComponent } from './components/user/manage-user/manage-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AddTeacherComponent } from './components/Teacher/add-teacher/add-teacher.component';
import { ListTeacherComponent } from './components/Teacher/list-teacher/list-teacher.component';
import {StaffListComponent} from "./components/staff/staff-list/staff-list.component";

import { UserDetailComponent } from './components/user/show-user/show-user.component';

export const routes: Routes = [
    {'path': 'login',  component:LoginComponent },
    { path: '', title: 'DashBoard', component: DashboardComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {'path': 'manage-users', 'title': 'User Management', component: ManageUserComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {'path': 'add-user', 'title': 'Add User', component: AddUserComponent},
    { path: 'manage-users/user-detail/:id', component: UserDetailComponent },
    // Route example: { path: 'add-student', title: 'Add', component: AddStudentComponent },
    {path:'addTeacher',component:AddTeacherComponent},
    {path:'listTeacher',component:ListTeacherComponent},
    {'path': 'staff', 'title': 'StaffList', component: StaffListComponent},
    //Route example {'path': 'add-student', 'title': 'add', component: AddStudentComponent},


];

