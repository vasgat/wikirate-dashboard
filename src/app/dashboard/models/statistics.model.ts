import {ChartData} from '../../shared/shared-models/chart-data.model';

export class Statistics {
  constructor(public answers: number,
              public metrics: number,
              public companies: number,
              public increase_on_answers: number,
              public increase_on_metrics: number,
              public increase_on_companies: number,
              public types: ChartData,
              public topics: ChartData,
              public overview_users: ChartData,
              public overview_answers: ChartData) {
  }
}
