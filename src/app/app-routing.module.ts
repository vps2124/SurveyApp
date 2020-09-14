import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyViewComponent } from './components/survey-view/survey-view.component';

const routes: Routes = [{ path: 'survey', component: SurveyComponent },
{ path: 'success', component: SurveyViewComponent },
{ path: '', redirectTo: '/survey', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
