import {Component, OnInit} from '@angular/core';
import {Statistics} from './models/statistics.model';
import {StatisticsService} from './services/statistics.service';
import {ChartService} from '../shared/shared-services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [StatisticsService]
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats: Statistics;

  constructor(private statsService: StatisticsService, public chartService: ChartService) {
  }

  ngOnInit() {
    this.loadDashboad();
  }

  async loadDashboad() {
    this.stats = await this.statsService.getStats();
    this.loading = false;
    await this.delay(200);

    const researchedTopicsChart = this.chartService.radarChart('ResearchedTopics',
      this.stats.topics.labels,
      this.stats.topics.data,
      'overall'
    );

    const typesChart = this.chartService.polarChart('MetricTypes',
      this.stats.types.labels,
      this.stats.types.data
    );

    const usersChart = this.chartService.lineChart('OverallUsers',
      this.stats.overview_users.labels,
      this.stats.overview_users.data, 'Users'
    );

    const answersChart = this.chartService.lineChart('OverallAnswers',
      this.stats.overview_answers.labels,
      this.stats.overview_answers.data,
      'Answers'
    );
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
