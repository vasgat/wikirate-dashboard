import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../shared/shared-models/company.model';
import {Observable} from 'rxjs';
import {Metric} from '../models/metric.model';
import {APIDataService} from './API-data.service';

@Injectable()
export class SummaryService {
  selectedMetrics: Metric[] = [];
  metrics: Metric[] = [];
  years: number[] = [];
  selectedYear = -1;
  companies: Company[] = [];
  title = 'No Title';
  selectedCompanies: Company[] = [];
  onSummary = false;

  constructor(private http: HttpClient, private aService: APIDataService) {
  }

  loadMetrics() {
    this.aService.getMetrics().subscribe(
      (metrics: Metric[]) => {
        this.metrics = metrics;
      });
  }

  setTitle(title) {
    this.title = title;
  }

  addSelectedMetric(metric: Metric) {
    const index = this.selectedMetrics.indexOf(metric);
    if (this.selectedMetrics.indexOf(metric) >= 0) {
      return;
    } else if (metric !== undefined) {
      this.selectedMetrics.push(metric);
      this.aService.getYears(metric.id).subscribe(
        (years: number[]) => {
          for (const year of years) {
            if (this.years.indexOf(year) < 0) {
              this.years.push(year);
            }
          }
          this.years.sort();
        },
        (error) => console.log(error));
      this.aService.getMetricCompanies(metric.id).subscribe(
        (companies: Company[]) => {
          for (const company of companies) {
            this.companies.push(company);
          }
        },
        (error) => console.log(error));

    } else {
      alert('Please select an existing metric!');
    }
  }

  removeSelectedMetric(metric: Metric) {
    this.selectedMetrics.splice(this.selectedMetrics.indexOf(metric), 1);

    this.years = [];
    for (const m of this.selectedMetrics) {
      this.aService.getYears(m.id).subscribe(
        (years: number[]) => {
          for (const year of years) {
            if (this.years.indexOf(year) < 0) {
              this.years.push(year);
            }
          }
          this.years.sort();
        },
        (error) => console.log(error));
    }

    this.companies = [];
    for (const m of this.selectedMetrics) {
      this.aService.getMetricCompanies(m.id).subscribe(
        (companies: Company[]) => {
          for (const company of companies) {
            this.companies.push(company);
          }
        },
        (error) => console.log(error));
    }
  }

  removeAllSelectedMetrics() {
    this.selectedMetrics = [];
    this.years = [];
    this.companies = [];
  }

  selectYear(year) {
    this.selectedYear = year;
  }

  removeAllSelectedCompanies() {
    this.selectedCompanies = [];
  }

  addSelectedCompany(company: Company) {
    if (this.companies.indexOf(company) >= 0) {
      this.selectedCompanies.push(company);
    } else {
      alert('Please select an existing company!');
    }
  }

  removeSelectedCompany(company: Company) {
    this.selectedCompanies.splice(this.selectedCompanies.indexOf(company), 1);
  }
}
