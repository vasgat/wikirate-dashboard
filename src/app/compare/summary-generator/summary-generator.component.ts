import {Component, OnInit} from '@angular/core';
import {SummaryService} from '../compare-services/summary.service';
import {MetricAnswer} from '../../shared/shared-models/metric-answer.model';
import {APIDataService} from '../compare-services/API-data.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MetricModalComponent} from './metrics-search/metric-modal/metric-modal.component';

@Component({
  selector: 'app-summary-generator',
  templateUrl: './summary-generator.component.html',
  styleUrls: ['./summary-generator.component.css']
})
export class SummaryGeneratorComponent implements OnInit {
  loadingSummary = false;

  constructor(private sService: SummaryService, private aService: APIDataService, private router: Router) {
  }

  ngOnInit() {
    if (!this.isDataLoaded()) {
      this.sService.loadMetrics();
    }
  }

  isDataLoaded() {
    return this.sService.metrics.length > 0;
  }

  async onGenerate() {
    if (this.sService.selectedMetrics.length === 0) {
      alert('Please select at least one metric!');
    } else if (this.sService.selectedYear === -1) {
      alert('Please select year of reference!');
    } else {
      if (this.sService.selectedCompanies.length === 0) {
        if (this.sService.companies.length > 10) {
          this.sService.selectedCompanies = Array.from(this.sService.companies).slice(0, 10);
        } else {
          this.sService.selectedCompanies = Array.from(this.sService.companies);
        }
      }

      this.loadingSummary = true;
      for (const company of this.sService.selectedCompanies) {
        company.answers = [];
        for (const metric of this.sService.selectedMetrics) {
          await this.aService.getAnswer(metric.id, company.name, this.sService.selectedYear.toString()).then(
            (answer: MetricAnswer) => {
              const index = this.sService.selectedMetrics.findIndex(m => m.id === metric.id);
              if (metric.type === 'Number' || metric.type === 'Money') {
                answer.beautified_value = this.aService.beautifyNum(answer.value);
              }
              company.answers[index] = answer;
            });
        }
      }

      this.loadingSummary = false;
      this.router.navigate(['summary']);
    }
  }


}
