import {Component, OnInit} from '@angular/core';
import {SummaryService} from '../../compare-services/summary.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Company} from '../../../shared/shared-models/company.model';
import {MetricAnswer} from '../../../shared/shared-models/metric-answer.model';
import {startWith, map} from 'rxjs/operators';
import {APIDataService} from '../../compare-services/API-data.service';
import {CompanyModalComponent} from './company-modal/company-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companies-search',
  templateUrl: './companies-search.component.html',
  styleUrls: ['./companies-search.component.css']
})
export class CompaniesSearchComponent {
  filteredCompanies: Observable<Company[]>;
  companyCtrl = new FormControl();
  isCollapsed = true;

  constructor(public sService: SummaryService, private aService: APIDataService,
              public modalService: NgbModal) {
  }

  private _filterCompany(value: string): Company[] {
    const filterValue = value.toLowerCase();

    return Array.from(this.sService.companies).filter(company => company.name.toLowerCase().indexOf(filterValue) === 0);
  }

  async onAddCompany(inputField) {
    const company = Array.from(this.sService.companies).find(myObj => myObj.id === +inputField.id);

    company.answers = [];
    if (this.sService.onSummary) {
      for (const metric of this.sService.selectedMetrics) {
        await this.aService.getAnswer(metric.id, company.name, this.sService.selectedYear.toString()).then(
          (answer: MetricAnswer) => {
            if (metric.type === 'Number' || metric.type === 'Money') {
              answer.beautified_value = this.aService.beautifyNum(answer.value);
            }
            company.answers[this.sService.selectedMetrics.findIndex(m => m.id === metric.id)] = answer;

          });
      }
    }
    this.sService.addSelectedCompany(company);
  }


  onSelectedCompany(content, company: Company) {
    content.value = company.name;
    content.id = company.id;
  }

  searchCompany(content) {
    if (this.sService.companies.length < 2500 || content.value.length >= 1) {
      this.filteredCompanies = this.companyCtrl.valueChanges
        .pipe(
          startWith(content.value),
          map(company => company ? this._filterCompany(company) : Array.from(this.sService.companies).slice())
        );
    } else {
      this.filteredCompanies = this.companyCtrl.valueChanges
        .pipe(
          startWith(''),
          map(company => company ? this._filterCompany(company) : Array.from(this.sService.companies).slice(0, 2000))
        );
    }
  }

  openInfo(company) {
    const modalRef = this.modalService.open(CompanyModalComponent);
    modalRef.componentInstance.company = company;
  }

  onKeydown(content) {
    this.searchCompany(content);
  }

}
