import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Chart} from 'chart.js';
import {Company} from '../../shared/shared-models/company.model';
import {Metric} from '../models/metric.model';
import {AnswersService} from '../../shared/shared-services/answers.service';
import {SummaryService} from '../compare-services/summary.service';
import {MetricAnswer} from '../../shared/shared-models/metric-answer.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  title: string;
  @ViewChild('summary') summary: ElementRef;

  constructor(public sService: SummaryService) {
  }

  ngOnInit() {
    this.sService.onSummary = true;
    this.title = 'Summary: ' + this.sService.title + ' (' + this.sService.selectedYear + ')';
  }

}
