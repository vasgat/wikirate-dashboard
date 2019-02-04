import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OverviewComponent} from './overview/overview.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {CompaniesService} from './shared/shared-services/companies.service';
import {HttpClientModule} from '@angular/common/http';
import {DropdownDirective} from './overview/directives/dropdown.directive';
import { CompaniesSearchBarComponent } from './overview/companies-search-bar/companies-search-bar.component';
import {AnswersService} from './shared/shared-services/answers.service';
import {ChartService} from './shared/shared-services/chart.service';
import { SummaryGeneratorComponent } from './compare/summary-generator/summary-generator.component';
import {YearSelectComponent} from './compare/summary-generator/year-select/year-select.component';
import {MetricsSearchComponent} from './compare/summary-generator/metrics-search/metrics-search.component';
import {InputSummaryTitleComponent} from './compare/summary-generator/input-summary-title/input-summary-title.component';
import {CompaniesSearchComponent} from './compare/summary-generator/companies-search/companies-search.component';
import {CompanyModalComponent} from './compare/summary-generator/companies-search/company-modal/company-modal.component';
import {MetricModalComponent} from './compare/summary-generator/metrics-search/metric-modal/metric-modal.component';
import {SummaryService} from './compare/compare-services/summary.service';
import {APIDataService} from './compare/compare-services/API-data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SummaryComponent} from './compare/summary/summary.component';
import {CompanyComponent} from './compare/summary/company/company.component';
import {TableHeaderComponent} from './compare/summary/table-header/table-header.component';
import { HelpComponent } from './help/help.component';

const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'overview', component: OverviewComponent
  },
  {
    path: 'summary_generator', component: SummaryGeneratorComponent
  },
  {
    path: 'summary', component: SummaryComponent
  },
  {
    path: 'help', component: HelpComponent
  },
  {path: '404', component: ErrorPageComponent, data: {message: 'Page not found'}},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    DropdownDirective,
    AppComponent,
    DashboardComponent,
    OverviewComponent,
    ErrorPageComponent,
    CompaniesSearchBarComponent,
    SummaryGeneratorComponent,
    YearSelectComponent,
    MetricsSearchComponent,
    InputSummaryTitleComponent,
    CompaniesSearchComponent,
    CompanyModalComponent,
    MetricModalComponent,
    SummaryComponent,
    CompanyComponent,
    TableHeaderComponent,
    HelpComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [CompaniesService, AnswersService, ChartService, SummaryService, APIDataService],
  bootstrap: [AppComponent],
  entryComponents: [MetricModalComponent, CompanyModalComponent]
})
export class AppModule {
}
