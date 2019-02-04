import {ChartData} from './chart-data.model';
import {MetricAnswer} from './metric-answer.model';

export class Company {
  constructor(public id: number,
              public name,
              public headquarters: string,
              public numOfAnswers: number,
              public numOfMetrics: number,
              public performance: ChartData,
              public answers_increase: number,
              public metrics_increase: number,
              public answers: MetricAnswer[]) {}
}
