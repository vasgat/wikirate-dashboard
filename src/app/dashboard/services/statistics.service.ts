import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Statistics} from '../models/statistics.model';

@Injectable()
export class StatisticsService {
  constructor(private http: HttpClient) {
  }

  async getStats() {
    return await this.http.get<{ results }>
    ('http://easie.iti.gr/DynaMatAPI/extractor_service/api/stats')
      .map(
        (results: { results: Statistics }) => {
          return results.results;
        }
      ).toPromise();
  }
}
