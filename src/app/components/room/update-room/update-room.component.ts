import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Room } from '../../../models/room/room.module';
import { RoomService } from '../../../services/room/room-service.service';
import { Materiel } from '../../../models/materiel.model';
import { MaterielService } from '../../../services/materiel/materiel.service';

@Component({
  selector: 'ssi-sx-update-room',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss'] // Changed to styleUrls
})
export class UpdateRoomComponent {

  @Input() room: Room | undefined;
  @Output() roomUpdated: EventEmitter<void> = new EventEmitter<void>(); // Emit event when room is updated

  roomForm: FormGroup;
  materielOptions: Materiel[] = [];

  constructor(private roomService: RoomService, private materielService: MaterielService) {
    this.roomForm = new FormGroup({
      name: new FormControl("", [Validators.required]),     
      capacity: new FormControl("", [Validators.required]),
      materiel: new FormControl("", [Validators.required]),
    });
    this.loadMateriels(); // Call method correctly
  }

  loadMateriels(): void {
    this.materielService.getMateriel().subscribe((materiels: Materiel[]) => {
      this.materielOptions = materiels;
    });
  }

  ngOnChanges(): void {
    if (this.room) {
      this.roomForm.patchValue({
        name: this.room.name,
        capacity: this.room.capacity,
        materiel: this.room.materielIds
      });
    }
  }

  onSubmit(): void {
    if (this.roomForm.valid && this.room) {
      const updatedRoom = {
        ...this.room,
        ...this.roomForm.value,
      };
      this.roomService.updateRoom(updatedRoom).subscribe(() => {
        this.roomUpdated.emit(); // Emit event after room is updated
        this.closeModal();
      });
    }
  }
  
  closeModal(): void {
    const modalElement = document.getElementById('updateModal');
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

  onCancel(): void {
    this.roomForm.reset();
  }
}
