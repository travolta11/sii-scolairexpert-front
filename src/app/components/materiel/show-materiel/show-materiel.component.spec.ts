import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaterielComponent } from './show-materiel.component';

describe('ShowMaterielComponent', () => {
  let component: ShowMaterielComponent;
  let fixture: ComponentFixture<ShowMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMaterielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
