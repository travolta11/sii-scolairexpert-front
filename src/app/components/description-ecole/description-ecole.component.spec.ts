import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEcoleComponent } from './description-ecole.component';

describe('DescriptionEcoleComponent', () => {
  let component: DescriptionEcoleComponent;
  let fixture: ComponentFixture<DescriptionEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionEcoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
