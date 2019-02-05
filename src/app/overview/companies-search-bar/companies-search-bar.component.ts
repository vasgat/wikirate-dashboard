import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../shared/shared-models/company.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CompaniesService} from '../../shared/shared-services/companies.service';
import {map, startWith} from 'rxjs/operators';
import {OverviewService} from '../services/overview.service';

@Component({
  selector: 'app-companies-search-bar',
  templateUrl: './companies-search-bar.component.html',
  styleUrls: ['./companies-search-bar.component.css']
})
export class CompaniesSearchBarComponent implements OnInit {
  companies: Company[] = [];
  companyCtrl = new FormControl();
  filteredCompanies: Observable<Company[]>;

  constructor(private cService: CompaniesService, private oService: OverviewService) {
  }

  ngOnInit() {
    this.cService.getCompanies().subscribe(
      (companies: Company[]) => {
        this.companies = companies;
        console.log(this.companies.length);
      },
      (error) => console.log(error));
  }

  private _filterCompany(value: string): Company[] {
    const filterValue = value.toLowerCase();

    return Array.from(this.companies).filter(company => company.name.toLowerCase().indexOf(filterValue) === 0);
  }

  searchCompany(content) {
    if (this.companies.length === 0) {
      return;
    }
    if (this.companies.length < 1000 || content.value.length >= 1) {
      this.filteredCompanies = this.companyCtrl.valueChanges
        .pipe(
          startWith(content.value),
          map(company => company ? this._filterCompany(company) : Array.from(this.companies).slice())
        );
    } else {
      this.filteredCompanies = this.companyCtrl.valueChanges
        .pipe(
          startWith(''),
          map(company => company ? this._filterCompany(company) : Array.from(this.companies).slice(0, 1000))
        );
    }
  }

  onCompanySelect(content, company: Company) {
    this.oService.setCompany(company);
    content.value = company.name;
    content.id = company.id;

  }
}
