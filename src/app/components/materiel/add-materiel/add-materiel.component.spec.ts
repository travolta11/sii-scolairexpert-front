import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterielComponent } from './add-materiel.component';

describe('AddMaterielComponent', () => {
  let component: AddMaterielComponent;
  let fixture: ComponentFixture<AddMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
