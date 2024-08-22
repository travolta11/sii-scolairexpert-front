import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Materiel } from '../../../models/materiel.model';
import { MaterielService } from '../../../services/materiel/materiel.service';

@Component({
  selector: 'ssi-sx-show-materiel',
  standalone: true,
  imports: [],
  templateUrl: './show-materiel.component.html',
  styleUrl: './show-materiel.component.scss'
})
export class ShowMaterielComponent implements OnChanges {

  @Input() materielId?: number;
  materiel?: Materiel;

  constructor(private materielService: MaterielService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materielId'] && this.materielId) {
      this.loadMaterielDetails(this.materielId);
    }
  }

  private loadMaterielDetails(materielId: number) {
    this.materielService.getMaterielById(materielId).subscribe(
      (data: Materiel) => {
        this.materiel = data;
      },
      error => {
        console.error('Error loading materiel details:', error);
      }
    );
  }


  
}
