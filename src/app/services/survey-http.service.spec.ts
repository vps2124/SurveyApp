import { TestBed } from '@angular/core/testing';

import { SurveyHttpService } from './survey-http.service';

describe('SurveyHttpService', () => {
  let service: SurveyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
