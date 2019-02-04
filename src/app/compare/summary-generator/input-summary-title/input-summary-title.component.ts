import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SummaryService} from '../../compare-services/summary.service';

@Component({
  selector: 'app-input-summary-title',
  templateUrl: './input-summary-title.component.html',
  styleUrls: ['./input-summary-title.component.css']
})

export class InputSummaryTitleComponent {
  @ViewChild('title') title;

  constructor(private sService: SummaryService) { }

  emitTitle() {
    this.sService.setTitle(this.title.nativeElement.value);
  }
}

