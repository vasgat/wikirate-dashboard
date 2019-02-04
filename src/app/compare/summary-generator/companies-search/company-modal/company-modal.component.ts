import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../../shared/shared-models/company.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.css']
})
export class CompanyModalComponent implements OnInit {
  @Input() company: Company;
  chart;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.chart = new Chart('radarChart', {
      // The type of chart we want to create
      type: 'radar',
      title: 'Performance',
      // The data for our dataset
      data: {
        labels: this.company.performance.labels,
        datasets: [{
          label: this.company.name,
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.company.performance.data,
        }]
      },

      // Configuration options go here
      options: {}
    });
  }



}
