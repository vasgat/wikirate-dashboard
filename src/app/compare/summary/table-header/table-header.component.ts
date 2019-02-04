import {Component, OnInit} from '@angular/core';
import {Company} from '../../../shared/shared-models/company.model';
import {Metric} from '../../models/metric.model';
import {SummaryService} from '../../compare-services/summary.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  selectedMetrics: Metric[] = [];
  companies: Company[] = [];
  ascending = true;

  constructor(private sService: SummaryService) {
    this.selectedMetrics = sService.selectedMetrics;
    this.companies = sService.selectedCompanies;
  }

  ngOnInit() {
  }

  sortTable(metric: Metric, i: number) {
    if (metric.type.includes('Money') || metric.type.includes('Number')) {
      if (this.ascending) {
        this.companies = this.companies.sort((a: Company, b: Company) => {
          if (a.answers[i].value === 'Unknown') {
            return -1;
          } else if (b.answers[i].value === 'Unknown') {
            return 1;
          } else {
            return Number(a.answers[i].value) > Number(b.answers[i].value) ? 1 : -1;
          }
        });
        this.ascending = false;
      } else {
        this.companies = this.companies.sort((a: Company, b: Company) => {
          if (a.answers[i].value === 'Unknown') {
            return 1;
          } else if (b.answers[i].value === 'Unknown') {
            return -1;
          } else {
            return Number(a.answers[i].value) > Number(b.answers[i].value) ? -1 : 1;
          }
        });
        this.ascending = true;
      }
    } else {
      if (this.ascending) {
        this.companies = this.companies.sort( (a: Company, b: Company) => a.answers[i].value > b.answers[i].value ? 1 : -1);
        this.ascending = false;
      } else {
        this.companies = this.companies.sort( (a: Company, b: Company) => a.answers[i].value > b.answers[i].value ? -1 : 1);
        this.ascending = true;
      }
    }
  }

}
