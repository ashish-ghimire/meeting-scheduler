import { TestBed } from '@angular/core/testing';

import { MeetingDataService } from './meeting-data.service';

describe('MeetingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingDataService = TestBed.get(MeetingDataService);
    expect(service).toBeTruthy();
  });
});
