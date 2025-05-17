import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidarPasswordModalComponent } from './olvidar-password-modal.component';

describe('OlvidarPasswordModalComponent', () => {
  let component: OlvidarPasswordModalComponent;
  let fixture: ComponentFixture<OlvidarPasswordModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OlvidarPasswordModalComponent]
    });
    fixture = TestBed.createComponent(OlvidarPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
