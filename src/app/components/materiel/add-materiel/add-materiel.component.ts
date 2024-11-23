import { Component, Output, EventEmitter } from '@angular/core';
import { MaterielType } from '../../../enum/materiel-type';
import { CommonModule, NgClass } from '@angular/common';
import { MaterielAvailable } from '../../../enum/materiel-available';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterielService } from '../../../services/materiel/materiel.service';
import { Materiel } from '../../../models/materiel.model';

@Component({
  selector: 'ssi-sx-add-materiel',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-materiel.component.html',
  styleUrl: './add-materiel.component.scss'
})
export class AddMaterielComponent {
  materielsType = MaterielType;
  Status = MaterielAvailable;
  materielForm: FormGroup;
  @Output() materielAdded = new EventEmitter<Materiel>();

  constructor(private materielService: MaterielService) {
    this.materielForm = new FormGroup({
      code: new FormControl("", [Validators.required]),     
      type: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),

    });
  }


  onSubmit() {
    if (this.materielForm.valid) {
      const newMateriel: Materiel = this.materielForm.value;
      this.materielService.addMateriel(newMateriel).subscribe(
        (materiel) => {
          this.materielAdded.emit(materiel);
          this.materielForm.reset;
          this.closeModal();
        }
      );
    
  }else {
    this.materielForm.markAllAsTouched();
  }
}

closeModal() {
  const modalElement = document.getElementById('basicModal');
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
