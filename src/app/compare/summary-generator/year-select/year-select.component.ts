import {Component, OnInit} from '@angular/core';
import {SummaryService} from '../../compare-services/summary.service';

@Component({
  selector: 'app-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.css']
})
export class YearSelectComponent {

  constructor(public sService: SummaryService) {
  }

  selectYear(year) {
    this.sService.selectYear(year);
  }

}
