/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiettrackerService } from './diettracker.service';

describe('Service: Diettracker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiettrackerService]
    });
  });

  it('should ...', inject([DiettrackerService], (service: DiettrackerService) => {
    expect(service).toBeTruthy();
  }));
});
