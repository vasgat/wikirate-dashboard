import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AnswersService} from '../shared/shared-services/answers.service';
import {Chart} from 'chart.js';
import {ChartData} from '../shared/shared-models/chart-data.model';
import {ChartService} from '../shared/shared-services/chart.service';
import {OverviewService} from './services/overview.service';
import {Company} from '../shared/shared-models/company.model';
import {CompaniesService} from '../shared/shared-services/companies.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [OverviewService]
})
export class OverviewComponent {
  company: Company;
  charts: Chart[];
  loading = false;
  year = '2018';

  constructor(private aService: AnswersService, private chartService: ChartService, public oService: OverviewService, private cService: CompaniesService) {
    this.oService.companyChange.subscribe((value => {
      this.company = value;
      this.generateCharts();
    }));
    this.charts = [];
  }

  isCompanySelected() {
    return this.company != null;
  }

  async generateCharts() {
    this.loading = true;

    this.company = await this.cService.getCompany(this.company.id);

    const womenOnBoard = await this.aService.getAnswer(538693, this.company.name);

    const netincome = await this.aService.getAnswer(2050831, this.company.name);

    const assets = await this.aService.getAnswer(1908858, this.company.name);

    this.loading = false;

    await this.delay(200);

    if (this.charts.length > 0) {

      for (let i = 0; i < this.charts.length; i++) {
        this.charts[i].data.labels.pop();
        this.charts[i].data.datasets.forEach((dataset) => {
          dataset.data.pop();
        });
      }
    }

    const performanceChart = this.chartService.radarChart('performance',
      this.company.performance.labels,
      this.company.performance.data,
      this.company.name
    );

    if (womenOnBoard.labels.length > 0) {
      this.year = womenOnBoard.labels[womenOnBoard.labels.length - 1];
    }
    const womenChart = this.chartService.donutChart('WomenOnBoard', womenOnBoard.labels, womenOnBoard.data);
    const netincomeChart = this.chartService.lineChart('NetIncomeChart', netincome.labels, netincome.data, this.company.name);
    const assetsChart = this.chartService.lineChart('AssetsChart', assets.labels, assets.data, this.company.name);

    this.charts.push(womenChart);
    this.charts.push(netincomeChart);
    this.charts.push(assetsChart);
    this.charts.push(performanceChart);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
