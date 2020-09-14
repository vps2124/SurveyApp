import { Component, OnInit } from '@angular/core';
import { SurveyHttpService } from '../../services/survey-http.service'
import { Survey } from 'src/app/models/survey.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup;
  survey: Survey;
  active: boolean;
  case: boolean;
  activity: boolean;
  caseCloser: string;
  activityCloser: string;
  surveyAccess: string;
  isError: boolean;
  errorMsg: string;

  constructor(private survayService: SurveyHttpService,
    private router: Router,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.active = false;
    this.case = false;
    this.activity = false;
    this.caseCloser = '';
    this.activityCloser = '';
    this.surveyAccess = 'SA';
    this.isError = false;
    this.errorMsg = '';
    this.formInit();
  }

  formInit() {
    this.survey = new Survey();
    this.survey.surveyAccessibility = this.surveyAccess;
    this.surveyForm = new FormGroup({
      'active': new FormControl(this.survey.active),
      'surveyName': new FormControl(this.survey.surveyName, Validators.required),
      'surveyExpDate': new FormControl(this.survey.surveyExpDate, Validators.required),
      'surveyURL': new FormControl(this.survey.surveyURL, Validators.required),
      'surveyEmail': new FormControl(this.survey.surveyEmail, Validators.required),
      'caseClosure': new FormControl(this.survey.surveyTrigger),
      'activityClosure': new FormControl(this.survey.surveyTrigger),
      'surveyAccessibility': new FormControl(this.survey.surveyAccessibility, Validators.required)
    });

    this.surveyForm.get('active').valueChanges.subscribe(val => {
      if (val) {
        this.active = true;
      } else {
        this.active = false;
      }
    });

    this.surveyForm.get('surveyName').valueChanges.subscribe(val => {
      if (val) {
        this.survey.surveyName = val;
      }
    });

    this.surveyForm.get('surveyExpDate').valueChanges.subscribe(val => {
      if (val) {
        this.survey.surveyExpDate = val;
      }
    });

    this.surveyForm.get('surveyURL').valueChanges.subscribe(val => {
      if (val) {
        this.survey.surveyURL = val;
      }
    });

    this.surveyForm.get('surveyEmail').valueChanges.subscribe(val => {
      if (val) {
        this.survey.surveyEmail = val;
      }
    });

    this.surveyForm.get('caseClosure').valueChanges.subscribe(val => {
      if (val) {
        this.case = val;
      } else {
        this.case = false;
      }
    });

    this.surveyForm.get('activityClosure').valueChanges.subscribe(val => {
      if (val) {
        this.activity = val;
      } else {
        this.activity = false;
      }
    });

    this.surveyForm.get('surveyAccessibility').valueChanges.subscribe(val => {
      if (val) {
        this.survey.surveyAccessibility = val;
      }
    });
  }


  save() {
    this.SpinnerService.show();
    this.survey.id = Math.floor(Math.random() * 100);
    this.survey.active = false;
    if (this.active) {
      this.survey.active = true;
    }
    if (this.case) {
      this.caseCloser = 'CaseClosure';
    }
    if (this.activity) {
      this.activityCloser = 'ActivityClosure';
    }
    this.survey.surveyTrigger = this.caseCloser + ' - ' + this.activityCloser;
    this.subscribeToCreateResponse(this.survayService.createSurvey(this.survey));
  }

  private subscribeToCreateResponse(result: Observable<Survey>) {
    result.subscribe((res: Survey) =>
      this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
  }

  private onSaveSuccess(result: Survey) {
    this.router.navigateByUrl('/success');
  }
  private onSaveError(error) {
    this.isError = true;
    this.errorMsg = 'Could not save survey at this time please try again!';
  }

}
