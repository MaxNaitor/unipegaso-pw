import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-il-mio-conto',
  imports: [ChartModule],
  templateUrl: './il-mio-conto.component.html',
  styleUrl: './il-mio-conto.component.css'
})
export class IlMioContoComponent implements OnInit {

  constructor() { }

  pieData: any;
  pieOptions: any;

  lineData: any;
  lineOptions: any;

  ngOnInit(): void {
    this.initChart()
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
    
    this.lineData = {
      labels: ['7', '6', '5', '4','3','2','1'],
      datasets: [
        {
          data: [505, 520, 530, 305, 405, 450],
          backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')],
          tension: 0.4,
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      },
      scales: {
        y: {
          suggestedMin: 0 
        }
      }
    };
  }
}
