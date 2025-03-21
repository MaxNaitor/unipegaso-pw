import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPieChartComponent } from './asset-pie-chart.component';

describe('AssetPieChartComponent', () => {
  let component: AssetPieChartComponent;
  let fixture: ComponentFixture<AssetPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
