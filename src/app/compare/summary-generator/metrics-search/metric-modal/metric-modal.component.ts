import {Component, Input, OnInit} from '@angular/core';
import {Metric} from '../../../models/metric.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-metric-modal',
  templateUrl: './metric-modal.component.html',
  styleUrls: ['./metric-modal.component.css']
})
export class MetricModalComponent {
  @Input() metric: Metric;

  constructor(public activeModal: NgbActiveModal) {}
}
