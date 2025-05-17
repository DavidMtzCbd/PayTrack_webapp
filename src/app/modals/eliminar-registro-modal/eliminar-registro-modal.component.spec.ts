import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRegistroModalComponent } from './eliminar-registro-modal.component';

describe('EliminarRegistroModalComponent', () => {
  let component: EliminarRegistroModalComponent;
  let fixture: ComponentFixture<EliminarRegistroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarRegistroModalComponent]
    });
    fixture = TestBed.createComponent(EliminarRegistroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
