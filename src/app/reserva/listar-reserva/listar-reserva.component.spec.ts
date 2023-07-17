import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarReservaComponent]
    });
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
