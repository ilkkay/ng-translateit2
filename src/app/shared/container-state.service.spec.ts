import { TestBed, inject } from '@angular/core/testing';

import { ContainerStateService } from './container-state.service';

describe('ContainerStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerStateService]
    });
  });

  it('should be created', inject([ContainerStateService], (service: ContainerStateService) => {
    expect(service).toBeTruthy();
  }));
});
