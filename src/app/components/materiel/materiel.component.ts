import { Component } from '@angular/core';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';

@Component({
  selector: 'ssi-sx-materiel',
  standalone: true,
  imports: [AddMaterielComponent],
  templateUrl: './materiel.component.html',
  styleUrl: './materiel.component.scss'
})
export class MaterielComponent {

}
