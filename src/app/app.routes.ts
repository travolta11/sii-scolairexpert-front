import { Routes } from '@angular/router';
import { AddClassComponent } from './components/class-management/add-class/add-class.component';
import { ClasseComponent } from './components/class-management/classe/classe.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {'path': '', 'title': 'DashBoard', component: DashboardComponent},
     {'path': 'classe',  component:ClasseComponent },
     {'path':'add-class',component:AddClassComponent}
    //Route example {'path': 'add-student', 'title': 'add', component: AddStudentComponent},

];
