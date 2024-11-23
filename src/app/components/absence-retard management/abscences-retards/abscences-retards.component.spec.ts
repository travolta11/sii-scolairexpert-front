import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscencesRetardsComponent } from './abscences-retards.component';

describe('AbscencesRetardsComponent', () => {
  let component: AbscencesRetardsComponent;
  let fixture: ComponentFixture<AbscencesRetardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbscencesRetardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbscencesRetardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
