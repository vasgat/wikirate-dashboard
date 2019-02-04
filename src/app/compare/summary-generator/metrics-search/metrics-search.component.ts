import {Component, OnInit} from '@angular/core';
import {SummaryService} from '../../compare-services/summary.service';
import {Metric} from '../../models/metric.model';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MetricModalComponent} from './metric-modal/metric-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-metrics-search',
  templateUrl: './metrics-search.component.html',
  styleUrls: ['./metrics-search.component.css']
})
export class MetricsSearchComponent implements OnInit {
  metricCtrl = new FormControl();
  filteredMetrics: Observable<Metric[]>;
  isCollapsed = true;

  constructor(private sService: SummaryService, public modalService: NgbModal) {
  }

  ngOnInit() {
  }

  private _filterMetrics(value: string): Metric[] {
    const filterValue = value.toLowerCase();

    return this.sService.metrics.filter(metric => metric.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectedMetric(content, metric: Metric) {
    content.value = metric.name;
    content.id = metric.id;
  }

  onAddMetric(inputField) {
    const metric = this.sService.metrics.find(myObj => myObj.id === +inputField.id);
    this.sService.addSelectedMetric(metric);
  }

  search(content) {
    this.filteredMetrics = this.metricCtrl.valueChanges
      .pipe(
        startWith(content.value),
        map(metric => metric ? this._filterMetrics(metric) : this.sService.metrics.slice())
      );
  }

  onKeydown(content) {
    if (content.value === '') {
      this.search(content);
    }
  }

  removeMetric(metric) {
    this.sService.removeSelectedMetric(metric);
  }

  clear() {
    this.sService.removeAllSelectedMetrics();
    this.sService.removeAllSelectedCompanies();
    this.sService.companies = [];
  }

  getSelectedMetrics() {
    return this.sService.selectedMetrics;
  }

  openInfo(metric) {
    const modalRef = this.modalService.open(MetricModalComponent);
    modalRef.componentInstance.metric = metric;
  }

}
