import {Company} from './company.model';

export class MetricAnswer {
  constructor(public metric_id: number, public value, public year: number, public beautified_value, public company: string) {}
}
