import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarCertificatComponent } from './scolar-certificat.component';

describe('ScolarCertificatComponent', () => {
  let component: ScolarCertificatComponent;
  let fixture: ComponentFixture<ScolarCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolarCertificatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScolarCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
