import { TestBed } from '@angular/core/testing';

import { EspacioFisicoService } from './espacio-fisico.service';

describe('EspacioFisicoService', () => {
  let service: EspacioFisicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspacioFisicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
