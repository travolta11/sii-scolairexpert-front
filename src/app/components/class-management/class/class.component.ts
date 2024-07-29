import { Component, OnInit } from '@angular/core';
import {Dialog,DialogModule} from '@angular/cdk/dialog';
import { AddClassComponent } from '../add-class/add-class.component';
import { FormsModule } from '@angular/forms';
import { EditClassComponent } from '../edit-class/edit-class.component';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'ssi-sx-classe',
  standalone: true,
  imports: [FormsModule,DialogModule,CommonModule ],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClasseComponent implements OnInit {
  classes = [
    { name: 'SVT', students: 20 },
    { name: 'Math', students: 25 },
    { name: 'Physics', students: 18 },
    // Ajoutez plus de classes si nécessaire
  ];

  constructor(public dialog: Dialog) {}
  ngOnInit(): void {
  }
// Method to handle the opening of a dialog to add a new class

openAddClassDialog(): void {
    this.dialog.open(AddClassComponent,{
     width:'400px'
    });
  }

// Method to handle the opening of a dialog to edit an existing class

openEditClassDialog(classItem: any): void {
  this.dialog.open(EditClassComponent,{
   width:'400px'
  });
}


}