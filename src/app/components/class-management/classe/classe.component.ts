import { Component, OnInit } from '@angular/core';
import {Dialog,DialogModule} from '@angular/cdk/dialog';
import { AddClassComponent } from '../add-class/add-class.component';
import { FormsModule } from '@angular/forms';
import { EditClassComponent } from '../edit-class/edit-class.component';


@Component({
  selector: 'ssi-sx-classe',
  standalone: true,
  imports: [FormsModule,DialogModule],
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  

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

openEditClassDialog(): void {
  this.dialog.open(EditClassComponent,{
   width:'400px'
  });
}


}