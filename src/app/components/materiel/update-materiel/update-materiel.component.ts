import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MaterielType } from '../../../enum/materiel-type';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterielAvailable } from '../../../enum/materiel-available';
import { MaterielService } from '../../../services/materiel/materiel.service';
import { CommonModule, NgClass } from '@angular/common';
import { Materiel } from '../../../models/materiel.model';

@Component({
  selector: 'ssi-sx-update-materiel',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,NgClass],
  templateUrl: './update-materiel.component.html',
  styleUrl: './update-materiel.component.scss'
})
export class UpdateMaterielComponent  implements OnInit{
  @Input() materielId?: number;
  @Output() materielUpdated = new EventEmitter<Materiel>();
  materielsType = MaterielType;
  Status = MaterielAvailable;
  materielForm: FormGroup;


  constructor(private materielService: MaterielService) {
    this.materielForm = new FormGroup({
      code: new FormControl("", [Validators.required]),     
      type: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),

    });
  }

  ngOnInit() {
    if (this.materielId) {
      this.loadMaterielDetails(this.materielId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['materielId'] && this.materielId) {
      this.loadMaterielDetails(this.materielId);
    }
  }

loadMaterielDetails(materielId: number) {
    this.materielService.getMaterielById(materielId).subscribe((materiel: Materiel) => {
      this.materielForm.patchValue({
        code: materiel.code,
        type: materiel.type,
        status: materiel.status
        
      });
    });
  }

  onSubmit() {
    if (this.materielForm.valid) {
      const updatedMateriel: Materiel = {
        id: this.materielId,
        ...this.materielForm.value
      };
      this.materielService.updateMateriel(updatedMateriel).subscribe(() => {
        this.materielForm.reset();
        this.materielUpdated.emit(updatedMateriel);
        
        const modal = document.getElementById('updateModal') as any;
        if (modal) {
          modal.classList.remove('show');
          document.body.classList.remove('modal-open');
          modal.style.display = 'none';
          const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
          if (backdrop) {
            backdrop.remove();
          }
        }
      });
    }
}

closeModal() {
  this.materielForm.reset();

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
