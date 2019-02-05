import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Company} from '../shared-models/company.model';
import {ChartData} from '../shared-models/chart-data.model';

@Injectable()
export class CompaniesService {
  constructor(private http: HttpClient) {
  }

  getCompanies() {
    return this.http.get<{ results: Company[] }>('http://easie.iti.gr/DynaMatAPI/extractor_service/api/companies')
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

  getCompany(id: number) {
    return this.http.get<{ company: Company }>('http://easie.iti.gr/DynaMatAPI/extractor_service/api/company?id=' + id)
      .map(
        (results: { company: Company }) => {
          return results.company;
        }
      ).toPromise();
  }


}
