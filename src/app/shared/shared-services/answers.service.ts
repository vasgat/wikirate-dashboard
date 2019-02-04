import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ChartData} from '../shared-models/chart-data.model';

@Injectable()
export class AnswersService {
  constructor(private http: HttpClient) {
  }

  async getAnswer(metric_id, company) {
    let params = new HttpParams();

    params = params.append('metric_id', metric_id)
      .append('company', company);

    return await this.http.get<{ results }>
    ('http://easie.iti.gr/DynaMatAPI/extractor_service/api/answers', {params: params})
      .map(
        (results: { results: ChartData }) => {
          return results.results;
        }
      ).toPromise();

  }


}
