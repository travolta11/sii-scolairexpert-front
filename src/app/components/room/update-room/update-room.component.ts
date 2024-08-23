import { CommonModule, NgClass } from '@angular/common';
import { Component,  } from '@angular/core';
import {   FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'ssi-sx-update-room',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.scss'
})
export class UpdateRoomComponent {

  roomForm: FormGroup;
  materielOptions = [
    { id: 1, name: 'Materiel 1' },
    { id: 2, name: 'Materiel 2' },
    { id: 3, name: 'Materiel 3' },
  ];

  constructor() {
    this.roomForm = new FormGroup({
      name: new FormControl("", [Validators.required]),     
      capacity: new FormControl("", [Validators.required]),
      materiel: new FormControl("", [Validators.required]),

    });
  }
  

  onSubmit(): void {
    if (this.roomForm.valid) {
      const roomData = this.roomForm.value;
      console.log(roomData);
      this.roomForm.reset();
      this.closeModal();
    }
  }
  
  onCancel(): void {
    this.roomForm.reset();
  }
  closeModal() {
    const modalElement = document.getElementById('addModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
      modalElement.style.display = 'none';
  
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

}
