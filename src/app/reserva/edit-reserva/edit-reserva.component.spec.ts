import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservaComponent } from './edit-reserva.component';

describe('EditReservaComponent', () => {
  let component: EditReservaComponent;
  let fixture: ComponentFixture<EditReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservaComponent]
    });
    fixture = TestBed.createComponent(EditReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
