import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoomService } from '../../../services/room/room-service.service';
import { MaterielService } from '../../../services/materiel/materiel.service';
import { Materiel } from '../../../models/materiel.model';
import { Room } from '../../../models/room/room.module';
@Component({
  selector: 'ssi-sx-add-room',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {

  roomForm: FormGroup;
  materielOptions: Materiel[] = [];

  @Output() roomAdded = new EventEmitter<Room>();

  constructor(private roomService: RoomService, private materielService: MaterielService) {
    this.roomForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      capacity: new FormControl("", [Validators.required]),
      materiel: new FormControl([], [Validators.required]),
    });

    this.loadMateriels();
  }

  loadMateriels(): void {
    this.materielService.getMateriel().subscribe((materiels: Materiel[]) => {
      this.materielOptions = materiels;
      console.log(this.materielOptions); 
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const formValues = this.roomForm.value;

      const roomData: Room = {
        name: formValues.name,
        capacity: formValues.capacity,
        materielIds: formValues.materiel,
        id:0
      };
  
      this.roomService.createRoom(roomData).subscribe(() => {
        console.log(this.roomForm.value);
        this.roomForm.reset();
        this.closeModal();
        this.roomAdded.emit(); 
      });
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
    }
  
    const body = document.body;
    if (body.classList.contains('modal-open')) {
      body.classList.remove('modal-open');
      body.style.overflow = '';
    }
  
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
  
}
