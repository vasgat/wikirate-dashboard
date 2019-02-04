import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Company} from '../../shared/shared-models/company.model';
import {MetricAnswer} from '../../shared/shared-models/metric-answer.model';
import {Metric} from '../models/metric.model';

@Injectable()

export class APIDataService {

  constructor(private http: HttpClient) {
  }

  getMetrics() {
    return this.http.get<{ results: Metric[] }>('http://easie.iti.gr/DynaMatAPI/extractor_service/api/metrics')
      .map(
        (results: { results: Metric[] }) => {
          return results.results;
        }
      );
  }

  getYears(metric_id: number) {
    return this.http.get<{ results: number[] }>
    ('http://easie.iti.gr/DynaMatAPI/extractor_service/api/metric_citeyears?metric_id=' + metric_id)
      .map(
        (results: { results: number[] }) => {
          return results.results;
        }
      ).catch((error: Response) => {
          console.log('Error: ' + error);
          return Observable.throw(error);
        }
      );
  }

  getCompanies() {
    return this.http.get<{results: Company[]}>('http://easie.iti.gr/DynaMatAPI/extractor_service/api/companies')
      .map(
        (results: {results: Company[]}) => {
          return results.results;
        }
      ).catch((error: Response) => {
          console.log('Error: ' + error);
          return Observable.throw(error);
        }
      );
  }

  getMetricCompanies(metric_id: number) {
    return this.http.get<{ results: Company[] }>
    ('http://easie.iti.gr/DynaMatAPI/extractor_service/api/metric_companies?metric_id=' + metric_id)
      .map(
        (results: { results: Company[] }) => {
          return results.results;
        }
      ).catch((error: Response) => {
          console.log('Error: ' + error);
          return Observable.throw(error);
        }
      );
  }

  async getAnswer(metric_id, company, year: string) {
    let params = new HttpParams();

    params = params.append('metric_id', metric_id)
      .append('company', company)
      .append('year', year);


    return await this.http.get<{ results: MetricAnswer }>
    ('http://easie.iti.gr/DynaMatAPI/extractor_service/api/answer', {params: params})
      .map(
        (results: { results: MetricAnswer }) => {
          return results.results;
        }
      ).toPromise();

  }

  beautifyNum(labelValue) {
    const ABSValue = Math.abs(Number(labelValue));
    const sign = Number(labelValue) > 0 ? '' : '-';

    return ABSValue >= 1.0e+12

      ? sign + (ABSValue / 1.0e+12).toFixed(2) + 'T'

      : ABSValue >= 1.0e+9

        ? sign + (ABSValue / 1.0e+9).toFixed(1) + 'B'

        : ABSValue >= 1.0e+6

          ? sign + (ABSValue / 1.0e+6).toFixed(1) + 'M'

          : ABSValue >= 1.0e+3

            ? sign + (ABSValue / 1.0e+3).toFixed(1) + 'K'

            : labelValue === 'Unknown' ?

              labelValue

              : Number(labelValue).toFixed(2);
  }

}
