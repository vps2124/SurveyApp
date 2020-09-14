import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model'

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  httpSurvey: string;

  constructor(private http: HttpClient) {
    this.httpSurvey = "https://okve2i6lfb.execute-api.ap-south-1.amazonaws.com/dev/survey";
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post(this.httpSurvey, survey);
  }

}
