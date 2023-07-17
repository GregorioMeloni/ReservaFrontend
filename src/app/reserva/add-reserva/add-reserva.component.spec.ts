import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservaComponent } from './add-reserva.component';

describe('AddReservaComponent', () => {
  let component: AddReservaComponent;
  let fixture: ComponentFixture<AddReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReservaComponent]
    });
    fixture = TestBed.createComponent(AddReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
