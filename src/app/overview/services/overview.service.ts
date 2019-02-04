import {Company} from '../../shared/shared-models/company.model';
import {Subject} from 'rxjs';

export class OverviewService {
  company: Company;
  companyChange: Subject<Company> = new Subject<Company>();

  setCompany(company) {
    this.company = company;
    this.companyChange.next(this.company);
  }

}
