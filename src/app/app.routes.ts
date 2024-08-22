import { Routes } from '@angular/router';
import { AddClassComponent } from './components/class-management/add-class/add-class.component';
import { ClasseComponent } from './components/class-management/class/class.component';
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
import { StudentComponent } from './components/student/student/student.component';
import { ParentComponent } from './components/parent/parent/parent.component';
import { AbscencesRetardsComponent } from './components/absence-retard management/abscences-retards/abscences-retards.component';
import { MaterielComponent } from './components/materiel/materiel.component';

export const routes: Routes = [
    {'path': 'login',  component:LoginComponent },
    { path: '', title: 'DashBoard', component: DashboardComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {'path': 'manage-users', 'title': 'User Management', component: ManageUserComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {'path': 'add-user', 'title': 'Add User', component: AddUserComponent},
    { path: 'manage-users/user-detail/:id', component: UserDetailComponent },
    {'path': 'class',  component:ClasseComponent },
    {path:'addTeacher',component:AddTeacherComponent},
    {path:'listTeacher',component:ListTeacherComponent},
    {'path': 'staff', 'title': 'StaffList', component: StaffListComponent},
    {'path': 'student', 'title': 'student', component: StudentComponent},
    {'path': 'parent', 'title': 'parent', component: ParentComponent},
    {'path': 'abscencesRetards', 'title': 'abscencesRetards', component: AbscencesRetardsComponent},
    //Route example {'path': 'add-student', 'title': 'add', component: AddStudentComponent},

    //materiel
    {'path': 'materiel', title: 'materiel', component: MaterielComponent},
];

