import { Routes } from '@angular/router';
import { AddClassComponent } from './components/class-management/add-class/add-class.component';
import { ClasseComponent } from './components/class-management/class/class.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/user/manage-user/manage-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized';
import { AddTeacherComponent } from './components/Teacher/add-teacher/add-teacher.component';
import { ListTeacherComponent } from './components/Teacher/list-teacher/list-teacher.component';
import { UserDetailComponent } from './components/user/show-user/show-user.component';

export const routes: Routes = [
    { path: '', title: 'DashBoard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {'path': 'manage-users', 'title': 'User Management', component: ManageUserComponent},
    {'path': 'add-user', 'title': 'Add User', component: AddUserComponent},
    { path: 'manage-users/user-detail/:id', component: UserDetailComponent },
    {'path': 'class',  component:ClasseComponent },
    // Route example: { path: 'add-student', title: 'Add', component: AddStudentComponent },
    
    {path:'addTeacher',component:AddTeacherComponent},
    {path:'listTeacher',component:ListTeacherComponent},

    //Route example {'path': 'add-student', 'title': 'add', component: AddStudentComponent},
   

];

