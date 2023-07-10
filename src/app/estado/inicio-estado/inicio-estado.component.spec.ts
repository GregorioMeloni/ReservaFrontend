import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEstadoComponent } from './inicio-estado.component';

describe('InicioEstadoComponent', () => {
  let component: InicioEstadoComponent;
  let fixture: ComponentFixture<InicioEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioEstadoComponent]
    });
    fixture = TestBed.createComponent(InicioEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
